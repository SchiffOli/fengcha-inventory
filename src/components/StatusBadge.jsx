export default function StatusBadge({ status }) {
  const styles = {
    'In Stock':    { background: '#14532d', color: '#4ade80' },
    'Low Stock':   { background: '#713f12', color: '#fbbf24' },
    'Out of Stock':{ background: '#7f1d1d', color: '#f87171' },
    'In Transit':  { background: '#1e3a5f', color: '#60a5fa' },
    'Delivered':   { background: '#14532d', color: '#4ade80' },
    'Delayed':     { background: '#7f1d1d', color: '#f87171' },
    'Processing':  { background: '#4c1d95', color: '#a78bfa' },
    'Active':      { background: '#14532d', color: '#4ade80' },
    'Inactive':    { background: '#1e293b', color: '#64748b' },
    'Critical':    { background: '#7f1d1d', color: '#f87171' },
    'Warning':     { background: '#713f12', color: '#fbbf24' },
    'Info':        { background: '#1e3a5f', color: '#60a5fa' },
  };
  const s = styles[status] || { background: '#1e293b', color: '#94a3b8' };
  return (
    <span style={{
      ...s, padding: '3px 10px', borderRadius: 20,
      fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap'
    }}>
      {status}
    </span>
  );
}