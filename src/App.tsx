import React from 'react';
import ShortWritingManager from './ShortWritingManager/ShortWritingManager';
import testJson from './data/0001.json';

function App() {
  const swm = new ShortWritingManager();
  swm.readDataFromJSON(testJson);

  function showFullJson() {
    const elementToPutJson = document.getElementById('short-texts-json');
    if (elementToPutJson) {
      elementToPutJson.innerHTML = swm.getJsonFromCurrentData();
    }
  }

  function renderButtonToShowFullJson() {
    return (
      <button onClick={showFullJson}>Show full JSON</button>
    )
  }

  function showCurrentTextList() {
    const elementToPutTexts = document.getElementById('short-texts-pre');
    if (elementToPutTexts) {
      elementToPutTexts.innerHTML = swm.getShortTextListAsPlainText()
    }
  }

  function renderButtonToShowCurrentTextList() {
    return (
      <button onClick={showCurrentTextList}>Show current text list</button>
    )
  }

  return (
    <div>
      <h1>Testing stuff</h1>
      <p>
        {renderButtonToShowCurrentTextList()}
        {renderButtonToShowFullJson()}
      </p>
      <pre id='short-texts-pre'></pre>
      <pre id='short-texts-json'></pre>
    </div>
  );
}

export default App;
