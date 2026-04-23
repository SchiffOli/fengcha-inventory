import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialVendors } from '../data/initialData';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { Search, Plus, Star, Clock, Users } from 'lucide-react';

const emptyForm = { name: '', contact: '', email: '', phone: '', status: 'Active', products: [], leadTime: '', rating: '', totalOrders: '' };

export default function Vendors() {
  const [vendors, setVendors] = useLocalStorage('fengcha_vendors', initialVendors);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [productsInput, setProductsInput] = useState('');

  const filtered = vendors.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));
  const avgRating = (vendors.reduce((a, v) => a + v.rating, 0) / vendors.length).toFixed(1);
  const avgLead = Math.round(vendors.reduce((a, v) => a + v.leadTime, 0) / vendors.length);

  const handleSave = () => {
    setVendors([...vendors, { ...form, id: Date.now(), products: productsInput.split(',').map(p => p.trim()), leadTime: Number(form.leadTime), rating: Number(form.rating), totalOrders: Number(form.totalOrders) }]);
    setShowModal(false);
    setForm(emptyForm);
    setProductsInput('');
  };

  const statCard = (label, value, color, icon) => (
    <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ color }}>{icon}</span>
      <div>
        <div style={{ color: '#64748b', fontSize: 12 }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: 24 }}>{value}</div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Vendors</h1>
          <p style={{ color: '#64748b', marginTop: 4 }}>Manage supplier relationships</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
          background: '#4ade80', color: '#000', borderRadius: 8, border: 'none', fontWeight: 600
        }}>
          <Plus size={14} /> Add Vendor
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {statCard('Total Vendors', vendors.length, '#94a3b8', <Users size={22} />)}
        {statCard('Active', vendors.filter(v => v.status === 'Active').length, '#4ade80', <span style={{ fontSize: 22 }}>✓</span>)}
        {statCard('Avg Lead Time', `${avgLead} days`, '#60a5fa', <Clock size={22} color="#60a5fa" />)}
        {statCard('Avg Rating', `${avgRating}★`, '#fbbf24', <Star size={22} color="#fbbf24" />)}
      </div>

      <div style={{ marginBottom: 20, width: 280, position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        <input placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 32 }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {filtered.map(v => (
          <div key={v.id} style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>{v.name}</h3>
              <StatusBadge status={v.status} />
            </div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>👤 {v.contact}</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>✉ {v.email}</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>📞 {v.phone}</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: '#475569', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>Products Supplied</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {v.products.map(p => (
                  <span key={p} style={{ background: '#1e2130', border: '1px solid #2d3148', borderRadius: 6, padding: '3px 10px', fontSize: 12 }}>{p}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, borderTop: '1px solid #1e2130', paddingTop: 16 }}>
              <div>
                <div style={{ color: '#64748b', fontSize: 11 }}>Lead Time</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{v.leadTime} days</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: 11 }}>Rating</div>
                <div style={{ fontWeight: 700, color: '#fbbf24', marginTop: 2 }}>{v.rating} ★</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontSize: 11 }}>Total Orders</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{v.totalOrders}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title="Add Vendor" onClose={() => setShowModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['Name', 'name'], ['Contact', 'contact'], ['Email', 'email'], ['Phone', 'phone'], ['Lead Time (days)', 'leadTime'], ['Rating', 'rating'], ['Total Orders', 'totalOrders']].map(([label, key]) => (
              <div key={key}>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>{label}</label>
                <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Products (comma separated)</label>
              <input value={productsInput} onChange={e => setProductsInput(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', background: 'none', border: '1px solid #2d3148', borderRadius: 8, color: '#94a3b8' }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: '8px 20px', background: '#4ade80', border: 'none', borderRadius: 8, color: '#000', fontWeight: 600 }}>Save</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}