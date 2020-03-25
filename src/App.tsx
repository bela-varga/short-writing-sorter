import React, { useState, useRef, useEffect } from 'react';
import ShortWritingManager from './ShortWritingManager/ShortWritingManager';
import testJson from './data/0001.json';

function App() {
  const [allCurrentTextsVisible, setallCurrentTextsVisible] = useState(false);
  const [fullJsonVisible, setFullJsonVisible] = useState(false);
  const swm = useRef(new ShortWritingManager())

  useEffect(()=>{
    swm.current.readDataFromJSON(testJson);
  }, []);

  function toggleFullJson() {
    const elementToPutJson = document.getElementById('short-texts-json');
    if (elementToPutJson) {
      if (fullJsonVisible) {
        elementToPutJson.innerHTML = '';
      } else {
        elementToPutJson.innerHTML = swm.current.getJsonFromCurrentData();
      }
    }
    setFullJsonVisible(!fullJsonVisible);
  }

  function renderButtonToToggleFullJson() {
    return (
      <button onClick={toggleFullJson}>Toggle full JSON</button>
    )
  }

  function toggleCurrentTextList() {
    const elementToPutTexts = document.getElementById('short-texts-pre');
    if (elementToPutTexts) {
      if (allCurrentTextsVisible) {
        elementToPutTexts.innerHTML = '';
      } else {
        elementToPutTexts.innerHTML = swm.current.getShortTextListAsPlainText();
      }
    }
    setallCurrentTextsVisible(!allCurrentTextsVisible);
  }

  function renderButtonToToggleCurrentTextList() {
    return (
      <button onClick={toggleCurrentTextList}>Toggle current text list</button>
    )
  }

  function renderButtonToBumpVersion() {
    return (
      <button onClick={swm.current.bumpVersion.bind(swm.current)}>Bump version</button>
    )
  }

  function addNewText() {
    const newTextInput = document.getElementById('new-text') as HTMLInputElement;
    const newText = newTextInput.value;
    const newShortText = {
      text: newText,
      tags: [],
      category: '',
    };
    swm.current.addText(newShortText);
    newTextInput.value = '';
  }

  function renderBoxToAddText() {
    return (
      <div id='add-text'>
        <input type='text' id='new-text'></input>
        <button onClick={addNewText}>Add text</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Testing stuff</h1>
      <div>
        {renderBoxToAddText()}
        {renderButtonToToggleCurrentTextList()}
        {renderButtonToToggleFullJson()}
        {renderButtonToBumpVersion()}
      </div>
      <pre id='short-texts-pre'></pre>
      <pre id='short-texts-json'></pre>
    </div>
  );
}

export default App;
