import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialAlerts } from '../data/initialData';
import { Bell, AlertCircle, AlertTriangle, Info, Check } from 'lucide-react';

const tabs = ['All', 'Critical', 'Warning', 'Info'];

export default function Alerts() {
  const [alerts, setAlerts] = useLocalStorage('fengcha_alerts', initialAlerts);
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All' ? alerts : alerts.filter(a => a.type === activeTab);

  const counts = {
    total: alerts.length,
    critical: alerts.filter(a => a.type === 'Critical').length,
    warning: alerts.filter(a => a.type === 'Warning').length,
    info: alerts.filter(a => a.type === 'Info').length,
  };

  const markRead = (id) => setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  const markAllRead = () => setAlerts(alerts.map(a => ({ ...a, read: true })));

  const typeIcon = (type) => {
    if (type === 'Critical') return <AlertCircle size={20} color="#f87171" />;
    if (type === 'Warning') return <AlertTriangle size={20} color="#fbbf24" />;
    return <Info size={20} color="#60a5fa" />;
  };

  const borderColor = { Critical: '#f87171', Warning: '#fbbf24', Info: '#60a5fa' };
  const bgIcon = { Critical: '#7f1d1d', Warning: '#713f12', Info: '#1e3a5f' };

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
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Alerts & Notifications</h1>
          <p style={{ color: '#64748b', marginTop: 4 }}>Stay updated on critical inventory and shipment events</p>
        </div>
        <button onClick={markAllRead} style={{ padding: '8px 16px', background: 'none', border: '1px solid #2d3148', borderRadius: 8, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Check size={14} /> Mark all read
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {statCard('Total Alerts', counts.total, '#94a3b8', <Bell size={22} />)}
        {statCard('Critical', counts.critical, '#f87171', <AlertCircle size={22} color="#f87171" />)}
        {statCard('Warning', counts.warning, '#fbbf24', <AlertTriangle size={22} color="#fbbf24" />)}
        {statCard('Info', counts.info, '#60a5fa', <Info size={22} color="#60a5fa" />)}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: '1px solid #1e2130' }}>
        {tabs.map(tab => {
          const count = tab === 'All' ? counts.total : counts[tab.toLowerCase()];
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

      {/* Alert List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(alert => (
          <div key={alert.id} style={{
            background: '#13151f', border: '1px solid #1e2130',
            borderLeft: `4px solid ${borderColor[alert.type]}`,
            borderRadius: 10, padding: 20,
            opacity: alert.read ? 0.6 : 1
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ background: bgIcon[alert.type], padding: 10, borderRadius: 8, flexShrink: 0 }}>
                {typeIcon(alert.type)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {alert.title}
                    {!alert.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />}
                  </span>
                  <span style={{ color: '#64748b', fontSize: 12 }}>{alert.time}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12, lineHeight: 1.5 }}>{alert.message}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ background: '#1e2130', borderRadius: 6, padding: '3px 10px', fontSize: 11, color: '#64748b' }}>{alert.category}</span>
                  {!alert.read && (
                    <button onClick={() => markRead(alert.id)} style={{ background: 'none', border: 'none', color: '#4ade80', fontSize: 12, fontWeight: 600, padding: '3px 0' }}>
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}