import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './store'
import { clearCart } from './store/cartSlice'
import './App.css'

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const { confirmedOrders } = useSelector((state: RootState) => state.cart)
  const lastOrder = confirmedOrders[confirmedOrders.length - 1]
  const tokenNumber = lastOrder?.token || 1

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <div className="home">
      <header>
        <img src="/IMG_5004.png" alt="The Aahara Restaurant" style={{maxWidth: '100%', height: '130px', width: 'auto', borderRadius: '20px'}} />
      </header>
      <main style={{
        minHeight: '70vh'
      }}>
        <div style={{textAlign: 'center', padding: '20px 20px'}}>
          <h1 style={{fontSize: '32px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px'}}>
            
            Order Confirmed
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#4CAF50" stroke="#4CAF50" strokeWidth="2"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </h1>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            maxWidth: '500px',
            margin: '0 auto',
            border: '1px solid #e1e5e9',
            backgroundPosition: '0% 0%, 0% 100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='20' viewBox='0 0 100 75' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23FAF9F3'/%3E%3Cg fill='none' opacity='0.5' stroke='%23E68224' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M50 48 C 45 35, 42 25, 50 15 C 58 25, 55 35, 50 48 Z' /%3E%3Cpath d='M50 48 C 40 55, 25 50, 15 40 C 12 30, 25 25, 35 30 C 42 35, 45 42, 50 48' /%3E%3Cpath d='M50 48 C 60 55, 75 50, 85 40 C 88 30, 75 25, 65 30 C 58 35, 55 42, 50 48' /%3E%3Cpath d='M50 68 C 42 68, 35 65, 15 62' /%3E%3Cpath d='M50 68 C 58 68, 65 65, 85 62' /%3E%3Cpath d='M25 50 C 25 60, 40 65, 50 68' /%3E%3Cpath d='M75 50 C 75 60, 60 65, 50 68' /%3E%3C/g%3E%3Cg fill='%23E68224' stroke='none'%3E%3Ccircle cx='50' cy='8' r='2' /%3E%3Ccircle cx='20' cy='22' r='2' /%3E%3Ccircle cx='80' cy='22' r='2' /%3E%3Ccircle cx='50' cy='72' r='2' /%3E%3C/g%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 100 75' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23FAF9F3'/%3E%3Cg opacity='0.5' fill='none' stroke='%23E68224' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M50 48 C 45 35, 42 25, 50 15 C 58 25, 55 35, 50 48 Z' /%3E%3Cpath d='M50 48 C 40 55, 25 50, 15 40 C 12 30, 25 25, 35 30 C 42 35, 45 42, 50 48' /%3E%3Cpath d='M50 48 C 60 55, 75 50, 85 40 C 88 30, 75 25, 65 30 C 58 35, 55 42, 50 48' /%3E%3Cpath d='M50 68 C 42 68, 35 65, 15 62' /%3E%3Cpath d='M50 68 C 58 68, 65 65, 85 62' /%3E%3Cpath d='M25 50 C 25 60, 40 65, 50 68' /%3E%3Cpath d='M75 50 C 75 60, 60 65, 50 68' /%3E%3C/g%3E%3Cg fill='%23E68224' opacity='0.5' stroke='none'%3E%3Ccircle cx='50' cy='8' r='2' /%3E%3Ccircle cx='20' cy='22' r='2' /%3E%3Ccircle cx='80' cy='22' r='2' /%3E%3Ccircle cx='50' cy='72' r='2' /%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '14px 14px',
        backgroundRepeat: 'repeat-x, repeat-x, repeat-x, repeat-y',
        
          }}>
            <div style={{marginBottom: '20px'}}>
              <h3 style={{fontSize: '20px', marginBottom: '10px', color: '#333'}}>Order:</h3>
              <ul style={{textAlign: 'left', listStyleType: 'none', fontSize: '16px', display: "inline-block"}}>
                {lastOrder?.items.map((item, index) => (
                  <li key={index} style={{marginBottom: '5px'}}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{marginBottom: '20px'}}>
              <h2 style={{fontSize: '20px', marginBottom: '10px', color: '#333'}}>Your Token number:</h2>
              <svg width="120" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', margin: '0 auto'}}>
                <circle cx="100" cy="100" r="90" fill="#e1a81f"/>
                <text x="100" y="120" textAnchor="middle" fontSize="60" fontWeight="bold" fill="black">{tokenNumber}</text>
              </svg>
            </div>
            
            <h2 style={{fontSize: '20px', marginBottom: '20px', color: '#333'}}>Collect your order in:</h2>
            
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#e1a81f',
              marginBottom: '40px',
              fontFamily: 'monospace'
            }}>
              {timeString}
            </div>
            <p style={{fontSize: '18px', color: '#666', marginBottom: '30px'}}>
              Your delicious meal is being prepared with care!
            </p>
            <button
              onClick={() => { dispatch(clearCart()); navigate('/ordermanagement'); }}
              style={{
                padding: '15px 40px',
                fontSize: '18px',
                fontWeight: 'bold',
                backgroundColor: '#e1a81f',
                color: 'black',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              Explore Menu
            </button>
          </div>
        </div>
      </main>
      <footer>
        <p>© 2025 Aahara Restaurant | Visit us for an unforgettable dining experience</p>
      </footer>
    </div>
  )
}

export default OrderConfirmation
