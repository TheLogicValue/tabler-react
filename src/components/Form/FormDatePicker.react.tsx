import * as React from "react";
import FormSelect from "./FormSelect.react";
import FormInputGroup from "./FormInputGroup.react";
export type FormDatePickerProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly defaultDate: Date;
  readonly minYear: number;
  readonly maxYear: number;
  readonly format: string;
  readonly monthLabels: readonly string[];
  readonly onChange?: (date: Date) => void;
};
export type Props = FormDatePickerProps;
type State = {
  currentDate: Date;
};
type DateComponents = Record<string, React.ReactNode>;
type ChangeTypes = "mm" | "yyyy" | "dd";
class FormDatePicker extends React.PureComponent<FormDatePickerProps, State> {
  static displayName = "Form.DatePicker";
  static defaultProps = {
    monthLabels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    minYear: 1897,
    maxYear: new Date().getFullYear(),
    format: "mm/dd/yyyy",
    defaultDate: new Date()
  };
  state = {
    currentDate: this.props.defaultDate
  };

  // Handle date changes
  _handleOnChange = (type: ChangeTypes, value: number): void => {
    const {
      currentDate
    } = this.state;
    const {
      onChange
    } = this.props;
    const newDate: Date = new Date(currentDate);

    // Change month
    if (type === "mm") {
      newDate.setMonth(value);
    }

    // Change day
    if (type === "dd") {
      newDate.setDate(value);
    }
    if (type === "yyyy") {
      newDate.setFullYear(value);
    }
    this.setState({
      currentDate: newDate
    }, () => {
      onChange?.(this.state.currentDate);
    });
  };

  // Creates an array with numeric values from start to end
  _range = (start: number, end: number): Array<number> => Array.from({
    length: end + 1 - start
  }, (v, k) => k + start);

  // Renders the months select
  _renderMonths = (): React.ReactNode => {
    const {
      currentDate
    } = this.state;
    const {
      monthLabels
    } = this.props;
    const onChangeMonths = (e: React.ChangeEvent<HTMLSelectElement>): void => this._handleOnChange("mm", Number(e.target.value));
    return <FormSelect value={currentDate.getUTCMonth()} onChange={onChangeMonths}>
        {monthLabels.map((name, index) => <option key={index} value={index}>
            {name}
          </option>)}
      </FormSelect>;
  };

  // Renders the days select
  _renderDays = (): React.ReactNode => {
    const {
      currentDate
    } = this.state;
    const currentMonthDays = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 0).getDate();
    const daysRange = this._range(1, currentMonthDays);
    const currentDay = currentDate.getUTCDate();
    const onChangeDays = (e: React.ChangeEvent<HTMLSelectElement>) => this._handleOnChange("dd", Number(e.target.value));
    return <FormSelect value={currentDay} onChange={onChangeDays}>
        {daysRange.map(day => <option key={day} value={day}>
            {day}
          </option>)}
      </FormSelect>;
  };

  // renderes the years select
  _renderYears = (): React.ReactNode => {
    const {
      minYear,
      maxYear
    } = this.props;
    const {
      currentDate
    } = this.state;
    const yearsRange = this._range(minYear, maxYear).reverse();
    const currentYear = currentDate.getUTCFullYear();
    const onChangeYears = (e: React.ChangeEvent<HTMLSelectElement>) => this._handleOnChange("yyyy", Number(e.target.value));
    return <FormSelect value={currentYear} onChange={onChangeYears}>
        {yearsRange.map(year => <option key={year} value={year}>
            {year}
          </option>)}
      </FormSelect>;
  };
  render(): React.ReactNode {
    const {
      format,
      className
    } = this.props;
    const formatSplit = format.split("/");
    const dateComponents: DateComponents = {
      mm: this._renderMonths(),
      dd: this._renderDays(),
      yyyy: this._renderYears()
    };
    return <div className={className}>
        <FormInputGroup>
          {formatSplit.map((type: string): React.ReactNode => <React.Fragment key={type}>{dateComponents[type]}</React.Fragment>)}
        </FormInputGroup>
      </div>;
  }
}
export default FormDatePicker;
