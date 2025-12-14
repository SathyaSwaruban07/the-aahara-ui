import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setDineType } from './store/cartSlice'
import './App.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSelection = (type: 'Dine In' | 'Take Away') => {
    const dineType = type === 'Dine In' ? 'dine-in' : 'take-away'
    dispatch(setDineType(type))
    navigate('/ordermanagement')
  }

  return (
    <div className="home">
      <header>
        <img src="/IMG_5004.png" alt="The Aahara Restaurant" style={{maxWidth: '100%', height: '130px', width: 'auto', borderRadius: '20px'}} />
      </header>
      <main className='menu-layout'>
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px', height: '100%'}}>
          <button
            onClick={() => handleSelection('Dine In')}
            style={{
              padding: '30px 60px',
              fontSize: '24px',
              fontWeight: 'bold',
              backgroundColor: '#e1a81f',
              color: 'black',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '90vw',
              textAlign: 'center'
            }}
          >
            Dine In
          </button>
          <button
            onClick={() => handleSelection('Take Away')}
            style={{
              padding: '30px 60px',
              fontSize: '24px',
              fontWeight: 'bold',
              backgroundColor: '#e1a81f',
              color: 'black',
              border: 'none',
              borderRadius: '15px',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '90vw',
              textAlign: 'center'
            }}
          >
            Take Away/Parcel
          </button>
        </div>
      </main>
    </div>
  )
}

export default HomePage
