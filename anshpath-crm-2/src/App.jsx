import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SellerDashboard from './seller/components/SellerDashboard'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        App Components
        <SellerDashboard />
        <ToastContainer />
    </>
  )
}

export default App
