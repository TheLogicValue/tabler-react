import * as React from 'react';
import cn from "classnames";
import {Card} from "../";

function DoubleCard ({className, title, value1, textValue1, value2, textValue2}) {   
        const classes = cn(className);
        return (
            <Card className={classes}>
                <div style={{ paddingTop: "10px", marginLeft: "15px" }}>{title}</div>
                <div d="flex" style={{ display: "flex", paddingTop: "15px", paddingBottom: "15px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignContent: "flex-start", width: "50%" }}>
                        <span style={{ margin: "auto", fontSize: "25px" }}><strong>{value1}</strong></span>
                        <span style={{ margin: "auto", fontSize: "10px" }}>{textValue1}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignContent: "flex-end", width: "50%" }}>
                        <span style={{ margin: "auto", fontSize: "25px" }}><strong>{value2}</strong></span>
                        <span style={{ margin: "auto", fontSize: "10px" }}>{textValue2}</span>
                    </div>
                </div>        
            </Card>
        );    
}

export default DoubleCard;

