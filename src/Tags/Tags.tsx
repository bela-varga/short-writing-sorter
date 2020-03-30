import React, { useState } from 'react';

import './Tags.css';

interface TagsInterface {
  allTags: string[];
  usedTags: string[];
  unusedTags: string[];
}

const Tags: React.FunctionComponent<TagsInterface> = (props) => {
  const [showAll, setShowAll] = useState(false);
  const { allTags, usedTags, unusedTags } = props;

  return (
    <div>
      <h4>
        Tags
        <button onClick={() => setShowAll(!showAll)}>Toggle</button>
      </h4>
      {
        showAll &&
        <div className="flex">
          <div className="all-tags">
            <h5>All tags</h5>
            <ul>
              {!!allTags?.length && allTags.map((tag, index) => <li key={index}>{tag}</li>)}
            </ul>
          </div>
          <div className="used-tags">
            <h5>Used tags</h5>
            <ul>
              {!!usedTags?.length && usedTags.map((tag, index) => <li key={index}>{tag}</li>)}
            </ul>
          </div>
          <div className="unused-tags">
            <h5>Not used tags</h5>
            <ul>
              {!!unusedTags?.length && unusedTags.map((tag, index) => <li key={index}>{tag}</li>)}
            </ul>
          </div>
        </div>
      }
    </div>
  )
}

export default Tags;
