import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialInventory } from '../data/initialData';
import { TrendingUp, TrendingDown, ShoppingCart, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const weeklyData = [
  { week: 'Week 1', tapioca: 30, jasmine: 42, matcha: 20 },
  { week: 'Week 2', tapioca: 35, jasmine: 44, matcha: 19 },
  { week: 'Week 3', tapioca: 42, jasmine: 50, matcha: 21 },
  { week: 'Week 4', tapioca: 50, jasmine: 55, matcha: 20 },
  { week: 'Week 5', tapioca: 58, jasmine: 62, matcha: 18 },
  { week: 'Week 6', tapioca: 65, jasmine: 68, matcha: 17 },
  { week: 'Week 7', tapioca: 74, jasmine: 72, matcha: 16 },
  { week: 'Week 8', tapioca: 82, jasmine: 76, matcha: 15 },
];

const reorderSuggestions = [
  { name: 'Taro Powder', current: 0, recommended: 25, unit: 'lbs', urgency: 'Critical' },
  { name: 'Oolong Tea', current: 12, recommended: 30, unit: 'lbs', urgency: 'High' },
  { name: 'Matcha Powder', current: 8, recommended: 20, unit: 'lbs', urgency: 'High' },
  { name: 'Whole Milk', current: 3, recommended: 15, unit: 'gal', urgency: 'High' },
  { name: 'Oat Milk', current: 18, recommended: 25, unit: 'gal', urgency: 'Medium' },
];

export default function Forecasting() {
  const [inventory] = useLocalStorage('fengcha_inventory', initialInventory);
  const increasing = 8, decreasing = 3, reorderSoon = 5;

  const statCard = (label, value, color, icon) => (
    <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ color }}>{icon}</span>
      <div>
        <div style={{ color: '#64748b', fontSize: 12 }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: 24 }}>{value}</div>
      </div>
    </div>
  );

  const urgencyColor = { Critical: '#f87171', High: '#fbbf24', Medium: '#60a5fa' };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Forecasting</h1>
        <p style={{ color: '#64748b', marginTop: 4 }}>AI-driven demand predictions and inventory recommendations</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {statCard('Ingredients Tracked', inventory.length, '#94a3b8', <BarChart2 size={22} />)}
        {statCard('Demand Increasing', increasing, '#4ade80', <TrendingUp size={22} color="#4ade80" />)}
        {statCard('Demand Decreasing', decreasing, '#f87171', <TrendingDown size={22} color="#f87171" />)}
        {statCard('Reorder Soon', reorderSoon, '#fbbf24', <ShoppingCart size={22} color="#fbbf24" />)}
      </div>

      {/* Weekly Demand Chart */}
      <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Weekly Demand Trends (Top Ingredients)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weeklyData}>
            <XAxis dataKey="week" stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 8 }} />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Area type="monotone" dataKey="tapioca" name="Tapioca Pearls (lbs)" stroke="#a78bfa" fill="#4c1d95" strokeWidth={2} fillOpacity={0.3} />
            <Area type="monotone" dataKey="jasmine" name="Jasmine Tea (lbs)" stroke="#4ade80" fill="#14532d" strokeWidth={2} fillOpacity={0.3} />
            <Area type="monotone" dataKey="matcha" name="Matcha Powder (lbs)" stroke="#f472b6" fill="#831843" strokeWidth={2} fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Reorder Suggestions */}
      <div style={{ background: '#13151f', border: '1px solid #1e2130', borderRadius: 12, padding: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Reorder Recommendations</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e2130' }}>
              {['Ingredient', 'Current Stock', 'Recommended Order', 'Urgency', 'Action'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontSize: 12, fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reorderSuggestions.map((item, i) => (
              <tr key={i} style={{ borderTop: '1px solid #1e2130' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>{item.name}</td>
                <td style={{ padding: '14px 16px', color: item.current === 0 ? '#f87171' : '#fbbf24' }}>{item.current} {item.unit}</td>
                <td style={{ padding: '14px 16px', color: '#4ade80', fontWeight: 600 }}>{item.recommended} {item.unit}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ color: urgencyColor[item.urgency], fontWeight: 600 }}>{item.urgency}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <button style={{ background: '#14532d', color: '#4ade80', border: '1px solid #4ade80', borderRadius: 6, padding: '5px 12px', fontSize: 12, fontWeight: 600 }}>
                    Create Reorder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}