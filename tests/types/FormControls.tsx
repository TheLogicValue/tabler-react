import * as React from "react";
import Form, { type FormInputProps, type FormSelectReactProps, type FormSelectMultipleProps } from "../../src/components/Form";
import DatePicker, { type DatePickerHandle, type DatePickerProps } from "../../src/components/DatePicker";
import { Modal, ModalDoc, ModalSplash, useModal } from "../../src/components/Modal";
import { Tabs, Tab, TabbedHeader, TabbedContainer, useTabs, type TabsHandle } from "../../src/components/Tabs";
import FormCard from "../../src/forms/FormCard.react";
import FormTextInput from "../../src/forms/FormTextInput.react";
import FormCheckboxInput from "../../src/forms/FormCheckboxInput.react";
import { Error, Success } from "../../src/components/IconAnimate";
import type { SelectInstance } from "react-select";

const input: FormInputProps = {
  type: "number", value: 3, maxLength: 12, max: 100, min: "0", step: "0.1",
  onChange: event => event.currentTarget.valueAsNumber,
  onBlur: event => event.currentTarget.select(),
  onKeyDown: event => event.currentTarget.checkValidity(),
  onPaste: event => event.clipboardData.getData("text"),
};
<Form method="post" onSubmit={event => event.currentTarget.checkValidity()}>
  <Form.Group label="Importe" inputProps={input} labelLeft isRequired />
  <Form.Input {...input} />
  <Form.Label aside="Opcional" onClick={event => event.currentTarget.htmlFor}>Nombre</Form.Label>
  <Form.StaticText onFocus={event => event.currentTarget.focus()}>Resumen</Form.StaticText>
  <Form.Textarea maxlength={50} rows={4} onChange={event => event.currentTarget.rows} />
  <Form.Select multiple value={["a", "b"]} onChange={event => event.currentTarget.selectedOptions}>
    <option value="a">A</option><option value="b">B</option>
  </Form.Select>
  <Form.Checkbox checked label="Activo" onChange={event => event.currentTarget.checked} />
  <Form.Radio value="a" label="A" onClick={event => event.currentTarget.checked} />
  <Form.Switch ref={React.createRef<HTMLInputElement>()} checked label="Activo" onChange={event => event.currentTarget.checked} />
  <Form.SwitchStack>Interruptores</Form.SwitchStack>
  <Form.FieldSet><Form.Help message="Ayuda">?</Form.Help></Form.FieldSet>
  <Form.FileInput accept=".csv" onChange={event => event.currentTarget.files?.[0]?.name} />
  <Form.ColorCheck><Form.ColorCheckItem color="blue" onClick={event => event.currentTarget.checked} /></Form.ColorCheck>
  <Form.ImageCheck><Form.ImageCheckItem imageURL="/cover.svg" value={1} col={{ lg: 3 }} /></Form.ImageCheck>
  <Form.InputGroup RootComponent="section" inputProps={input} prepend="€" append={<Form.InputGroupText>EUR</Form.InputGroupText>} />
  <Form.InputGroupPrepend>Antes</Form.InputGroupPrepend>
  <Form.InputGroupAppend>Después</Form.InputGroupAppend>
  <Form.SelectGroup canSelectMultiple>{[
    <Form.SelectGroupItem key="a" name="letters" value="a" label="A" />,
    <Form.SelectGroupItem key="b" name="letters" value="b" label="B" />,
  ]}</Form.SelectGroup>
  <Form.Ratio defaultValue={3} max={10} />
  <Form.Ratio value={3} onChange={event => event.currentTarget.valueAsNumber} />
  <Form.DatePicker defaultDate={new Date()} format="dd/mm/yyyy" onChange={date => date.getTime()} />
  <Form.Footer>Acciones</Form.Footer>
</Form>;

type Country = { value: string; label: string; id: number };
const options: readonly Country[] = [{ value: "es", label: "España", id: 34 }];
const select: FormSelectReactProps<Country> = {
  options, value: options[0], inputId: "country", "aria-label": "País",
  selectRef: React.createRef<SelectInstance<Country>>(), menuTarget: document.body,
  onChange: option => option?.id, onBlur: event => event.currentTarget.select(),
};
<Form.SelectReact {...select} />;
<Form.SelectReact options={options} value={options[0]} onChange={option => option?.id} />;
<Form.SelectReact isMulti options={options} value={options} onChange={selected => selected.map(option => option.id)} />;
const multiple: FormSelectMultipleProps<Country> = {
  options, value: options, onChange: (value, action) => { value.map(option => option.id); return action.action; },
};
<Form.SelectMultiple {...multiple} />;

