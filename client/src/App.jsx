import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import List from './pages/List'

export default function App() {
  return (
    <div>
      <nav style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #eee', display: 'flex', gap: '1rem' }}>
        <Link to="/">Front Page</Link>
        <Link to="/auth">Login</Link>
        <Link to="/list">List</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  )
}
