import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import List from './pages/List.jsx'
import Header from './components/Header.jsx'
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <div style={{ padding: '16px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
