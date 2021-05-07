// @flow

import * as React from "react";
import cn from "classnames";
import FormLabel from "./FormLabel.react";
import FormInput from "./FormInput.react";
import GridRow from "../Grid/GridRow.react"
import type { Props as InputProps } from "./FormInput.react";

type Props = {|
  +children?: React.Node,
  +className?: string,
  +label?: React.Node,
  +isRequired?: boolean,
  +inputProps?: InputProps,
  +labelLeft?: boolean
|};

function FormGroup({
  className,
  children,
  label,
  isRequired,
  inputProps,
  labelLeft
}: Props): React.Node {
  const classes = cn("form-group", className);
  const inputComponent =
    inputProps && React.createElement(FormInput, inputProps);

    if (labelLeft){
      return (
        <GridRow className="mb-5">
          <div className="col-lg-3 col-md-3 col-sm-12 align-self-center">
          {!label ? null : typeof label === "string" ? (
            <FormLabel>
              {label}
              {isRequired && <span className="form-required">*</span>}
            </FormLabel>
          ) : (
            label
          )}
          </div>
          <div className="col-lg-9 col-md-9 col-sm-12">
            {inputComponent || children}
          </div>
          </GridRow>
      );
    }else{
      return (
        <div className={classes}>
    
          {!label ? null : typeof label === "string" ? (
            <FormLabel>
              {label}
              {isRequired && <span className="form-required">*</span>}
            </FormLabel>
          ) : (
            label
          )}
          {inputComponent || children}
        </div>
      );
    }
  
}

FormGroup.displayName = "Form.Group";

export default FormGroup;
