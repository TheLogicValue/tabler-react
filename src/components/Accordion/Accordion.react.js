import React, {  useState  } from 'react';
import "./Accordion.css";

export default function Accordion(props) {    
    const accordionBody = props.children;    
    const accordionButton = props.button;
    const [collapse, setCollapse] = useState(true);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button type="button" className={collapse ? "accordion-button" : "accordion-button collapseBtn"} onClick={() => setCollapse((collapse) ? false : true)}>{accordionButton}</button>
            </h2>
            <div className={collapse ? "accordion-collapse collapse" : "accordion-collapse collapse show" }>
                <div className="accordion-body">{accordionBody}</div>
            </div>
        </div>
    )
}