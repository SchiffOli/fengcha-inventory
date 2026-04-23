export default function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 12,
        padding: 24, minWidth: 400, maxWidth: 560, width: '90%'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#64748b', fontSize: 20, lineHeight: 1
          }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}