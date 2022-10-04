import React from "react";
import ReactDOM from "react-dom";
import { Button } from "../";
import cn from "classnames";
import "./Modal.css"

//type 1 Only 1 accept button
//type 2 2 buttons accept and cancel
function ModalObject({
  children,
  title,
  onClose,
  onAccept,
  onCancel,
  show = true,
  type = 1,
  acceptText = "Ok",
  cancelText = "Cancel",
}: Props): React.Node {
  const classnames = cn("modal modal-blur fade", { show });
  return (
    <div className={classnames}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <Button type="button" color="secondary" onClick={onClose}>
              X
            </Button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            {type === 2 ? (
              <Button onClick={onCancel} size="lg" outline color="secondary">
                {cancelText}
              </Button>
            ) : null}
            <Button onClick={onAccept} size="lg" outline color="primary">
              {acceptText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Modal({
  children,
  title,
  onClose,
  onAccept,
  onCancel,
  show,
  type,
  acceptText,
  cancelText,
}) {
  return ReactDOM.createPortal(
    <ModalObject
      onClose={onClose}
      onAccept={onAccept}
      onCancel={onCancel}
      title={title}
      show={show}
      type={type}
      acceptText={acceptText}
      cancelText={cancelText}
    >
      {children}
    </ModalObject>,
    document.getElementById("root")
  );
}
