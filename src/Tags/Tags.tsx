import React, { useState } from 'react';

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
        <div>
          <h5>All tags</h5>
          <ul>
            {!!allTags?.length && allTags.map(tag => <li>{tag}</li>)}
          </ul>
          <h5>Used tags</h5>
          <ul>
            {!!usedTags?.length && usedTags.map(tag => <li>{tag}</li>)}
          </ul>
          <h5>Not used tags</h5>
          <ul>
            {!!unusedTags?.length && unusedTags.map(tag => <li>{tag}</li>)}
          </ul>
        </div>
      }
    </div>
  )
}

export default Tags;
