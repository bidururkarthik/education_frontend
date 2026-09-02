import React, { useEffect, useState } from 'react';
import api from '../../api/api.js';
import AdminPagination from '../AdminPagination.jsx';
import '../AdminCommon.css';

const emptyForm = { name: '', location: '', type: 'Private', ranking: '', annualFees: '', facilities: '', description: '' };

export default function ManageColleges() {
  const [colleges, setColleges] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const load = (p = page, s = search) =>
    api.get('/colleges', { params: { page: p, limit: 15, search: s } })
      .then((res) => { setColleges(res.data.colleges); setPagination(res.data.pagination); });

  useEffect(() => { load(page, search); }, [page]); // eslint-disable-line
  useEffect(() => { setPage(1); load(1, search); }, [search]); // eslint-disable-line

  const openNew = () => { setForm(emptyForm); setEditingId(null); setImageFile(null); setShowModal(true); };
  const openEdit = (c) => {
    setForm({
      name: c.name, location: c.location || '', type: c.type || 'Private', ranking: c.ranking || '',
      annualFees: c.fees?.annual || '', facilities: (c.facilities || []).join(', '), description: c.description || '',
    });
    setEditingId(c._id);
    setImageFile(null);
    setShowModal(true);
  };

  const save = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('location', form.location);
    fd.append('type', form.type);
    if (form.ranking) fd.append('ranking', form.ranking);
    fd.append('fees', JSON.stringify({ annual: Number(form.annualFees) || 0 }));
    fd.append('facilities', form.facilities);
    fd.append('description', form.description);
    if (imageFile) fd.append('image', imageFile);

    if (editingId) await api.put(`/admin/colleges/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    else await api.post('/admin/colleges', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    setShowModal(false);
    load(page, search);
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this college?')) return;
    await api.delete(`/admin/colleges/${id}`);
    load(page, search);
  };

  return (
    <div>
      <div className="mmc-admin-page-header">
        <div>
          <h1>Manage Colleges</h1>
          <p>Colleges used across predictors, compare, and admission referrals.</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>+ Add College</button>
      </div>

      <div className="mmc-admin-toolbar">
        <input className="mmc-admin-search-input" placeholder="Search colleges..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="card">
        {colleges.length === 0 ? <div className="empty-state">No colleges yet.</div> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Ranking</th><th>Actions</th></tr></thead>
              <tbody>
                {colleges.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.location || '-'}</td>
                    <td>{c.type}</td>
                    <td>{c.ranking || '-'}</td>
                    <td className="mmc-admin-actions">
                      <button className="mmc-admin-btn-edit" onClick={() => openEdit(c)}>Edit</button>
                      <button className="mmc-admin-btn-delete" onClick={() => remove(c._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <AdminPagination pagination={pagination} onPageChange={setPage} />
      </div>

      {showModal && (
        <div className="mmc-admin-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="mmc-admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? 'Edit College' : 'Add College'}</h3>
            <form onSubmit={save}>
              <div className="form-group"><label>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="form-group"><label>Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
              <div className="form-group">
                <label>Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option>Government</option><option>Government-Aided</option><option>Private</option><option>Deemed</option>
                </select>
              </div>
              <div className="form-group"><label>Ranking (optional)</label><input type="number" value={form.ranking} onChange={(e) => setForm({ ...form, ranking: e.target.value })} /></div>
              <div className="form-group"><label>Annual Fees (₹)</label><input type="number" value={form.annualFees} onChange={(e) => setForm({ ...form, annualFees: e.target.value })} /></div>
              <div className="form-group"><label>Facilities (comma separated)</label><input value={form.facilities} onChange={(e) => setForm({ ...form, facilities: e.target.value })} placeholder="Hostel, Library, Labs" /></div>
              <div className="form-group"><label>Description</label><textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="form-group"><label>Image</label><input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} /></div>
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
