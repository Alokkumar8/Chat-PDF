import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Define a functional component
const App: React.FC = () => {
  // State variables
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [showText, setShowText] = useState<boolean>(false);

  // useEffect hook for side effects
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  // Event handler functions
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleToggleText = () => {
    setShowText(prevShowText => !prevShowText);
  };

  return (
    <div>
      <h1>React App</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <br />
      <input type="text" value={text} onChange={handleInputChange} />
      <p>Entered Text: {text}</p>
      <button onClick={handleToggleText}>{showText ? 'Hide Text' : 'Show Text'}</button>
      {showText && <p>This is some extra text.</p>}
      <DemoList />
      <DemoTable />
    </div>
  );
};

// Another functional component for demonstrating lists
const DemoList: React.FC = () => {
  const items: string[] = ['Chat PDF', 'ChatPDF', 'Chat-PDF'];

  return (
    <div>
      <h2>List Demo</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Another functional component for demonstrating tables
const DemoTable: React.FC = () => {
  const data: { name: string; age: number }[] = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 28 },
  ];

  return (
    <div>
      <h2>Table Demo</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Render the App component
ReactDOM.render(<App />, document.getElementById('root'));
