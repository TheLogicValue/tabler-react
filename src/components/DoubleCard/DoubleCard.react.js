import * as React from 'react';
import cn from "classnames";
import { Card, Text } from "../";

function DoubleCard({ className, title, firstValue, firstlabel, secondValue, secondlabel, classColorValue = null, children }) {
    const classes = cn(className);

    const getColorClass = React.useCallback((value) => {
        let color = null

        Object.entries(classColorValue).forEach(([key, item]) => {
            if (item(value)) color = key
        })

        return color
    }, [])

    return (
        <Card className={classes}>
            <Text className="double-card-header">{title}</Text>
            <div className="double-card-body">
                <div className="double-card-colum">
                    {
                        classColorValue ? <Text color={getColorClass(firstValue)} className="double-card-text"><b>{firstValue}</b></Text>
                            : <Text className="double-card-text"><b>{firstValue}</b></Text>
                    }
                    <Text className="double-card-subtext">{firstlabel}</Text>
                </div>
                <div className="double-card-colum">
                    {
                        classColorValue ? <Text color={getColorClass(secondValue)} className="double-card-text"><b>{secondValue}</b></Text>
                            : <Text className="double-card-text"><b>{secondValue}</b></Text>
                    }
                    <Text className="double-card-subtext">{secondlabel}</Text>
                </div>
            </div>
            {children}
        </Card>
    );
}

export default DoubleCard;