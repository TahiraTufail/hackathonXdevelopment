import { useState, useEffect } from 'react';
import './App.css';
// data.js
export const products = [
  { id: 1, productName: "Wireless Headphones", category: "Electronics", price: 99.99, stockQuantity: 25, status: "In Stock" },
  { id: 2, productName: "Gaming Mouse", category: "Accessories", price: 49.99, stockQuantity: 8, status: "Low Stock" },
  { id: 3, productName: "Smart Watch", category: "Wearables", price: 199.99, stockQuantity: 15, status: "In Stock" },
  { id: 4, productName: "Bluetooth Speaker", category: "Electronics", price: 79.99, stockQuantity: 12, status: "In Stock" },
  { id: 5, productName: "USB-C Charger", category: "Accessories", price: 29.99, stockQuantity: 5, status: "Low Stock" },
  { id: 6, productName: "Fitness Tracker", category: "Wearables", price: 149.99, stockQuantity: 20, status: "In Stock" },
  { id: 7, productName: "4K Monitor", category: "Electronics", price: 349.99, stockQuantity: 7, status: "Low Stock" },
  { id: 8, productName: "Mechanical Keyboard", category: "Accessories", price: 89.99, stockQuantity: 18, status: "In Stock" },
  { id: 9, productName: "VR Headset", category: "Electronics", price: 399.99, stockQuantity: 4, status: "Low Stock" },
  { id: 10, productName: "Wireless Earbuds", category: "Electronics", price: 129.99, stockQuantity: 22, status: "In Stock" },
  { id: 11, productName: "Smartphone G10", category: "Electronics", price: 699.99, stockQuantity: 10, status: "In Stock" },
  { id: 12, productName: "Laptop Stand", category: "Accessories", price: 39.99, stockQuantity: 30, status: "In Stock" },
  { id: 13, productName: "Noise Cancelling Headphones", category: "Electronics", price: 249.99, stockQuantity: 6, status: "Low Stock" },
  { id: 14, productName: "Smart Glasses", category: "Wearables", price: 299.99, stockQuantity: 9, status: "Low Stock" },
  { id: 15, productName: "Portable SSD 1TB", category: "Accessories", price: 159.99, stockQuantity: 13, status: "In Stock" },
  { id: 16, productName: "Action Camera", category: "Electronics", price: 199.99, stockQuantity: 11, status: "In Stock" },
  { id: 17, productName: "Smart Ring", category: "Wearables", price: 129.99, stockQuantity: 3, status: "Low Stock" },
  { id: 18, productName: "Gaming Headset", category: "Accessories", price: 79.99, stockQuantity: 14, status: "In Stock" },
  { id: 19, productName: "LED Desk Lamp", category: "Electronics", price: 59.99, stockQuantity: 28, status: "In Stock" },
  { id: 20, productName: "Wireless Charger", category: "Accessories", price: 49.99, stockQuantity: 7, status: "Low Stock" },
  { id: 21, productName: "Smart Scale", category: "Wearables", price: 99.99, stockQuantity: 16, status: "In Stock" },
  { id: 22, productName: "Gaming Controller", category: "Accessories", price: 69.99, stockQuantity: 9, status: "Low Stock" },
  { id: 23, productName: "Portable Projector", category: "Electronics", price: 299.99, stockQuantity: 5, status: "Low Stock" },
  { id: 24, productName: "Wireless Keyboard", category: "Accessories", price: 59.99, stockQuantity: 21, status: "In Stock" },
  { id: 25, productName: "Smart Thermostat", category: "Electronics", price: 249.99, stockQuantity: 12, status: "In Stock" },
  { id: 26, productName: "VR Gloves", category: "Wearables", price: 199.99, stockQuantity: 2, status: "Low Stock" },
  { id: 27, productName: "HD Webcam", category: "Electronics", price: 89.99, stockQuantity: 19, status: "In Stock" },
  { id: 28, productName: "Laptop Backpack", category: "Accessories", price: 79.99, stockQuantity: 23, status: "In Stock" },
  { id: 29, productName: "Smart Light Bulb", category: "Electronics", price: 29.99, stockQuantity: 17, status: "In Stock" },
  { id: 30, productName: "Fitness Headband", category: "Wearables", price: 49.99, stockQuantity: 6, status: "Low Stock" }
];

interface Product {
  id: number;
  productName: string;
  category: string;
  price: number;
  stockQuantity: number;
  status: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  // Filter products based on search term and low stock filter
  useEffect(() => {
    let result = products;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply low stock filter
    if (showLowStock) {
      result = result.filter(product => 
        product.status === 'Low Stock'
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, showLowStock]);
  
  // Calculate total inventory value
  const totalInventoryValue = filteredProducts.reduce((total, product) => {
    return total + (product.price * product.stockQuantity);
  }, 0);
  
  return (
    <div className="app">
      <header className="dashboard-header">
        <h1>TechMart Inventory Dashboard</h1>
        <div className="inventory-value">
          <h2>Total Inventory Value: ${totalInventoryValue.toFixed(2)}</h2>
        </div>
      </header>
      
      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <label>
            <input
              type="checkbox"
              checked={showLowStock}
              onChange={(e) => setShowLowStock(e.target.checked)}
            />
            Show Low Stock Only
          </label>
        </div>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className={`product-card ${product.status === 'Low Stock' ? 'low-stock' : 'in-stock'}`}
          >
            <h3>{product.productName}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="category">{product.category}</p>
            <div className="stock-info">
              <span className="quantity">Stock: {product.stockQuantity}</span>
              <span className={`status-indicator ${product.status.toLowerCase().replace(' ', '-')}`}>
                {product.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default App;
