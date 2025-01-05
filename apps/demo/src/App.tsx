import { useState } from 'react';
import { greeting, add } from '@gspt/sdk';

function App() {
  const [name, setName] = useState('World');
  const [result] = useState(() => add(5, 3));

  return (
    <div className="App">
      <h1>{greeting({ name })}</h1>
      <p>5 + 3 = {result}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
    </div>
  );
}

export default App;
