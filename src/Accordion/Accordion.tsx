import React, { FunctionComponent, useState, useRef } from "react";

import './Accordion.css';

interface AccordionInterface {
  title: string;
};

const Accordion: FunctionComponent<AccordionInterface> = (props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const classNameString = `accordion ${isOpen ? 'open' : ''}`

  return (
    <div className={classNameString}>
      <h3 onClick={() => setIsOpen(!isOpen)}>{isOpen ? '🝧' : '🝔'} {props.title}</h3>
      {
        isOpen &&
        <div className="accordion-content">
          {props.children}
        </div>
      }
    </div>
  )
};

export default Accordion;
