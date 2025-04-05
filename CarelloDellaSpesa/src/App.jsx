import { useState } from "react";
import "./App.css"

export default function App() {
  const [addedProducts, setAddedProducts] = useState([])
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const addToCart = (product) => {
    const presenteNelCarrello = addedProducts.find((p) => p.name === product.name);
    if (!presenteNelCarrello) {
      const productQantity = { ...product, quantity: 1 }
      setAddedProducts([...addedProducts, productQantity]);
    } else {
      updateProductQuantity(product);
    }
  }

  const updateProductQuantity = (product) => {
    const updated = addedProducts.map((p) => {
      if (p.name === product.name) {
        return { ...p, quantity: p.quantity + 1 };
      } else {
        return p;
      }
    });
    setAddedProducts(updated);
  }

  const removeToCart = (product) => {
    const updated = addedProducts
      .map((p) => {
        if (p.name === product.name) {
          if (p.quantity > 1) {
            return { ...p, quantity: p.quantity - 1 };
          } else {
            return null;
          }
        }
        return p;
      })
      .filter(Boolean);

    setAddedProducts(updated);
  };

  return (
    <div className="container">
      <h1>Prodotti</h1>
      <ul className="product-list">
        {products.map((product, index) => (
          <li key={index} className="product-item">
            <div>
              <span>{product.name} - €{product.price.toFixed(2)}</span>
            </div>
            <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>

      <h2>Carrello</h2>
      {addedProducts.length === 0 ? (
        <p>Il carrello è vuoto</p>
      ) : (
        <ul className="cart-list">
          {addedProducts.map((product, index) => (
            <li key={index} className="cart-item">
              <div> {product.name} - €{product.price.toFixed(2)} - Quantità: {product.quantity}</div>
              <button onClick={() => removeToCart(product)}>rimuovi dal carrello</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


