import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [basket, setBasket] = useState({})
  const [token, setToken] = useState('')

  const addProduct = async () => {
    await axios.post(
      //  `https://abch.mithrandir.hu/hu/default/jsonapi/basket?id=default&related=product&_token=${token}`,
      `https://abch.mithrandir.hu/hu/default/jsonapi/basket?related=product&_token=${token}`,
      {
        data: {
          attributes: {
            'product.id': '25',
          },
        },
      },
      // {
      //   withCredentials: true,
      // },
    )
  }

  useEffect(() => {
    const fetchBasket = async () => {
      const data = await axios.get(
        `https://abch.mithrandir.hu/hu/default/jsonapi/basket`,
        {
          //withCredentials: true,
        },
      )
      setBasket(data)
      setToken(data.data.meta.csrf.value)
    }
    fetchBasket()
  }, [])

  if (!basket) {
    return <div>Loading...</div>
  }

  return (
    <>
      <p>Token: {token}</p>
      <button onClick={() => addProduct()}>order product:25</button>
      <pre>{JSON.stringify(basket, null, 2)}</pre>
    </>
  )
}

export default App
