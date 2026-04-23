export default function Settings() {
  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Settings</h1>
        <p style={{ color: '#64748b', marginTop: 4 }}>Manage your account and system preferences</p>
      </div>
      <div style={{ display: 'grid', gap: 16, maxWidth: 600 }}>
        {[
          { title: 'Profile', desc: 'Alex Chen — Store Manager', action: 'Edit Profile' },
          { title: 'Notifications', desc: 'Email and push alert preferences', action: 'Configure' },
          { title: 'Reorder Thresholds', desc: 'Set default minimum stock levels', action: 'Manage' },
          { title: 'Data & Export', desc: 'Export inventory data as CSV or PDF', action: 'Export' },
          { title: 'Reset Demo Data', desc: 'Restore all data to original sample values', action: 'Reset' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 10, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{s.title}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>{s.desc}</div>
            </div>
            <button style={{ background: 'none', border: '1px solid #2d3148', borderRadius: 8, color: '#94a3b8', padding: '6px 14px', fontSize: 13 }}>{s.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
}