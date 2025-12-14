export const menuCategories = {
  'Idli Varieties': [
    { name: 'Idli (2 pcs)', price: '₹40', desc: 'Steamed rice cakes with coconut chutney.', category: 'regular' },
    { name: 'Masala Idli (2 pcs)', price: '₹50', desc: 'Idli loaded with chutney.', category: 'regular' },
    { name: 'Rava Idli (2 pcs)', price: '₹45', desc: 'Rava-based steamed cakes.', category: 'special' },
    { name: 'Podi Idli (2 pcs)', price: '₹50', desc: 'Idli topped with spicy podi.', category: 'regular' },
  ],
  'Dosa Varieties': [
    { name: 'Plain Dosa', price: '₹50', desc: 'Thin pancake served with chutneys and sambar.', category: 'regular' },
    { name: 'Masala Dosa', price: '₹70', desc: 'Dosa filled with potato masala.', category: 'regular' },
    { name: 'Onion Dosa', price: '₹60', desc: 'Dosa with crispy onion toppings.', category: 'regular' },
    { name: 'Ghee Roast', price: '₹80', desc: 'Crispy ghee-roasted dosa.', category: 'regular' },
    { name: 'Udupi Masala Dosa', price: '₹75', desc: 'Light and airy dosa.', category: 'special' },
    { name: 'Rava Dosa', price: '₹90', desc: 'Dosa with cheese filling.', category: 'regular' },
    { name: 'Butter Uttapam', price: '₹60', desc: 'Thick tomato and onion pancake.', category: 'special' },
  ],
  'Poori Varieties': [
    { name: 'Masala Poori', price: '₹35', desc: 'Spicy poori with potato filling.', category: 'regular' },
    { name: 'Channa Bhatoora', price: '₹40', desc: 'Poori stuffed with spiced potatoes.', category: 'regular' },
  ],
  'Main Course': [
    { name: 'Limited Meals', price: '₹120', desc: 'Complete meal with rice, curry, and sides.', category: 'regular' },
    { name: 'Curd Rice', price: '₹80', desc: 'Rice served with spicy curry.', category: 'regular' },
    { name: 'Mushroom Biryani', price: '₹90', desc: 'Paneer in masala rice.', category: 'regular' },
    { name: 'Vegetable Biryani', price: '₹70', desc: 'Mixed vegetable curry with rice.', category: 'regular' },
    { name: 'Sambhar Rice', price: '₹85', desc: 'Spiced rice with vegetables.', category: 'regular' },
  ],
  
  'Snacks & Sides': [
    { name: 'Butter Paniyaram (6 pcs)', price: '₹40', desc: 'Crispy lentil fritters with spicy chutney.', category: 'special' },
    { name: 'Uzhundu Vadai', price: '₹10', desc: 'Crispy lentil fritters with spicy chutney.', category: 'regular' },
    { name: 'Paruppu Vadai', price: '₹10', desc: 'Vegetable fritters.', category: 'regular' },
    { name: 'Vazhakka Bajji', price: '₹10', desc: 'Onion and potato fritters.', category: 'regular' },
    { name: 'Samosa (2 pcs)', price: '₹25', desc: 'Pastry filled with spiced potatoes.', category: 'regular' },
    { name: 'Sambar Vadai (2 pcs)', price: '₹35', desc: 'Medu vada with sambar.', category: 'regular' },
    { name: 'Curd Vadai (2 pcs)', price: '₹35', desc: 'Medu vada with sambar.', category: 'regular' },
  ],
}

export const TrashIcon = () => (
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
  <path d="M3 6h18"></path>
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 0 2-2h2"></path>
  <path d="M8 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
  <line x1="10" x2="10" y1="11" y2="17"></line>
  <line x1="14" x2="14" y1="11" y2="17"></line>
</svg>


)
