import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialInventory, initialShipments, initialAlerts } from '../data/initialData';
import StatusBadge from '../components/StatusBadge';
import { AlertTriangle, Truck, Clock, RefreshCw, Trash2, Package, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Nov', consumption: 65000, waste: 12 },
  { month: 'Dec', consumption: 78000, waste: 18 },
  { month: 'Jan', consumption: 71000, waste: 15 },
  { month: 'Feb', consumption: 82000, waste: 10 },
  { month: 'Mar', consumption: 91000, waste: 8 },
  { month: 'Apr', consumption: 88000, waste: 14 },
];

const wasteData = [
  { name: 'Dairy', value: 35, color: '#4ade80' },
  { name: 'Tea', value: 25, color: '#a78bfa' },
  { name: 'Toppings', value: 20, color: '#60a5fa' },
  { name: 'Syrups', value: 20, color: '#fbbf24' },
];

export default function Dashboard() {
  const [inventory] = useLocalStorage('fengcha_inventory', initialInventory);
  const [shipments] = useLocalStorage('fengcha_shipments', initialShipments);
  const [alerts] = useLocalStorage('fengcha_alerts', initialAlerts);

  const lowStock = inventory.filter(i => i.status === 'Low Stock').length;
  const outOfStock = inventory.filter(i => i.status === 'Out of Stock').length;
  const inTransit = shipments.filter(s => s.status === 'In Transit').length;
  const expiring = 5;
  const pending = 2;
  const unread = alerts.filter(a => !a.read).length;

  const card = (icon, label, value, color) => (
    <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ color }}>{icon}</span>
      <div>
        <div style={{ color: '#64748b', fontSize: 12 }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: 22 }}>{value}</div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 28 }}>
      {/* Alerts + Shipments row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginBottom: 20 }}>
        {/* Inventory Alerts */}
        <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Inventory Alerts</h2>
          {[
            { icon: <AlertTriangle size={16} color="#fbbf24" />, label: 'Low Stock Items', value: lowStock + outOfStock },
            { icon: <Truck size={16} color="#4ade80" />, label: 'Incoming Shipments', value: inTransit },
            { icon: <Clock size={16} color="#f87171" />, label: 'Items Expiring Soon', value: expiring },
            { icon: <RefreshCw size={16} color="#a78bfa" />, label: 'Pending Reorders', value: pending },
            { icon: <Trash2 size={16} color="#f87171" />, label: 'Waste This Week', value: '12 lbs' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px solid #1e2130' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8' }}>
                {item.icon}{item.label}
              </div>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Recent Shipments */}
        <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Recent Shipments</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#64748b', fontSize: 12 }}>
                {['Ingredient', 'Vendor', 'Status', 'Qty', 'ETA'].map(h => (
                  <th key={h} style={{ textAlign: 'left', paddingBottom: 12, fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shipments.slice(0, 5).map(s => (
                <tr key={s.id} style={{ borderTop: '1px solid #1e2130' }}>
                  <td style={{ padding: '12px 0', fontWeight: 600 }}>{s.items.split('(')[0].trim()}</td>
                  <td style={{ color: '#94a3b8' }}>{s.vendor}</td>
                  <td><StatusBadge status={s.status} /></td>
                  <td style={{ color: '#e2e8f0' }}>{s.items.match(/\(([^)]+)\)/)?.[1] || '-'}</td>
                  <td style={{ color: '#94a3b8' }}>{s.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Access */}
      <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Quick Access</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { icon: <Package size={18} />, label: '+ Add Ingredient', color: '#4ade80', bg: '#14532d' },
            { icon: <Truck size={18} />, label: '+ Log Shipment', color: '#60a5fa', bg: '#1e3a5f' },
            { icon: <RefreshCw size={18} />, label: '+ Create Reorder', color: '#4ade80', bg: '#14532d' },
            { icon: <FileText size={18} />, label: '+ Generate Report', color: '#a78bfa', bg: '#4c1d95' },
          ].map((item, i) => (
            <button key={i} style={{
              background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 10,
              padding: '16px', display: 'flex', alignItems: 'center', gap: 12,
              color: '#e2e8f0', transition: 'border-color 0.15s'
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = item.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#2d3148'}>
              <span style={{ background: item.bg, color: item.color, padding: 8, borderRadius: 8 }}>{item.icon}</span>
              <span style={{ fontWeight: 600 }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Monthly Report Charts */}
      <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 12, padding: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Monthly Report</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Ingredient Consumption Trends</div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8 }} />
                <Area type="monotone" dataKey="consumption" stroke="#4ade80" fill="#14532d" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Waste by Category</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={wasteData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {wasteData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              {wasteData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#94a3b8' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                  {d.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}