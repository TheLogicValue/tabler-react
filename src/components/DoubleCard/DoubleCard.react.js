import * as React from 'react';
import cn from "classnames";
import { Card, Text } from "../";

function DoubleCard({ className, title, firstValue, firstlabel, secondValue, secondlabel, classColorValue = null, children }) {
    const classes = cn(className);

    return (
        <Card className={classes}>
            <Text className="double-card-header">{title}</Text>
            <div className="double-card-body">
                <div className="double-card-colum">
                    <Text className="double-card-text"><b>{firstValue}</b></Text>
                    {classColorValue ? <Text>{firstlabel}</Text>
                        : <Text className="double-card-subtext">{firstlabel}</Text>
                    }
                    {classColorValue ? <span className={`text-${classColorValue}`}></span> : null}
                </div>
                <div className="double-card-colum">
                    <Text className="double-card-text"><b>{secondValue}</b></Text>
                    {classColorValue ? <Text>{secondlabel}</Text>
                        : <Text className="double-card-subtext">{secondlabel}</Text>
                    }
                    {classColorValue ?<span className={`text-${classColorValue}`}></span>  : null}
                </div>
            </div>
            {children}
        </Card>
    );
}

export default DoubleCard;