import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialShipments } from '../data/initialData';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { Plus, Truck } from 'lucide-react';

const tabs = ['All', 'In Transit', 'Processing', 'Delivered', 'Delayed'];
const emptyForm = { shipmentId: '', items: '', vendor: '', status: 'In Transit', shipDate: '', eta: '', progress: 0 };

export default function Shipments() {
  const [shipments, setShipments] = useLocalStorage('fengcha_shipments', initialShipments);
  const [activeTab, setActiveTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = activeTab === 'All' ? shipments : shipments.filter(s => s.status === activeTab);

  const counts = {
    total: shipments.length,
    inTransit: shipments.filter(s => s.status === 'In Transit').length,
    delivered: shipments.filter(s => s.status === 'Delivered').length,
    delayed: shipments.filter(s => s.status === 'Delayed').length,
  };

  const handleSave = () => {
    setShipments([...shipments, { ...form, id: Date.now(), progress: Number(form.progress) }]);
    setShowModal(false);
    setForm(emptyForm);
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
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Shipments</h1>
          <p style={{ color: '#64748b', marginTop: 4 }}>Track incoming ingredient deliveries</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
          background: '#4ade80', color: '#000', borderRadius: 8, border: 'none', fontWeight: 600
        }}>
          <Plus size={14} /> Log Shipment
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {statCard('Total Shipments', counts.total, '#94a3b8', <Truck size={22} />)}
        {statCard('In Transit', counts.inTransit, '#60a5fa', <Truck size={22} color="#60a5fa" />)}
        {statCard('Delivered', counts.delivered, '#4ade80', <span style={{ fontSize: 22 }}>✓</span>)}
        {statCard('Delayed', counts.delayed, '#f87171', <span style={{ fontSize: 22 }}>⚠</span>)}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: '1px solid #1e2130' }}>
        {tabs.map(tab => {
          const count = tab === 'All' ? shipments.length : shipments.filter(s => s.status === tab).length;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '10px 16px', background: 'none', border: 'none',
              borderBottom: activeTab === tab ? '2px solid #4ade80' : '2px solid transparent',
              color: activeTab === tab ? '#4ade80' : '#64748b', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              {tab} <span style={{ background: '#1e2130', borderRadius: 10, padding: '1px 7px', fontSize: 11 }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e2130' }}>
              {['Shipment ID', 'Items', 'Vendor', 'Status', 'Ship Date', 'ETA', 'Progress'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#64748b', fontSize: 12, fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} style={{ borderTop: '1px solid #1e2130' }}>
                <td style={{ padding: '14px 16px', color: '#4ade80', fontWeight: 600 }}>{s.shipmentId}</td>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>{s.items}</td>
                <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{s.vendor}</td>
                <td style={{ padding: '14px 16px' }}><StatusBadge status={s.status} /></td>
                <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{s.shipDate}</td>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>{s.eta}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, background: '#1e2130', borderRadius: 4, height: 6 }}>
                      <div style={{ width: `${s.progress}%`, background: s.status === 'Delayed' ? '#f87171' : '#4ade80', height: '100%', borderRadius: 4 }} />
                    </div>
                    <span style={{ color: '#94a3b8', fontSize: 12, minWidth: 30 }}>{s.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="Log New Shipment" onClose={() => setShowModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['Shipment ID', 'shipmentId'], ['Items', 'items'], ['Vendor', 'vendor'], ['Ship Date', 'shipDate'], ['ETA', 'eta'], ['Progress (%)', 'progress']].map(([label, key]) => (
              <div key={key}>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>{label}</label>
                <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {['In Transit', 'Processing', 'Delivered', 'Delayed'].map(s => <option key={s}>{s}</option>)}
              </select>
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