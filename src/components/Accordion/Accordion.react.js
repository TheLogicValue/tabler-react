import React, {  useState  } from 'react';
import "./Accordion.css";

export default function Accordion({children, accordionButton, collapseDefault = true}) {    
    const [collapse, setCollapse] = useState(collapseDefault);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button type="button" className={collapse ? "accordion-button" : "accordion-button collapseBtn"} onClick={() => setCollapse((collapse) ? false : true)}>{accordionButton}</button>
            </h2>
            <div className={collapse ? "accordion-collapse collapse" : "accordion-collapse collapse show" }>
                <div className="accordion-body">{children}</div>
            </div>
        </div>
    )
}