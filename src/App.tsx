import { useState, useEffect } from "react";
import Card from "./components/card";
import CustomDropdown from "./components/customDropdown";
import React from "react";

interface InputStateInter {
    name: string;
    amount: number;
    type: string;
}

interface CardInter {
    name: string;
    amount: number;
    type: string;
}

function App() {
    const [input, setInput] = useState<InputStateInter>({
        name: "",
        amount: 0,
        type: "",
    });

    const [cards, setCards] = useState<CardInter[]>([]);
    const [currentAmount, setCurrentAmount] = useState<number>(0);

    useEffect(() => {
        showTotal();
    }, [cards]);

    function handleChange(e) {
        const { name, value } = e.target;

        const parsedValue = name === "amount" ? parseInt(value, 10) || "" : value;

        setInput((prevValue) => ({
            ...prevValue,
            [name]: parsedValue,
        }));
    }

    function handleAddCard() {
        if (input.type !== "" && input.name !== "" && input.amount !== undefined) {
            setCards((prevValues) => {
                return [...prevValues, input];
            });
        }
        console.log(cards);
    }

    function deleteCard(id: number) {
        setCards((prevValues) => {
            return prevValues.filter((card, index) => {
                return index !== id;
            });
        });
    }

    function showTotal() {
        if (cards.length != 0) {
            let totalAmount = 0;

            cards.forEach((item) => {
                if (item.amount != undefined) {
                    if (item.type === "income") {
                        totalAmount += item.amount;
                    } else {
                        totalAmount -= item.amount;
                    }
                }
                setCurrentAmount(totalAmount);
            });
        } else {
            setCurrentAmount(0);
        }
    }

    return (
        <>
            <div id="header">
                <h1>Current: ${currentAmount}</h1>
                <div className="topSection">
                    <input
                        type="text"
                        placeholder="Income or expence..."
                        name="name"
                        onChange={handleChange}
                        value={input.name}
                    />
                    <input
                        type="text"
                        placeholder="Amount..."
                        name="amount"
                        onChange={handleChange}
                        value={input.amount ? input.amount : ""}
                    />

                    <CustomDropdown handleChange={handleChange} />

                    <button onClick={handleAddCard}>+</button>
                </div>
            </div>

            {cards.map((card, index) => {
                return (
                    <Card
                        deleteCard={deleteCard}
                        key={index}
                        name={card.name}
                        amount={card.amount}
                        type={card.type}
                        id={index}
                    />
                );
            })}
        </>
    );
}

export default App;
