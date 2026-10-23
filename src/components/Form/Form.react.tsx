import * as React from "react";
import FormGroup from "./FormGroup.react";
import FormLabel from "./FormLabel.react";
import FormInput from "./FormInput.react";
import FormStaticText from "./FormStaticText.react";
import FormTextarea from "./FormTextarea.react";
import FormImageCheck from "./FormImageCheck.react";
import FormImageCheckItem from "./FormImageCheckItem.react";
import FormColorCheck from "./FormColorCheck.react";
import FormColorCheckItem from "./FormColorCheckItem.react";
import FormInputGroup from "./FormInputGroup.react";
import FormHelp from "./FormHelp.react";
import FormSelect from "./FormSelect.react";
import FormSelectReact from "./FormSelectReact.react";
import FormFooter from "./FormFooter.react";
import FormRatio from "./FormRatio.react";
import FormFieldSet from "./FormFieldSet.react";
import FormRadio from "./FormRadio.react";
import FormCheckbox from "./FormCheckbox.react";
import FormSelectGroup from "./FormSelectGroup.react";
import FormSelectGroupItem from "./FormSelectGroupItem.react";
import FormSelectMultiple from "./FormSelectMultiple.react";
import FormFileInput from "./FormFileInput.react";
import FormSwitchStack from "./FormSwitchStack.react";
import FormSwitch from "./FormSwitch.react";
import FormInputGroupAppend from "./FormInputGroupAppend.react";
import FormInputGroupPrepend from "./FormInputGroupPrepend.react";
import FormInputGroupText from "./FormInputGroupText.react";
// import FormMaskedInput from "./FormMaskedInput.react";
import FormDatePicker from "./FormDatePicker.react";
export type FormProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly action?: string;
  readonly method?: string;
  readonly autoComplete?: "on" | "off";
  readonly onSubmit?: React.FormEventHandler<HTMLFormElement>;
};
export type Props = FormProps;
function Form({
  className,
  children,
  action,
  method,
  onSubmit,
  autoComplete = "off"
}: FormProps): React.ReactNode {
  return <form className={className} onSubmit={onSubmit} action={action} method={method} autoComplete={autoComplete}>
      {children}
    </form>;
}
Form.Group = FormGroup;
Form.Label = FormLabel;
Form.Input = FormInput;
Form.StaticText = FormStaticText;
Form.Textarea = FormTextarea;
Form.ImageCheck = FormImageCheck;
Form.ImageCheckItem = FormImageCheckItem;
Form.ColorCheck = FormColorCheck;
Form.ColorCheckItem = FormColorCheckItem;
Form.InputGroup = FormInputGroup;
Form.Help = FormHelp;
Form.Select = FormSelect;
Form.SelectReact = FormSelectReact;
Form.Footer = FormFooter;
Form.Ratio = FormRatio;
Form.FieldSet = FormFieldSet;
Form.SelectGroup = FormSelectGroup;
Form.SelectGroupItem = FormSelectGroupItem;
Form.SelectMultiple = FormSelectMultiple;
Form.Radio = FormRadio;
Form.Checkbox = FormCheckbox;
Form.FileInput = FormFileInput;
Form.SwitchStack = FormSwitchStack;
Form.Switch = FormSwitch;
Form.InputGroupAppend = FormInputGroupAppend;
Form.InputGroupPrepend = FormInputGroupPrepend;
Form.InputGroupText = FormInputGroupText;
// Form.MaskedInput = FormMaskedInput;
Form.DatePicker = FormDatePicker;
export default Form;