const dateRef = React.createRef<DatePickerHandle>();
const dateProps: DatePickerProps = { dateIni: "2026-10-15", disabled: [{ dayOfWeek: [0, 6] }], fromMonth: new Date(2026, 0), lastDate: new Date(), onDayClick: day => day.getDate() };
<DatePicker {...dateProps} ref={dateRef} />;
dateRef.current?.value.getTime();
dateRef.current?.reset();
<FormCard title="Acceso" buttonText="Entrar" onSubmit={event => event.preventDefault()}>
  <FormTextInput name="email" label="Correo" onChange={event => event.currentTarget.value} />
  <FormCheckboxInput label="Acepto" onChange={event => event.currentTarget.checked} />
</FormCard>;

<Modal type={3} body="error" title={<strong>Error</strong>} bodyHeight={200} onRemove={event => event.currentTarget.focus()} />;
<ModalDoc items={[{ title: "Guía", children: "Contenido" }]} initialTab="Guía" bodyHeight="40vh" onAccept={event => event.currentTarget.focus()} />;
<ModalSplash image="/logo.svg" alt="Cargando" />;
<Error height="2rem" />;
<Success width={40} />;
const tabsRef = React.createRef<TabsHandle>();
<Tabs ref={tabsRef} initialTab="Uno"><Tab title="Uno">Uno</Tab>{options.length > 1 && <Tab title="Dos">Dos</Tab>}</Tabs>;
tabsRef.current?.activeTab?.toUpperCase();
<TabbedHeader selectedTitle="Uno" stateCallback={title => title.toUpperCase()}><Tab title="Uno" /></TabbedHeader>;
<TabbedContainer selectedTitle="Uno"><Tab title="Uno" /></TabbedContainer>;

export function HookContracts() {
  const modal = useModal();
  const tabs = useTabs();
  const change = () => {
    modal.changeModal("ok");
    // @ts-expect-error useModal stores a string body state.
    modal.changeModal({ status: "ok" });
  };
  return <tabs.Tabs initialTab="Uno"><Tab title="Uno"><button onClick={change}>{modal.stateBody}</button></Tab></tabs.Tabs>;
}

// @ts-expect-error a textarea callback receives a textarea, not an input.
<Form.Textarea onChange={(event: React.ChangeEvent<HTMLInputElement>) => event.currentTarget.value} />;
// @ts-expect-error the native input value is text/numeric; booleans belong in checked.
<Form.Input value={true} />;
// @ts-expect-error Group only forwards its documented properties.
<Form.Group id="ignored" />;
// @ts-expect-error a controlled range requires onChange.
<Form.Ratio value={2} />;
// @ts-expect-error choose a controlled or uncontrolled range.
<Form.Ratio value={2} defaultValue={1} onChange={() => undefined} />;
// @ts-expect-error select callbacks receive options, not DOM input events.
<Form.SelectReact options={options} onChange={(event: React.ChangeEvent<HTMLInputElement>) => event.currentTarget.value} />;
// @ts-expect-error multi-select values are arrays of options.
<Form.SelectMultiple options={options} value="es" onChange={() => undefined} />;
// @ts-expect-error the consumer must supply a multi-select change handler.
<Form.SelectMultiple options={options} value={options} />;
// @ts-expect-error the calendar exposes a date handle, not an input DOM node.
<DatePicker ref={React.createRef<HTMLInputElement>()} />;
// @ts-expect-error wrapper today is a boolean, unlike DayPicker's date prop.
<DatePicker today={new Date()} />;
// @ts-expect-error disabled accepts DayPicker matchers.
<DatePicker disabled="weekend" />;
// @ts-expect-error Tab titles identify their content and are required.
<Tab>Sin título</Tab>;
// @ts-expect-error ModalDoc needs an array of sections.
<ModalDoc items="Guía" />;
// @ts-expect-error the modal supports three existing footer variants.
<Modal type={4} />;
