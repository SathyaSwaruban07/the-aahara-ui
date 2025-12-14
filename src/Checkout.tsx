import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './store'
import { addItem, decreaseItem, addConfirmedOrder } from './store/cartSlice'
import './App.css'
import { menuCategories } from './menuData'

const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { cart, dineType } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const [selectedPayment, setSelectedPayment] = useState('')

  const allItems = Object.values(menuCategories).flat();
  const getPrice = (name: string) => {
    const item = allItems.find((i: any) => i.name === name);
    return item ? parseInt(item.price.slice(1)) : 0;
  }

  const cartItems = Object.entries(cart).filter(([_, count]) => count > 0).map(([key, count]) => {
    const parts = key.split('-');
    const name = parts.slice(-1)[0];
    const price = getPrice(name);
    const itemTotal = price * count;
    return { name: name.padEnd(30, ' '), count: count.toString().padStart(2, ' '), total: itemTotal.toString().padStart(4, ' ') }
  })

  const totalCost = cartItems.reduce((sum, item) => sum + parseInt(item.total.trim()), 0)

  const handleExplore = () => {
    navigate('/ordermanagement')
  }

  useEffect(() => {
    const preventNavigation = (e: any) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.history.pushState(null, document.title, window.location.href);
    };
    window.addEventListener('popstate', preventNavigation);
    return () => window.removeEventListener('popstate', preventNavigation);
  }, []);

  return (
    <div className="home">
      <header>
        <img src="/IMG_5004.png" alt="The Aahara Restaurant" style={{maxWidth: '100%', height: '130px', width: 'auto', borderRadius: '20px'}} />
      </header>
      <main className="menu-layout">
        <div className="categories">
          <h2 style={{textAlign: 'center'}}>{dineType} Order Summary</h2>
        </div>
        <section className="menu-items">
          <div style={{backgroundColor: 'white', padding: '20px', marginTop: '20px', marginBottom: '20px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}}>
            <div style={{marginBottom: '20px', fontSize: '20px', fontWeight: 'bold'}}>Selected Items</div>
            <div style={{fontSize: '16px'}}>
              {cartItems.map((item, index) => {
                const itemKey = Object.keys(cart)[index]; // get the key for this item
                const count = cart[itemKey];
                return (
                  <div key={index} style={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                    <span style={{flex: 1, overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.name.trim()}</span>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px'}}>
                      <button style={{padding: '2px 6px', cursor: 'pointer', background: 'linear-gradient(135deg, #e1a81f, #e1a81f)', color: 'black', border: '2px solid #e1a81f', borderRadius: '4px'}} onClick={() => dispatch(decreaseItem(itemKey))}>-</button>
                      <span>{count}</span>
                      <button style={{padding: '2px 6px', cursor: 'pointer', background: 'linear-gradient(135deg, #e1a81f, #e1a81f)', color: 'black', border: '2px solid #e1a81f', borderRadius: '4px'}} onClick={() => dispatch(addItem(itemKey))}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}}>
            <div style={{marginBottom: '20px', fontSize: '20px', fontWeight: 'bold'}}>Bill Details</div>
            <div>
              <div style={{marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{flex: 1, minWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis'}}>Item</span>
                <span style={{width: '50px', textAlign: 'center'}}>Qty</span>
                <span style={{width: '80px', textAlign: 'right'}}>Total</span>
              </div>
              <hr />
              {cartItems.map((item, index) => (
                <div key={index} style={{marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{flex: 1, minWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.name.trim()}</span>
                  <span style={{width: '50px', textAlign: 'center'}}>{item.count.trim()}</span>
                  <span style={{width: '80px', textAlign: 'right'}}>₹{item.total.trim()}</span>
                </div>
              ))}
              <hr />
              <div style={{marginTop: '20px', textAlign: 'left', fontSize: '18px'}}>
                Service Type: {dineType}
              </div>
              <div style={{marginTop: '10px', textAlign: 'right', fontSize: '24px', fontWeight: 'bold'}}>
                Grand Total: ₹{totalCost}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {cartItems.length > 0 && <div style={{backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}}>
        <div style={{marginBottom: '20px', fontSize: '20px', fontWeight: 'bold'}}>Payment Methods</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '30px', width: '100%'}}>
          <div>
            <h4 style={{textAlign: 'left', marginBottom: '15px', fontSize: '18px', fontWeight: 'bold'}}>UPI</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
              <button
                onClick={() => setSelectedPayment('Google Pay')}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '12px',
                  width: '85%',
                  backgroundColor: selectedPayment === 'Google Pay' ? '#e1a81f' : '#f0f0f0',
                  color: selectedPayment === 'Google Pay' ? 'black' : 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  textAlign: 'center'
                }}
              >
                Google Pay
              </button>
              <button
                onClick={() => setSelectedPayment('Phone Pay')}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '12px',
                  width: '85%',
                  backgroundColor: selectedPayment === 'Phone Pay' ? '#e1a81f' : '#f0f0f0',
                  color: selectedPayment === 'Phone Pay' ? 'black' : 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  textAlign: 'center'
                }}
              >
                Phone Pay
              </button>
              <button
                onClick={() => setSelectedPayment('Bhim')}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '12px',
                  width: '85%',
                  backgroundColor: selectedPayment === 'Bhim' ? '#e1a81f' : '#f0f0f0',
                  color: selectedPayment === 'Bhim' ? 'black' : 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  textAlign: 'center'
                }}
              >
                Bhim
              </button>
              <button
                onClick={() => setSelectedPayment('UPI ID')}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '12px',
                  width: '85%',
                  backgroundColor: selectedPayment === 'UPI ID' ? '#e1a81f' : '#f0f0f0',
                  color: selectedPayment === 'UPI ID' ? 'black' : 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  textAlign: 'center'
                }}
              >
                UPI ID
              </button>
            </div>
          </div>
          <div>
            <h4 style={{textAlign: 'left', marginBottom: '15px', fontSize: '18px', fontWeight: 'bold'}}>Cards</h4>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button
                onClick={() => setSelectedPayment('Razorpay')}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '12px',
                  width: '85%',
                  backgroundColor: selectedPayment === 'Razorpay' ? '#e1a81f' : '#f0f0f0',
                  color: selectedPayment === 'Razorpay' ? 'black' : 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  textAlign: 'center'
                }}
              >
                Razorpay
              </button>
            </div>
          </div>
          <div>
            <h4 style={{textAlign: 'left', marginBottom: '15px', fontSize: '18px', fontWeight: 'bold'}}>Wallet</h4>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button
                onClick={() => setSelectedPayment('Mobikwik')}
                style={{
                  padding: '12px',
                  border: 'none',
                  borderRadius: '12px',
                  width: '85%',
                  backgroundColor: selectedPayment === 'Mobikwik' ? '#e1a81f' : '#f0f0f0',
                  color: selectedPayment === 'Mobikwik' ? 'black' : 'inherit',
                  cursor: 'pointer',
                  fontSize: '16px',
                  textAlign: 'center'
                }}
              >
                Mobikwik
              </button>
            </div>
          </div>
        </div>
      </div>}
      <footer>
        <p>© 2025 Aahara Restaurant | Visit us for an unforgettable dining experience</p>
      </footer>
      {Object.keys(cart).length > 0 && (
        <div className="checkout-banner">
          <button className="clear-cart-btn" onClick={handleExplore}>
            {"← Explore "}
          </button>
          <button className="checkout-btn"
                  disabled={selectedPayment === ''}
                  onClick={() => {
                    if (selectedPayment !== '') {
                      const token = Math.floor(Math.random() * 10) + 1;
                      const items = cartItems.map(item => item.name.trim());
                      dispatch(addConfirmedOrder({
                        token,
                        items,
                        dineType: dineType || 'Dine In',
                        timestamp: Date.now()
                      }));
                      navigate('/orderconfirmation');
                    }
                  }}
                  style={{
                    opacity: selectedPayment === '' ? 0.5 : 1,
                    cursor: selectedPayment === '' ? 'not-allowed' : 'pointer',
                    pointerEvents: selectedPayment === '' ? 'none' : 'auto'
                  }}>
            Pay ₹{totalCost}
          </button>
        </div>
      )}
    </div>
  )
}

export default Checkout
