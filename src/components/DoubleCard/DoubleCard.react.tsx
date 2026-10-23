import * as React from 'react';
import cn from "classnames";
import Card from "../Card";
import Text from "../Text";

export type DoubleCardProps = {
    readonly className?: string;
    readonly title?: React.ReactNode;
    readonly firstValue?: React.ReactNode;
    readonly firstlabel?: React.ReactNode;
    readonly secondValue?: React.ReactNode;
    readonly secondlabel?: React.ReactNode;
    readonly classColorValue?: string | null;
    readonly children?: React.ReactNode;
};

function DoubleCard({ className, title, firstValue, firstlabel, secondValue, secondlabel, classColorValue = null, children }: DoubleCardProps): React.ReactElement {
    const classes = cn(className);

    return (
        <Card className={classes}>
            <Text className="double-card-header">{title}</Text>
            <div className="double-card-body">
                <div className="double-card-colum">
                    <Text className={`double-card-text ${classColorValue && "text-" + classColorValue}`}><b>{firstValue}</b></Text>
                    <Text className="double-card-subtext">{firstlabel}</Text>
                </div>
                <div className="double-card-colum">
                    <Text className="double-card-text"><b>{secondValue}</b></Text>
                    <Text className="double-card-subtext">{secondlabel}</Text>
                </div>
            </div>
            {children}
        </Card>
    );
}

export default DoubleCard;
