import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './Subscription.css';
import { loadRazorpayScript } from '../../utils/razorpay.js';

// Launch pricing - ₹1 across all plans for now. Change real prices anytime
// from Admin Panel → Subscriptions → Plans; these are only the fallback
// shown if the API hasn't loaded yet.
const FALLBACK_PLANS = [
  { _id: 'monthly', name: 'Monthly', price: 1, durationInDays: 30, features: ['Career Assessment access', 'KCET Predictor', 'PGCET Predictor'] },
  { _id: 'quarterly', name: 'Quarterly', price: 1, durationInDays: 90, features: ['Career Assessment access', 'KCET Predictor', 'PGCET Predictor', 'Priority support'] },
  { _id: 'yearly', name: 'Yearly', price: 1, durationInDays: 365, features: ['Career Assessment access', 'KCET Predictor', 'PGCET Predictor', 'Priority support', '1-on-1 counselling session'] },
];

export default function Subscription() {
  const [plans, setPlans] = useState(FALLBACK_PLANS);
  const [processingId, setProcessingId] = useState(null);
  const [message, setMessage] = useState('');
  const { student } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/subscription-plans').then((res) => {
      if (res.data.plans?.length) setPlans(res.data.plans);
    }).catch(() => {});
  }, []);

  const purchase = async (plan) => {
    if (!student) { navigate('/login', { state: { from: '/subscription' } }); return; }
    setProcessingId(plan._id);
    setMessage('');
    try {
      const order = await api.post('/subscriptions/purchase', { planId: plan._id });
      const { payment, razorpayOrderId, razorpayKeyId, amount, currency } = order.data;

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setMessage('Could not load payment gateway. Check your connection and try again.');
        setProcessingId(null);
        return;
      }

      const options = {
        key: razorpayKeyId,
        amount,
        currency,
        name: 'MapMyCareer360',
        description: `${plan.name} Subscription`,
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            const verify = await api.post('/payments/verify', {
              paymentId: payment._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan._id,
            });
            if (verify.data.success) {
              setMessage(`Subscribed to the ${plan.name} plan! You now have full access to Career Assessment, KCET/PGCET predictors and your dashboard.`);
            } else {
              setMessage('Payment verification failed. Please contact support if money was deducted.');
            }
          } catch (err) {
            setMessage('Payment verification failed. Please contact support if money was deducted.');
          } finally {
            setProcessingId(null);
          }
        },
        modal: { ondismiss: () => setProcessingId(null) },
        prefill: { name: student?.fullName, email: student?.email, contact: student?.phone },
        // Brand blue, matched to the logo
        theme: { color: '#0074CC' },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Purchase failed. Please try again.');
      setProcessingId(null);
    }
  };

  return (
    <div className="mmc-subscription-page">

      {/* HERO */}
      <header className="mmc-sub-hero">
        <svg className="mmc-sub-hero-contours" viewBox="0 0 1140 380" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50,90 C 200,40 400,140 650,85 C 850,40 1000,110 1200,70" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,170 C 220,120 420,220 660,160 C 860,115 1010,190 1200,150" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,250 C 240,200 440,300 680,240 C 880,195 1020,270 1200,230" stroke="#0074CC" strokeWidth="1" fill="none" />
          <path d="M-50,330 C 260,280 460,380 700,320 C 900,275 1030,350 1200,310" stroke="#0074CC" strokeWidth="1" fill="none" />
        </svg>
        <div className="container mmc-sub-hero-inner">
          <div className="mmc-eyebrow mono">Pricing · Full access route</div>
          <h1>Subscription Plans</h1>
          <p>Unlock free Career Assessment access plus both KCET & PGCET predictors - all in your own student dashboard.</p>
        </div>
      </header>

      {/* SECTION */}
      <section className="mmc-sub-section">
        <div className="container">
          <div className="mmc-launch-banner">
            🎉 <strong>Launch Offer:</strong> every plan is just ₹1 while we're getting started — lock in full access now.
          </div>

          {message && <p className="mmc-sub-message">{message}</p>}

          <div className="mmc-plans-grid">
            {plans.map((plan, i) => (
              <div className={`mmc-plan-card ${plan.name === 'Quarterly' ? 'featured' : ''}`} key={plan._id}>
                {plan.name === 'Quarterly' && <span className="mmc-plan-badge">Most Popular</span>}
                <div className="mmc-plan-index">{String(i + 1).padStart(2, '0')}</div>
                <h3>{plan.name}</h3>
                <div className="mmc-plan-price">₹{plan.price}<span>/{plan.durationInDays} days</span></div>
                <ul className="mmc-plan-features">
                  {(plan.features || []).map((f) => <li key={f}>✔ {f}</li>)}
                  <li>✔ Full access via your Student Dashboard</li>
                </ul>
                <button
                  className={plan.name === 'Quarterly' ? 'btn-primary' : 'btn-secondary'}
                  onClick={() => purchase(plan)}
                  disabled={processingId === plan._id}
                >
                  {processingId === plan._id ? 'Processing...' : `Subscribe for ₹${plan.price}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
