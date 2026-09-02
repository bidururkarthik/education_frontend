import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './CareerAssessment.css';
import { loadRazorpayScript } from '../../utils/razorpay.js';

// Update this if the promo video ever changes - kept as a single constant
// so it only has to be edited in one place.
const ASSESSMENT_VIDEO_ID = 'Pv3mdtnQziM';

const DIMENSIONS = [
  { title: 'Interests', desc: 'What the student truly enjoys' },
  { title: 'Aptitude', desc: 'Natural ability in logical, numerical, and analytical thinking' },
  { title: 'Personality traits', desc: 'How the student behaves, communicates, and works' },
  { title: 'Career orientation', desc: 'Practical vs creative vs leadership tendencies' },
];

const BENEFITS = [
  'Helps students discover best-fit career options',
  'Reduces confusion after 10th & 12th',
  'Prevents wrong course or college selection',
  'Saves time, money, and effort',
  'Builds confidence in decision-making',
  'Supports parents with data-driven insights',
  'Guides students towards long-term career growth',
];

const WHO_SHOULD_TAKE = [
  'Students after 10th standard',
  'Students after 12th (Science / Commerce / Arts)',
  'Students confused between multiple career options',
  'Parents seeking expert guidance for their child',
  'Students planning professional courses, degrees, or skill-based careers',
];

const AFTER_STEPS = [
  { step: '01', title: 'Answer', copy: 'You answer a structured set of questions.' },
  { step: '02', title: 'Analyze', copy: 'Your responses are carefully analyzed.' },
  { step: '03', title: 'Report', copy: 'A detailed report is generated.' },
  { step: '04', title: 'Review', copy: 'Our expert career counsellor reviews your profile.' },
  { step: '05', title: 'Guidance', copy: 'You receive personalized career guidance.' },
];

