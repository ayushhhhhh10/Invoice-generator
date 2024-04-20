import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([{ id: 0, quantity: 0, rate: 0, amount: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addNewLine = () => {
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
    setData([...data, { id: newId, quantity: 0, rate: 0, amount: 0 }]);
  };

  const closeLine = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  useEffect(() => {
    let total = 0;
    data.forEach(item => {
      total += item.amount;
    });
    setTotalAmount(total);
  }, [data]);

  const updateQuantity = (id, value) => {
    setData(data.map(item => item.id === id ? { ...item, quantity: value, amount: value * item.rate } : item));
  };

  const updateRate = (id, value) => {
    setData(data.map(item => item.id === id ? { ...item, rate: value, amount: value * item.quantity } : item));
  };

  return (
    <div className="sm:w-[70vw] w-full h-screen mx-auto shadow-2xl flex items-center justify-center">
      <div className="h-[90%] w-[90%] rounded-md overflow-auto">
        <div className="h-[10vh] w-full bg-blue-700 flex justify-between items-center px-3 sm:px-6 font-semibold text-white text-sm sm:text-md">
          <div>
            <h1>Item</h1>
          </div>
          <div className="flex gap-5 sm:gap-20 sm:mr-64">
            <h1>Quantity</h1>
            <h1>Rate</h1>
            <h1>Amount</h1>
          </div>
        </div>
        {data.map((item, index) => (
          <div
            key={item.id}
            className="h-[15vh] w-full bg-zinc-100 flex p-5 gap-1 mb-5 relative"
          >
            <input
              className="border-zinc-400 bg-zinc-100 border-b-2 h-8 w-36 sm:w-[370px] text-sm px-1"
              type="text"
              placeholder="Item Name"
            />
            <input
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="border-zinc-400 bg-zinc-100 border-b-2 h-8 w-12 sm:w-[100px] sm:mr-4 text-sm px-1"
              type="number"
              placeholder="Qua"
            />
            <input
              onChange={(e) => updateRate(item.id, parseInt(e.target.value))}
              className="border-zinc-400 bg-zinc-100 border-b-2 h-8 w-12 sm:w-[100px] text-sm px-1 sm:mr-4"
              type="number"
              placeholder="₹"
            />
            <input
              className="border-zinc-400 bg-zinc-100 border-b-2 h-8 w-12 sm:w-[100px] text-sm px-1"
              type="number"
              placeholder="₹"
              value={item.amount}
            />
            <button
              className="absolute bottom-2 h-1/3 px-3 py-1 text-sm text-white bg-blue-600 rounded-md"
              onClick={() => closeLine(item.id)}
            >
              Close
            </button>
          </div>
        ))}
        <button
          className="w-full py-2 bg-blue-600 text-white mt-5 rounded-md"
          onClick={addNewLine}
        >
          Add New Line
        </button>
        <div className="w-1/2 sm:w-1/3 h-16 border-y-2 mt-10 flex items-center justify-between px-1 font-semibold sm:text-lg">
          <h1>Total (INR)</h1>
          <h1>₹{totalAmount}</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
