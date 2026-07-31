import { useState } from 'react'
import './App.css'
import YoutubeLogin from '../components/youtubeLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='app'>
      <YoutubeLogin/>
    </div>
    </>
  )
}

export default App
