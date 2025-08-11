import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/list">List</Link>
      </nav>
      {location.pathname !== '/login' && (
        <Link to="/login" style={{
          padding: '8px 12px',
          background: '#2563eb',
          color: 'white',
          borderRadius: 6,
          textDecoration: 'none'
        }}>Login</Link>
      )}
    </header>
  )
}