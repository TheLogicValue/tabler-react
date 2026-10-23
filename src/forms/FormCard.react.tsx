import * as React from "react";
import Form from "../components/Form";
import Card from "../components/Card";
import { Button } from "../components/Button";
export type FormCardProps = {
  readonly action?: string;
  readonly children?: React.ReactNode;
  readonly method?: string;
  readonly title: string;
  readonly buttonText: string;
  readonly onSubmit?: React.FormEventHandler<HTMLFormElement>;
};
function FormCard({
  children,
  action,
  method,
  onSubmit,
  title,
  buttonText
}: FormCardProps): React.ReactNode {
  return <Form className="card" onSubmit={onSubmit} action={action} method={method}>
      <Card.Body className="p-6">
        <Card.Title RootComponent="div">{title}</Card.Title>
        {children}
        <Form.Footer>
          <Button type="submit" color="primary" block={true}>
            {buttonText}
          </Button>
        </Form.Footer>
      </Card.Body>
    </Form>;
}
export default FormCard;
