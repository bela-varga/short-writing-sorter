import React from 'react';

import './Tags.css';

interface TagsInterface {
  allTags: string[];
  usedTags: string[];
  unusedTags: string[];
}

const Tags: React.FunctionComponent<TagsInterface> = (props) => {
  const { allTags, usedTags, unusedTags } = props;

  return (
    <div className="tags">
        <div className="flex">
          <div className="all-tags">
            <h4>All tags</h4>
            <ul className="tag-list">
              {!!allTags?.length && allTags.map((tag, index) => <li className="tag" key={index}>{tag}</li>)}
            </ul>
          </div>
          <div className="used-tags">
            <h4>Used tags</h4>
            <ul className="tag-list">
              {!!usedTags?.length && usedTags.map((tag, index) => <li className="tag" key={index}>{tag}</li>)}
            </ul>
          </div>
          <div className="unused-tags">
            <h4>Not used tags</h4>
            <ul className="tag-list">
              {!!unusedTags?.length && unusedTags.map((tag, index) => <li className="tag" key={index}>{tag}</li>)}
            </ul>
          </div>
        </div>
    </div>
  )
}

export default Tags;
