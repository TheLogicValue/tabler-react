import * as React from 'react';
import cn from "classnames";
import { Card, Text } from "../";

function DoubleCard({ className, title, value1, textValue1, value2, textValue2, children }) {
    const classes = cn(className);
    return (
        <Card className={classes}>
            <Text className="mb-2 mt-4 ml-4" style={{fontSize:"1.2rem"}}>{title}</Text>
            <div d="flex" className="text-center" style={{ display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column", alignContent: "flex-start", width: "50%" }}>
                    <Text className="m-0" style={{fontSize:"1.5rem"}}><b>{value1}</b></Text>
                    <Text className="mb-4">{textValue1}</Text>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignContent: "flex-end", width: "50%" }}>
                    <Text className="m-0" style={{fontSize:"1.5rem"}}><b>{value2}</b></Text>
                    <Text className="mb-4">{textValue2}</Text>
                </div>
            </div>
            {children}
        </Card>
    );
}

export default DoubleCard;

