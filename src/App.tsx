import React from 'react';
import ShortWritingManager from './ShortWritingManager/ShortWritingManager';
import testJson from './data/0001.json';

function App() {

  const swm = new ShortWritingManager();
  swm.readDataFromJSON(testJson);

  return (
    <div>
      <h1>Testing stuff</h1>
      <pre>
        {swm.getShortTextListAsPlainText()}
      </pre>
    </div>
  );
}

export default App;