export default function CareerAssessment() {
  const { student } = useAuth();
  const navigate = useNavigate();

  const [phase, setPhase] = useState('intro'); // intro | quiz | result
  const [questions, setQuestions] = useState([]);
  const [access, setAccess] = useState({ freeAccess: false, assessmentFee: 199 });
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!student) return;
    api.get('/assessment/access').then((res) => setAccess(res.data)).catch(() => {});
  }, [student]);

  const startAssessment = async () => {
    if (!student) { navigate('/login'); return; }
    setLoading(true); setError('');
    try {
      const res = await api.get('/assessment/questions');
      const qs = res.data.questions?.length ? res.data.questions : SAMPLE_QUESTIONS;

      if (access.freeAccess) {
        setQuestions(qs);
        setAnswers(qs.map((q) => ({ questionId: q._id, selectedOptionIndex: null, paymentId: null })));
        setPhase('quiz');
        setLoading(false);
        return;
      }

      const pay = await api.post('/assessment/pay');
      const { payment, razorpayOrderId, razorpayKeyId, amount, currency } = pay.data;

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setError('Could not load payment gateway. Check your connection and try again.');
        setLoading(false);
        return;
      }

      const options = {
        key: razorpayKeyId,
        amount,
        currency,
        name: 'MapMyCareer360',
        description: 'Career Assessment Fee',
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            const verify = await api.post('/payments/verify', {
              paymentId: payment._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verify.data.success) {
              setQuestions(qs);
              setAnswers(qs.map((q) => ({ questionId: q._id, selectedOptionIndex: null, paymentId: payment._id })));
              setPhase('quiz');
            } else {
              setError('Payment verification failed. Please try again.');
            }
          } catch (err) {
            setError('Payment verification failed. Please try again.');
          } finally {
            setLoading(false);
          }
        },
        modal: { ondismiss: () => setLoading(false) },
        prefill: { name: student?.fullName, email: student?.email, contact: student?.phone },
        // Coral, matched to the About-page brand palette
        theme: { color: '#F57C00' },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      setError('Could not start assessment. Please try again.');
      setLoading(false);
    }
  };

  const selectOption = (idx) => {
    const updated = [...answers];
    updated[current] = { ...updated[current], selectedOptionIndex: idx };
    setAnswers(updated);
  };

  const next = () => setCurrent((c) => Math.min(c + 1, questions.length - 1));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  const submit = async () => {
    setLoading(true); setError('');
    try {
      const paymentId = answers[0]?.paymentId;
      const res = await api.post('/assessment/submit', {
        answers: answers.map(({ questionId, selectedOptionIndex }) => ({ questionId, selectedOptionIndex })),
        paymentId, isFreeViaSubscription: access.freeAccess,
      });
      setResult(res.data.result);
      setPhase('result');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit assessment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mmc-assessment-page">

      {/* HERO - same wavy-contour language as the About page */}
      <header className="mmc-ca-hero">
        <svg className="mmc-ca-hero-contours" viewBox="0 0 1140 460" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50,90 C 200,40 400,140 650,85 C 850,40 1000,110 1200,70" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,170 C 220,120 420,220 660,160 C 860,115 1010,190 1200,150" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,250 C 240,200 440,300 680,240 C 880,195 1020,270 1200,230" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,330 C 260,280 460,380 700,320 C 900,275 1030,350 1200,310" stroke="#0074CC" strokeWidth="1" fill="none" />
        </svg>
        <div className="container mmc-ca-hero-inner">
          <div className="mono mmc-eyebrow">MMC Navigator · Career Assessment</div>
          <h1>Discover the route<br /><em>only you</em> can take.</h1>
          <p className="mmc-ca-hero-sub">
            A scientifically designed evaluation of your interests, aptitude and personality —
            not guesswork, not peer pressure. Just clarity on where to head next.
          </p>
        </div>
      </header>

      {/* Informational content + video only shown before the quiz starts */}
      {phase === 'intro' && (
        <>
          <section className="mmc-ca-section mmc-ca-what">
            <div className="container mmc-ca-what-grid">
              <div>
                <span className="mono mmc-label">About the test</span>
                <h2>What is a Career Assessment Test?</h2>
                <div className="mmc-ca-copy">
                  <p>
                    A Career Assessment Test is a scientifically designed evaluation that helps students
                    understand their strengths, interests, aptitude, and personality. Instead of choosing
                    a career based on guesswork, peer pressure, or confusion, this test gives clear
                    direction based on how a student thinks, learns, and performs.
                  </p>
                  <p>
                    MMC Navigator is specially designed for students after 10th, 12th, and early
                    graduation stages to help them make the right academic and career decisions.
                  </p>
                </div>
              </div>
              <div className="mmc-ca-video-card">
                <div className="mmc-ca-video-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${ASSESSMENT_VIDEO_ID}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`}
                    title="MMC Navigator - Career Assessment Test"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mmc-ca-section mmc-ca-why">
            <div className="container">
              <span className="mono mmc-label">Why it matters</span>
              <h2>Why Career Assessment Is Important for Students</h2>
              <div className="mmc-ca-copy mmc-ca-copy--wide">
                <p>
                  Today, students face too many career options, pressure from parents and society,
                  confusion between passion vs job scope, and fear of choosing the wrong course or college.
                </p>
                <p>
                  A wrong decision can lead to wasted years, financial loss, stress and frustration.
                  A career assessment helps avoid these problems by providing clarity before taking a
                  major life decision.
                </p>
              </div>
            </div>
          </section>

          <section className="mmc-ca-section mmc-ca-dimensions">
            <div className="container">
              <div className="mmc-section-head mmc-section-head--tight">
                <span className="mono mmc-label--sage">Evaluated across</span>
                <h2>Four dimensions, not just marks.</h2>
              </div>
              <div className="mmc-ca-dimension-grid">
                {DIMENSIONS.map((d) => (
                  <div className="mmc-ca-dimension-cell" key={d.title}>
                    <span className="mono">Dimension</span>
                    <h4>{d.title}</h4>
                    <p>{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mmc-ca-section mmc-ca-benefits">
            <div className="container mmc-ca-benefits-grid">
              <div>
                <span className="mono mmc-label">Why take it</span>
                <h2>Benefits of the MMC Career Assessment</h2>
              </div>
              <ul className="mmc-ca-check-list">
                {BENEFITS.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </section>

          <section className="mmc-ca-section mmc-ca-who">
            <div className="container">
              <div className="mmc-waypoint-card">
                <span className="mono">Who should take this</span>
                <ul className="mmc-ca-dash-list">
                  {WHO_SHOULD_TAKE.map((w) => <li key={w}>{w}</li>)}
                </ul>
              </div>
            </div>
          </section>

          <section className="mmc-ca-section mmc-ca-after">
            <div className="container">
              <div className="mmc-section-head">
                <span className="mono">After you finish</span>
                <h2>What happens after you take the assessment.</h2>
              </div>
              <div className="mmc-ca-after-track">
                <div className="mmc-ca-after-line" />
                {AFTER_STEPS.map((s) => (
                  <div className="mmc-ca-after-stop" key={s.step}>
                    <div className="mmc-ca-after-pin">{s.step}</div>
                    <h4>{s.title}</h4>
                    <p>{s.copy}</p>
                  </div>
                ))}
              </div>
              <p className="mmc-ca-callout">
                Your results are not automated blindly — they are reviewed by experts to ensure
                accuracy and relevance.
              </p>
            </div>
          </section>
        </>
      )}

      <section className="mmc-ca-section mmc-ca-action">
        <div className="container mmc-ca-action-inner">
          {phase === 'intro' && (
            <div className="mmc-ca-start-card">
              <span className="mono">Take the first step</span>
              <h2>Before You Begin</h2>
              <ul className="mmc-ca-dash-list">
                <li>Takes about 5-10 minutes to complete.</li>
                <li>{access.freeAccess ? 'You have free access via your active subscription.' : `One-time fee of ₹${access.assessmentFee} applies (free for subscribers).`}</li>
                <li>Your results are saved permanently to your dashboard.</li>
              </ul>
              {error && <p className="mmc-ca-error">{error}</p>}
              <button className="btn-primary" onClick={startAssessment} disabled={loading}>
                {loading ? 'Preparing...' : (access.freeAccess ? 'Start Free Assessment' : `Pay ₹${access.assessmentFee} & Start`)} →
              </button>
              {!student && <p className="mmc-ca-note">You'll need to <Link to="/login">login</Link> or <Link to="/register">sign up</Link> first.</p>}
            </div>
          )}

          {phase === 'quiz' && questions.length > 0 && (
            <div className="mmc-ca-quiz-card">
              <div className="mmc-ca-quiz-progress">
                <div className="mmc-ca-quiz-progress-bar" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
              </div>
              <p className="mono mmc-ca-quiz-counter">Question {current + 1} of {questions.length}</p>
              <h3>{questions[current].question}</h3>
              <div className="mmc-ca-quiz-options">
                {questions[current].options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`mmc-ca-quiz-option ${answers[current]?.selectedOptionIndex === idx ? 'selected' : ''}`}
                    onClick={() => selectOption(idx)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {error && <p className="mmc-ca-error">{error}</p>}
              <div className="mmc-ca-quiz-nav">
                <button className="btn-outline" onClick={prev} disabled={current === 0}>← Previous</button>
                {current < questions.length - 1 ? (
                  <button className="btn-secondary" onClick={next} disabled={answers[current]?.selectedOptionIndex === null}>Next →</button>
                ) : (
                  <button className="btn-primary" onClick={submit} disabled={loading || answers[current]?.selectedOptionIndex === null}>
                    {loading ? 'Submitting...' : 'Submit Assessment →'}
                  </button>
                )}
              </div>
            </div>
          )}

          {phase === 'result' && result && (
            <div className="mmc-ca-result-card">
              <span className="mono">Assessment complete</span>
              <h2>Your recommended streams</h2>
              <p>Based on your answers, here are your top recommended streams:</p>
              <div className="mmc-ca-result-streams">
                {result.recommendedStreams?.map((s) => <span key={s} className="mmc-ca-badge">{s}</span>)}
              </div>
              <p className="mmc-ca-result-note">Full results are saved to your dashboard for future reference.</p>
              <Link to="/dashboard" className="btn-primary">Go to Dashboard →</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Fallback sample questions shown if the admin hasn't uploaded a question bank yet
const SAMPLE_QUESTIONS = [
  { _id: 's1', question: 'Which activity excites you the most?', category: 'Science', options: ['Solving math puzzles', 'Debating current affairs', 'Sketching and designing', 'Running a small business idea'] },
  { _id: 's2', question: 'Pick a subject you enjoy studying:', category: 'Commerce', options: ['Physics', 'Economics', 'Fine Arts', 'Accountancy'] },
  { _id: 's3', question: 'In a group project, you usually:', category: 'Arts', options: ['Analyze the data', 'Lead the discussion', 'Design the presentation', 'Manage the budget'] },
  { _id: 's4', question: 'Your ideal weekend activity is:', category: 'Science', options: ['Building/fixing gadgets', 'Reading news & op-eds', 'Painting or writing', 'Planning a small event'] },
  { _id: 's5', question: 'Which career sounds most appealing?', category: 'Commerce', options: ['Engineer / Scientist', 'Civil Services / Lawyer', 'Designer / Artist', 'Entrepreneur / Manager'] },
];