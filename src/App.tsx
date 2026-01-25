import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <div className="logos">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>LMS Portal</h1>
      <p className="subtitle">Modern Learning Management System built with Vite + React</p>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Interactions: {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> to start building your premium LMS experience.
        </p>
      </div>
      
      <p className="read-the-docs">
        Powered by cutting-edge web technologies
      </p>
    </div>
  )
}

export default App
