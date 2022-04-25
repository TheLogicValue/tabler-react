import * as React from 'react';
import cn from "classnames";
import { Card, Text } from "../";

function DoubleCard({ className, title, firstValue, firstlabel, secondValue, secondlabel, classColorValue = null, children }) {
    const classes = cn(className);

    const getColorClass = (value) => {
        let color = null

        Object.entries(classColorValue).forEach(([key, item]) => {
            if (item(value)) color = key
        })

        return color
    }

    return (
        <Card className={classes}>
            <Text className="double-card-header">{title}</Text>
            <div className="double-card-body">
                <div className="double-card-colum">
                    <Text className="double-card-text"><b>{firstValue}</b></Text>
                    {classColorValue ? <Text>{firstlabel}</Text>
                        : <Text className="double-card-subtext">{firstlabel}</Text>
                    }
                    {classColorValue ?? <span className={`text-${getColorClass(firstValue)}`}></span>}
                </div>
                <div className="double-card-colum">
                    <Text className="double-card-text"><b>{secondValue}</b></Text>
                    {classColorValue ? <Text>{secondlabel}</Text>
                        : <Text className="double-card-subtext">{secondlabel}</Text>
                    }
                    {classColorValue ?? <span className={`text-${getColorClass(secondValue)}`}></span>}
                </div>
            </div>
            {children}
        </Card>
    );
}

export default DoubleCard;