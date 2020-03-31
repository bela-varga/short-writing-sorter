import React, { useState, useRef, useEffect } from 'react';
import Tags from './Tags/Tags';

import ShortWritingManager from './ShortWritingManager/ShortWritingManager';
/**
 * hatszavasok.json is the file containing my own six-word-stories.
 * I do not want to publicly upload them to github, so that file is in gitignore.
 * I use that file regularly at home but I would not like to make error in the repo with this.
 * So I left this row in comment, this way I can switch easily.
 * TODO: do this with .env file(s)
 */
// import testJson from './data/hatszavasok.json';
import testJson from './data/0002.json';

import Accordion from './Accordion/Accordion';
import { ShortText } from './ShortWritingManager/interfaces';

function App() {
  const [tags, setTags] = useState<string[]>([]);
  const [usedTags, setUsedTags] = useState<string[]>([]);
  const [unusedTags, setUnusedTags] = useState<string[]>([]);
  const swm = useRef(new ShortWritingManager())
  const [lastChangeTime, setlastChangeTime] = useState(Date.now());

  useEffect(() => {
    swm.current.readDataFromJSON(testJson);
    setlastChangeTime(Date.now());
  }, []);

  useEffect(() => {
    setTags(swm.current.getAllTags());
    setUsedTags(swm.current.getAllUsedTags());
    setUnusedTags(swm.current.getUnusedTags());
  }, [lastChangeTime]);

  function copyJsonToClipboard() {
    const shortTextJsonInput = document.getElementById('short-texts-json') as HTMLTextAreaElement;
    shortTextJsonInput.disabled = false;
    shortTextJsonInput.focus();
    shortTextJsonInput.select();
    document.execCommand('copy');
    shortTextJsonInput.disabled = true;
  }

  function renderBoxToShowJsonExport() {
    return (
      <div>
        <textarea
          disabled
          rows={8}
          cols={50}
          id='short-texts-json'
          value={swm.current.getJsonFromCurrentData()}
        ></textarea>
        <br />
        <button onClick={copyJsonToClipboard}>Select this JSON and copy it to clipboard</button>
      </div>
    )
  }

  function renderButtonToBumpVersion() {
    return (
      <button onClick={swm.current.bumpVersion.bind(swm.current)}>Bump version</button>
    )
  }

  function addNewText() {
    const newTextInput = document.getElementById('new-text') as HTMLInputElement;
    const newText = newTextInput.value.trim();
    if (newText) {
      const newTextCategoryInput = document.getElementById('new-text--category') as HTMLInputElement;
      const newTextTagsInput = document.getElementById('new-text--tags') as HTMLInputElement;
      const newCategory = newTextCategoryInput.value.trim();
      let newTextTags: string[] = [];
      const newTextTagsTrimmedValue = newTextTagsInput.value.trim();
      if (newTextTagsTrimmedValue) {
        newTextTags = newTextTagsTrimmedValue.split(',').map(value => value.trim());
      }
      const newShortText: ShortText = {
        text: newText,
        tags: newTextTags,
        category: newCategory,
      };
      swm.current.addText(newShortText);
      newTextInput.value = '';
      newTextCategoryInput.value = '';
      newTextTagsInput.value = '';
      setlastChangeTime(Date.now());
    }
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

  function addMultipleNewTexts() {
    const multipleNewTextsInput = document.getElementById('multiple-new-texts') as HTMLTextAreaElement;
    const allNewTexts = multipleNewTextsInput.value.split('\n');
    allNewTexts.forEach(newTextString => {
      newTextString = newTextString.trim();
      if (newTextString) {
        const newShortText: ShortText = {
          text: newTextString,
          tags: [],
          category: '',
        }
        swm.current.addText(newShortText);
        setlastChangeTime(Date.now());
      }
    });
  }

  function renderBoxToAddMultipleTexts() {
    return (
      <div>
        <textarea rows={8} cols={50} id='multiple-new-texts' placeholder='Each row will be a new short text'></textarea>
        <br />
        <button onClick={addMultipleNewTexts}>Add all texts</button>
      </div>
    );
  }

  function importDataFromTextarea() {
    const textareaInput = document.getElementById('import-from-string') as HTMLTextAreaElement;
    const textareaInputTrimmedValue = textareaInput.value.trim();
    if (textareaInputTrimmedValue) {
      try {
        const newJson = JSON.parse(textareaInput.value);
        swm.current.readDataFromJSON(newJson);
      } catch (error) {
        console.error(error);
      }
      setlastChangeTime(Date.now());
    }
  }

  function renderBoxToImportFromTextarea() {
    return (
      <div>
        <textarea rows={8} cols={50} id='import-from-string'></textarea>
        <br />
        <button onClick={importDataFromTextarea}>Import data from textarea</button>
      </div>
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
      <h1>Short Writing Manager</h1>

      <Accordion title='Add short text'>
        {renderBoxToAddText()}
      </Accordion>

      <Accordion title='Add multiple short texts'>
        {renderBoxToAddMultipleTexts()}
      </Accordion>

      <Accordion title='Tags'>
        <Tags
          allTags={tags}
          usedTags={usedTags}
          unusedTags={unusedTags}
        ></Tags>
      </Accordion>

      <Accordion title='Random things'>
        {renderButtonToBumpVersion()}
        {renderButtonToShowDuplicateTexts()}
      </Accordion>

      <Accordion title='Import / Export'>
        {renderBoxToImportFromTextarea()}
        <hr/>
        {renderBoxToShowJsonExport()}
      </Accordion>

      <Accordion title='Show all current texts'>
        <pre>
          {swm.current && swm.current.getShortTextListAsPlainText()}
        </pre>
      </Accordion>
    </div>
  );
}

export default App;
