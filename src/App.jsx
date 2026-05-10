import Inicio from './pages/inicio'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Inicio />
    </AuthProvider>
  )
}

export default App
