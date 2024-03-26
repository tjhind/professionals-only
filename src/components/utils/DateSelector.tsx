import { today } from "../../utils/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type dateProps = {
  onChange: (
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined,
  ) => void;
  onCalendarClose: () => void;
  selected: Date | null | undefined;
};

export default function DateSelector(props: dateProps) {
  return (
    <DatePicker
      name="date"
      className="date-picker ml-13 md:ml-20 font-heavy md:text-md"
      selected={props.selected}
      placeholderText="birthday* (dd/mm/yyy)"
      onChange={props.onChange}
      dateFormat={"dd/MM/yyyy"}
      maxDate={
        new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      }
      scrollableYearDropdown
      showYearDropdown
      showMonthDropdown
      isClearable
      yearDropdownItemNumber={80}
      onCalendarClose={props.onCalendarClose}
    />
  );
}
