import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '2rem' }}>
      <button
        onClick={() => navigate('/auth')}
        style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem' }}
      >
        Login
      </button>
      <h1>Welcome</h1>
      <p>This is the front page. Use the Login button to sign in or sign up.</p>
    </div>
  )
}