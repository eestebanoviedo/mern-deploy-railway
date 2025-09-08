import { useEffect } from "react"
import { useState } from "react"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetch(BACKEND_URL + '/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(BACKEND_URL + '/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price, description })
    })
      .then(res => res.json())
      .then(data => setProducts([...products, data]))
      .catch(err => console.log(err))
  }

  return (
    <div>
      {/* {form productso} */}
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit">Add Product</button>
        </form>
      </div>
      <h1>App</h1>
      {products.map(product => (
        <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  )
}

export default App