import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from './store'
import './App.css'

const ConfirmedOrders = () => {
  const { confirmedOrders } = useSelector((state: RootState) => state.cart)
  const navigate = useNavigate()

  return (
    <div className="home">
      <header>
        <img src="/IMG_5004.png" alt="The Aahara Restaurant" style={{maxWidth: '100%', height: '130px', width: 'auto', borderRadius: '20px'}} />
      </header>
      <main>
        <div style={{padding: '20px'}}>
          <h1 style={{textAlign: 'center', fontSize: '32px', marginBottom: '30px'}}>Your Confirmed Orders</h1>
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto'}}>
            {confirmedOrders.length === 0 ? (
              <div style={{textAlign: 'center', fontSize: '18px', color: '#666'}}>
                You have no confirmed orders yet.
              </div>
            ) : (
              confirmedOrders.map((order, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  border: '1px solid #e1e5e9',
                  backgroundPosition: '0% 0%, 0% 100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='20' viewBox='0 0 100 75' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23FAF9F3'/%3E%3Cg fill='none' opacity='0.5' stroke='%23E68224' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M50 48 C 45 35, 42 25, 50 15 C 58 25, 55 35, 50 48 Z' /%3E%3Cpath d='M50 48 C 40 55, 25 50, 15 40 C 12 30, 25 25, 35 30 C 42 35, 45 42, 50 48' /%3E%3Cpath d='M50 48 C 60 55, 75 50, 85 40 C 88 30, 75 25, 65 30 C 58 35, 55 42, 50 48' /%3E%3Cpath d='M50 68 C 42 68, 35 65, 15 62' /%3E%3Cpath d='M50 68 C 58 68, 65 65, 85 62' /%3E%3Cpath d='M25 50 C 25 60, 40 65, 50 68' /%3E%3Cpath d='M75 50 C 75 60, 60 65, 50 68' /%3E%3C/g%3E%3Cg fill='%23E68224' stroke='none'%3E%3Ccircle cx='50' cy='8' r='2' /%3E%3Ccircle cx='20' cy='22' r='2' /%3E%3Ccircle cx='80' cy='22' r='2' /%3E%3Ccircle cx='50' cy='72' r='2' /%3E%3C/g%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 100 75' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23FAF9F3'/%3E%3Cg opacity='0.5' fill='none' stroke='%23E68224' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M50 48 C 45 35, 42 25, 50 15 C 58 25, 55 35, 50 48 Z' /%3E%3Cpath d='M50 48 C 40 55, 25 50, 15 40 C 12 30, 25 25, 35 30 C 42 35, 45 42, 50 48' /%3E%3Cpath d='M50 48 C 60 55, 75 50, 85 40 C 88 30, 75 25, 65 30 C 58 35, 55 42, 50 48' /%3E%3Cpath d='M50 68 C 42 68, 35 65, 15 62' /%3E%3Cpath d='M50 68 C 58 68, 65 65, 85 62' /%3E%3Cpath d='M25 50 C 25 60, 40 65, 50 68' /%3E%3Cpath d='M75 50 C 75 60, 60 65, 50 68' /%3E%3C/g%3E%3Cg fill='%23E68224' opacity='0.5' stroke='none'%3E%3Ccircle cx='50' cy='8' r='2' /%3E%3Ccircle cx='20' cy='22' r='2' /%3E%3Ccircle cx='80' cy='22' r='2' /%3E%3Ccircle cx='50' cy='72' r='2' /%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '14px 14px',
        backgroundRepeat: 'repeat-x, repeat-x, repeat-x, repeat-y',
                }}>
                  <div style={{marginBottom: '10px'}}>
                    <h3 style={{fontSize: '18px', color: '#333'}}>Order #{confirmedOrders.length - index}</h3>
                    <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '10px'}}>
                        <circle cx="50" cy="50" r="45" fill="#e1a81f"/>
                        <text x="50" y="65" textAnchor="middle" fontSize="30" fontWeight="bold" fill="black">{order.token}</text>
                      </svg>
                    
                  </div>
                  <span style={{fontSize: '16px', fontWeight: 'bold', color: '#333'}}>Service: {order.dineType}</span>
                  <div>
                    <h4 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '10px'}}>Items Ordered:</h4>
                    <div style={{fontSize: '14px', color: '#333'}}>
                      {order.items.map((item, i) => (
                        <h4 key={i}>{item}</h4>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div style={{textAlign: 'center', marginTop: '40px'}}>
            <button
              onClick={() => navigate('/ordermanagement')}
              style={{
                padding: '15px 40px',
                fontSize: '18px',
                fontWeight: 'bold',
                backgroundColor: '#e1a81f',
                color: 'black',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              Back to Menu
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

export default ConfirmedOrders
