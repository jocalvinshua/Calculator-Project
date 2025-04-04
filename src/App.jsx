import React, { useState } from 'react';
import { History, Delete, Plus, Minus, X, Divide, Equal } from 'lucide-react';
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState('0');
  const [currentCalculation, setCurrentCalculation] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleNumberClick = (number) => {
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperatorClick = (operator) => {
    setCurrentCalculation(display + ' ' + operator + ' ');
    setDisplay('0');
  };

  const handleEqual = () => {
    const fullCalculation = currentCalculation + display;
    try {
      // eslint-disable-next-line no-eval
      const result = eval(fullCalculation.replace('×', '*').replace('÷', '/'));
      const newHistoryItem = {
        calculation: fullCalculation,
        result: result.toString(),
        timestamp: new Date(),
      };
      setHistory([newHistoryItem, ...history]);
      setDisplay(result.toString());
      setCurrentCalculation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentCalculation('');
  };

  const handleHistoryItemClick = (item) => {
    setDisplay(item.result);
    setCurrentCalculation('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="relative">
          <div className="bg-gray-100 p-4">
            <div className="text-right text-gray-600 text-sm h-6">
              {currentCalculation}
            </div>
            <div className="text-right text-4xl font-semibold text-gray-800 h-12 overflow-hidden">
              {display}
            </div>
          </div>
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <History size={20} />
          </button>
        </div>

        {showHistory && (
          <div className="bg-gray-50 border-b border-gray-200 max-h-48 overflow-y-auto">
            {history.map((item, index) => (
              <button
                key={index}
                onClick={() => handleHistoryItemClick(item)}
                className="w-full text-left p-3 hover:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="text-sm text-gray-600">{item.calculation} =</div>
                <div className="text-lg font-medium text-gray-800">{item.result}</div>
                <div className="text-xs text-gray-500">
                  {item.timestamp.toLocaleTimeString()}
                </div>
              </button>
            ))}
            {history.length === 0 && (
              <div className="p-4 text-center text-gray-500">No history yet</div>
            )}
          </div>
        )}

        <div className="grid grid-cols-4 gap-1 p-2 bg-gray-50">
          <button
            onClick={handleClear}
            className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
          >
            <Delete size={24} />
          </button>
          {['7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="bg-white text-gray-800 p-4 rounded-lg hover:bg-gray-100 transition-colors text-xl font-medium"
            >
              {num}
            </button>
          ))}
          {['4', '5', '6'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="bg-white text-gray-800 p-4 rounded-lg hover:bg-gray-100 transition-colors text-xl font-medium"
            >
              {num}
            </button>
          ))}
          {['1', '2', '3'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="bg-white text-gray-800 p-4 rounded-lg hover:bg-gray-100 transition-colors text-xl font-medium"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumberClick('0')}
            className="bg-white text-gray-800 p-4 rounded-lg hover:bg-gray-100 transition-colors text-xl font-medium col-span-2"
          >
            0
          </button>
          <button
            onClick={() => handleNumberClick('.')}
            className="bg-white text-gray-800 p-4 rounded-lg hover:bg-gray-100 transition-colors text-xl font-medium"
          >
            .
          </button>
          <button
            onClick={() => handleOperatorClick('÷')}
            className="bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            <Divide size={24} />
          </button>
          <button
            onClick={() => handleOperatorClick('×')}
            className="bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            <X size={24} />
          </button>
          <button
            onClick={() => handleOperatorClick('-')}
            className="bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            <Minus size={24} />
          </button>
          <button
            onClick={() => handleOperatorClick('+')}
            className="bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            <Plus size={24} />
          </button>
          <button
            onClick={handleEqual}
            className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <Equal size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}