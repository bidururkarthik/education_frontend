import React, { useEffect, useState } from 'react';
import api from '../../api/api.js';
import AdminPagination from '../AdminPagination.jsx';
import '../AdminCommon.css';

const emptyQ = { question: '', options: '', category: 'General' };

export default function ManageAssessments() {
  const [tab, setTab] = useState('results');
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyQ);

  const loadQuestions = () => api.get('/admin/assessment-questions').then((res) => setQuestions(res.data.questions));
  const loadResults = (p = page) => api.get('/admin/assessment-results', { params: { page: p, limit: 15 } })
    .then((res) => { setResults(res.data.results); setPagination(res.data.pagination); });

  useEffect(() => { loadQuestions(); }, []);
  useEffect(() => { if (tab === 'results') loadResults(page); }, [tab, page]); // eslint-disable-line

  const addQuestion = async (e) => {
    e.preventDefault();
    await api.post('/admin/assessment-questions', { ...form, options: form.options.split(',').map((o) => o.trim()).filter(Boolean) });
    setShowModal(false);
    setForm(emptyQ);
    loadQuestions();
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    await api.delete(`/admin/assessment-questions/${id}`);
    loadQuestions();
  };

  return (
    <div>
      <div className="mmc-admin-page-header">
        <div>
          <h1>Career Assessments</h1>
          <p>Manage the assessment question bank and review student results.</p>
        </div>
        {tab === 'questions' && <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Question</button>}
      </div>

      <div className="mmc-dash-tabs" style={{ marginBottom: 20 }}>
        <button className={tab === 'results' ? 'active' : ''} onClick={() => setTab('results')}>Results</button>
        <button className={tab === 'questions' ? 'active' : ''} onClick={() => setTab('questions')}>Question Bank</button>
      </div>

      {tab === 'results' ? (
        <div className="card">
          {results.length === 0 ? <div className="empty-state">No assessment results yet.</div> : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Student</th><th>Recommended Streams</th><th>Date</th></tr></thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r._id}>
                      <td>{r.student?.fullName} <br /><small>{r.student?.email}</small></td>
                      <td>{r.recommendedStreams?.join(', ') || '-'}</td>
                      <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <AdminPagination pagination={pagination} onPageChange={setPage} />
        </div>
      ) : (
        <div className="card">
          {questions.length === 0 ? <div className="empty-state">No questions yet. Add your first question to build the assessment.</div> : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Question</th><th>Options</th><th>Category</th><th>Actions</th></tr></thead>
                <tbody>
                  {questions.map((q) => (
                    <tr key={q._id}>
                      <td>{q.question}</td>
                      <td>{q.options.join(' / ')}</td>
                      <td>{q.category}</td>
                      <td className="mmc-admin-actions"><button className="mmc-admin-btn-delete" onClick={() => deleteQuestion(q._id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="mmc-admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="mmc-admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Assessment Question</h3>
            <form onSubmit={addQuestion}>
              <div className="form-group"><label>Question</label><textarea rows="2" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required /></div>
              <div className="form-group"><label>Options (comma separated)</label><textarea rows="3" value={form.options} onChange={(e) => setForm({ ...form, options: e.target.value })} required /></div>
              <div className="form-group"><label>Category / Stream</label><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Science, Commerce, Arts" required /></div>
              <div className="mmc-admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
