import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Shipments from './pages/Shipments';
import Vendors from './pages/Vendors';
import Forecasting from './pages/Forecasting';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1117' }}>
        <Sidebar />
        <main style={{ marginLeft: '220px', flex: 1, minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/forecasting" element={<Forecasting />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}