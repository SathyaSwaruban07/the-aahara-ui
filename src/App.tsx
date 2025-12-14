import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './store'
import { setSearchTerm, addItem, decreaseItem, clearCart } from './store/cartSlice'
import Checkout from './Checkout'
import HomePage from './HomePage'
import OrderConfirmation from './OrderConfirmation'
import ConfirmedOrders from './ConfirmedOrders'
import { menuCategories, TrashIcon } from './menuData'


const OrderManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('Idli Varieties')
  const { cart, searchTerm, confirmedOrders } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0)

  const items = menuCategories[selectedCategory as keyof typeof menuCategories]
  const filteredItems = searchTerm === '' ? items : items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const groupedItems = filteredItems.reduce((acc: { regular: any[], special: any[] }, item) => {
    if (item.category === 'special') {
      acc.special.push(item)
    } else {
      acc.regular.push(item)
    }
    return acc
  }, { regular: [], special: [] })

  const navigate = useNavigate()

  return (
    <div className="home">
      <header>
        <img src="/IMG_5004.png" alt="The Aahara Restaurant" style={{maxWidth: '100%', height: '130px', width: 'auto', borderRadius: '20px'}} />
      </header>
      <div className="mobile-disclaimer">← Swipe to explore more categories →</div>
      <main className="menu-layout">
        
        <aside className="categories">
          
          {Object.keys(menuCategories).map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </aside>
        <section className="menu-items">
          <div className="search-container">
            <input type="text" placeholder="Search menu..." value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearchTerm(e.target.value))} className="search-input" />
            {searchTerm && <button className="clear-search" onClick={() => dispatch(setSearchTerm(''))}>×</button>}
          </div>

          {groupedItems.special?.[0] && <div className="subcategory">
            <h3>Today's Special</h3>
            <div className="item-list">
              {groupedItems.special.map((item, index) => {
                const itemKey = `${selectedCategory}-special-${item.name}`
                const count = cart[itemKey] || 0
                return (
                  <div key={index} className="menu-item">
                    <div className="item-top">
                      <div className="menu-item-left">
                        <h3>{item.name}</h3>
                      </div>
                    </div>
                    <div className="item-bottom">
                      <span className="price">{item.price}</span>
                      {count === 0 ? (
                        <button className="add-btn" onClick={() => dispatch(addItem(itemKey))}>
                          Add <CartIcon />
                        </button>
                      ) : (
                        <div className="counter">
                          <button className="counter-btn" onClick={() => dispatch(decreaseItem(itemKey))}>-</button>
                          <span className="count">{count}</span>
                          <button className="counter-btn" onClick={() => dispatch(addItem(itemKey))}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div> }

          <div className="subcategory">
            <h3>Our Classics</h3>
            <div className="item-list">
              {groupedItems.regular.map((item, index) => {
                const itemKey = `${selectedCategory}-regular-${item.name}`
                const count = cart[itemKey] || 0
                return (
                  <div key={index} className="menu-item">
                    <div className="item-top">
                      <div className="menu-item-left">
                        <h3>{item.name}</h3>
                      </div>
                    </div>
                    <div className="item-bottom">
                      <span className="price">{item.price}</span>
                      {count === 0 ? (
                        <button className="add-btn" onClick={() => dispatch(addItem(itemKey))}>
                          Add <CartIcon />
                        </button>
                      ) : (
                        <div className="counter">
                          <button className="counter-btn" onClick={() => dispatch(decreaseItem(itemKey))}>-</button>
                          <span className="count">{count}</span>
                          <button className="counter-btn" onClick={() => dispatch(addItem(itemKey))}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          
        </section>
      </main>
      <footer>
        <p>© 2025 Aahara Restaurant | Visit us for an unforgettable dining experience</p>
      </footer>
      {confirmedOrders.length > 0 && (
        <div style={{position: 'fixed', bottom: Object.keys(cart).length > 0 ? '90px': '20px', right: '30px', zIndex: 9999}}>
          <button
            onClick={() => navigate('/confirmedorders')}
            style={{
              backgroundColor: '#e1a81f',
              color: 'black',
              border: 'none',
              borderRadius: '14px',
              width: '150px',
              fontWeight: 'bold',
              cursor: 'pointer',
              
              boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            Confirmed Orders ({confirmedOrders.length})
          </button>
        </div>
      )}
      {Object.keys(cart).length > 0 && (
        <div className="checkout-banner">
          <button className="clear-cart-btn" onClick={() => { dispatch(clearCart()); dispatch(setSearchTerm('')); }}>
            Clear Cart
          </button>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Checkout ({totalItems}) <span className="arrow-animation">&rarr;</span>
          </button>
        </div>
      )}
    </div>
  )
}

const CartIcon = () => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="18"
  height="18"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.75"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M7 3c0 1 .6 1.6 1.2 2.2s1.2 1.2 1.2 2.2"></path>
  <path d="M12 2.5c0 1 .6 1.6 1.2 2.2s1.2 1.2 1.2 2.2"></path>
  <path d="M17 3c0 1 .6 1.6 1.2 2.2s1.2 1.2 1.2 2.2"></path>

  <path d="M4 10h16"></path>
  <path d="M5 10l1.5 6a2 2 0 0 0 2 1.5h7a2 2 0 0 0 2-1.5L19 10"></path>
</svg>


)



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ordermanagement" element={<OrderManagement />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        <Route path="/confirmedorders" element={<ConfirmedOrders />} />
      </Routes>
    </Router>
  )
}

export default App
