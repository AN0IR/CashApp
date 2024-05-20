import { useState, useEffect } from 'react'
import Card from './components/card'
import CustomDropdown from './components/customDropdown'

function App() {
  const [input, setInput] = useState({
    name: "",
    amount: "",
    type: "",
  })
  const [cards, setCards] = useState([])
  const [currentAmount, setCurrentAmount] = useState(0)
  useEffect(() => { showTotal() }, [cards])

  function handleChange(e) {
    const { name, value } = e.target;

    const parsedValue = name === 'amount' ? parseInt(value, 10) || '' : value;

    setInput((prevValue) => ({
      ...prevValue,
      [name]: parsedValue
    }))
  }

  function handleAddCard() {
    if (input.type !== "" && input.name !== "" && input.amount !== "") {
      setCards((prevValues) => {
        return [...prevValues, input]
      })
    }
  }

  function deleteCard(id) {
    setCards((prevValues) => {
      return prevValues.filter((card, index) => {
        return index !== id
      })
    })
  }

  function showTotal() {
    if (!cards.length == 0) {
      let totalAmount = 0;

      cards.forEach((item) => {
        if (item.type === "income") {
          totalAmount += item.amount;
        } else {
          totalAmount -= item.amount;
        }

        setCurrentAmount(totalAmount);
      })
    } else {
      setCurrentAmount(0)
    }
    
  }


  return <>
    <div id='header'>
      <h1>Current: ${currentAmount}</h1>
      <div className='topSection'>
        <input type="text" placeholder='Income or expence...' name='name' onChange={handleChange} value={input.name} />
        <input type="text" placeholder='Amount...' name='amount' onChange={handleChange} value={input.amount} />

        <CustomDropdown handleChange={handleChange} />

        <button onClick={handleAddCard}>+</button>
      </div>
    </div>

    {cards.map((card, index) => {
      return <Card deleteCard={deleteCard} key={index} name={card.name} amount={card.amount} type={card.type} id={index} />
    })}

  </>
}

export default App
