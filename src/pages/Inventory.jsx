import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialInventory } from '../data/initialData';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { Search, Plus, Pencil, Trash2, Package } from 'lucide-react';

const categories = ['All', 'Tea Leaves', 'Dairy', 'Toppings', 'Syrups', 'Powders'];

const emptyForm = { name: '', category: 'Tea Leaves', currentStock: '', unit: 'lbs', minLevel: '', lastRestocked: '' };

export default function Inventory() {
  const [inventory, setInventory] = useLocalStorage('fengcha_inventory', initialInventory);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const getStatus = (current, min) => {
    if (current <= 0) return 'Out of Stock';
    if (current < min) return 'Low Stock';
    return 'In Stock';
  };

  const filtered = inventory.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totals = {
    total: inventory.length,
    inStock: inventory.filter(i => i.status === 'In Stock').length,
    lowStock: inventory.filter(i => i.status === 'Low Stock').length,
    outOfStock: inventory.filter(i => i.status === 'Out of Stock').length,
  };

  const openAdd = () => { setForm(emptyForm); setEditItem(null); setShowModal(true); };
  const openEdit = (item) => { setForm({ ...item }); setEditItem(item.id); setShowModal(true); };

  const handleSave = () => {
    const status = getStatus(Number(form.currentStock), Number(form.minLevel));
    if (editItem) {
      setInventory(inventory.map(i => i.id === editItem ? { ...form, id: editItem, currentStock: Number(form.currentStock), minLevel: Number(form.minLevel), status } : i));
    } else {
      setInventory([...inventory, { ...form, id: Date.now(), currentStock: Number(form.currentStock), minLevel: Number(form.minLevel), status }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this ingredient?')) setInventory(inventory.filter(i => i.id !== id));
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
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Inventory</h1>
        <p style={{ color: '#64748b', marginTop: 4 }}>Manage your ingredient stock levels</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {statCard('Total Items', totals.total, '#94a3b8', <Package size={22} />)}
        {statCard('In Stock', totals.inStock, '#4ade80', <span style={{ fontSize: 22 }}>✓</span>)}
        {statCard('Low Stock', totals.lowStock, '#fbbf24', <span style={{ fontSize: 22 }}>⚠</span>)}
        {statCard('Out of Stock', totals.outOfStock, '#f87171', <span style={{ fontSize: 22 }}>✕</span>)}
      </div>

      {/* Search + Filter + Add */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12 }}>
        <div style={{ position: 'relative', width: 280 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input placeholder="Search ingredients..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 32 }} />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '6px 14px', borderRadius: 20, border: '1px solid',
              borderColor: activeCategory === cat ? '#4ade80' : '#2d3148',
              background: activeCategory === cat ? '#14532d' : 'transparent',
              color: activeCategory === cat ? '#4ade80' : '#94a3b8', fontWeight: 500
            }}>{cat}</button>
          ))}
          <button onClick={openAdd} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
            background: '#4ade80', color: '#000', borderRadius: 8, border: 'none', fontWeight: 600
          }}>
            <Plus size={14} /> Add Item
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e2130' }}>
              {['Ingredient', 'Category', 'Current Stock', 'Min Level', 'Status', 'Last Restocked', ''].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#64748b', fontSize: 12, fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={{ borderTop: '1px solid #1e2130' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>{item.name}</td>
                <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{item.category}</td>
                <td style={{ padding: '14px 16px' }}><strong>{item.currentStock}</strong> <span style={{ color: '#64748b' }}>{item.unit}</span></td>
                <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{item.minLevel} {item.unit}</td>
                <td style={{ padding: '14px 16px' }}><StatusBadge status={item.status} /></td>
                <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{item.lastRestocked}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(item)} style={{ background: 'none', border: 'none', color: '#60a5fa' }}><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#f87171' }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title={editItem ? 'Edit Ingredient' : 'Add Ingredient'} onClose={() => setShowModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['Name', 'name', 'text'], ['Current Stock', 'currentStock', 'number'], ['Min Level', 'minLevel', 'number'], ['Unit', 'unit', 'text'], ['Last Restocked', 'lastRestocked', 'text']].map(([label, key, type]) => (
              <div key={key}>
                <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
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