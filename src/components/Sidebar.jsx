import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Truck, Users, TrendingUp, Bell, Settings, Leaf } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inventory', icon: Package, label: 'Inventory' },
  { to: '/shipments', icon: Truck, label: 'Shipments' },
  { to: '/vendors', icon: Users, label: 'Vendors' },
  { to: '/forecasting', icon: TrendingUp, label: 'Forecasting' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: '220px', minHeight: '100vh', background: '#13151f',
      display: 'flex', flexDirection: 'column', padding: '24px 0',
      borderRight: '1px solid #1e2130', position: 'fixed', top: 0, left: 0, zIndex: 100
    }}>
      {/* Profile */}
     <img src="/fengcha-inventory/avatar.png" alt="Ze Shi (Zane) Li"
  style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 8, objectFit: 'cover' }} />
<div style={{ fontWeight: 700, fontSize: 15 }}>Ze Shi (Zane) Li</div>
<div style={{ color: '#64748b', fontSize: 12 }}>Store Manager</div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, marginBottom: 4,
              textDecoration: 'none', fontWeight: 500,
              background: isActive ? '#1a2e1a' : 'transparent',
              color: isActive ? '#4ade80' : '#94a3b8',
              transition: 'all 0.15s'
            })}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Brand */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #1e2130' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4ade80', fontWeight: 800, fontSize: 15 }}>
          <Leaf size={18} />
          FENG CHA
        </div>
        <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>© 2026 Feng Cha Yukon</div>
      </div>
    </aside>
  );
}