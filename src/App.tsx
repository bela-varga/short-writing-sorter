import React, { useState, useRef, useEffect } from 'react';
import Tags from './Tags/Tags';

import ShortWritingManager from './ShortWritingManager/ShortWritingManager';
import testJson from './data/0002.json';

function App() {
  const [allCurrentTextsVisible, setallCurrentTextsVisible] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [usedTags, setUsedTags] = useState<string[]>([]);
  const [unusedTags, setUnusedTags] = useState<string[]>([]);
  const [fullJsonVisible, setFullJsonVisible] = useState(false);
  const swm = useRef(new ShortWritingManager())

  useEffect(() => {
    swm.current.readDataFromJSON(testJson);
  }, []);

  useEffect(()=>{
    setTags(swm.current.getAllTags());
    setUsedTags(swm.current.getAllUsedTags());
    setUnusedTags(swm.current.getUnusedTags());
  }, [swm.current]);

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
    const newTextCategoryInput = document.getElementById('new-text--category') as HTMLInputElement;
    const newTextTagsInput = document.getElementById('new-text--tags') as HTMLInputElement;
    const newText = newTextInput.value;
    const newCategory = newTextCategoryInput.value;
    const newTextTags: string[] = newTextTagsInput.value.split(',').map(value => value.trim());
    const newShortText = {
      text: newText,
      tags: newTextTags,
      category: newCategory,
    };
    swm.current.addText(newShortText);
    newTextInput.value = '';
    newTextCategoryInput.value = '';
    newTextTagsInput.value = '';
  }

  function renderBoxToAddText() {
    return (
      <div id='add-text'>
        <input type='text' id='new-text' placeholder='Short text'></input>
        <input type='text' id='new-text--category' placeholder='Category'></input>
        <input type='text' id='new-text--tags' placeholder='Tags (comma separated)'></input>
        <button onClick={addNewText}>Add text</button>
      </div>
    )
  }

  function importDataFromTextarea() {
    const textareaInput = document.getElementById('import-from-string') as HTMLTextAreaElement;
    try {
      const newJson = JSON.parse(textareaInput.value);
      swm.current.readDataFromJSON(newJson);
    } catch (error) {
      console.error(error);
    }
  }

  function renderButtonToImportFromTextarea() {
    return (
      <button onClick={importDataFromTextarea}>Import data from textarea</button>
    );
  }

  function showDuplicateTexts() {
    swm.current.showDuplicateTexts();
  }

  function renderButtonToShowDuplicateTexts() {
    return (
      <button onClick={showDuplicateTexts}>Show duplicate texts</button>
    )
  }

  return (
    <div>
      <h1>Testing stuff</h1>
      <Tags
        allTags={tags}
        usedTags={usedTags}
        unusedTags={unusedTags}
      ></Tags>
      <div>
        {renderBoxToAddText()}
        {renderButtonToToggleCurrentTextList()}
        {renderButtonToToggleFullJson()}
        {renderButtonToBumpVersion()}
        {renderButtonToImportFromTextarea()}
        {renderButtonToShowDuplicateTexts()}
      </div>
      <pre id='short-texts-pre'></pre>
      <textarea disabled id='short-texts-json'></textarea>
      <textarea id='import-from-string'></textarea>
    </div>
  );
}

export default App;
