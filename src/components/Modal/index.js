import React from "react";
import ReactDOM from "react-dom";
import { Button } from "tabler-react";
import cn from "classnames";
//type 1 Only 1 accept button
//type 2 2 buttons accept and cancel
function Modal({
  children,
  title,
  onClose,
  onAccept,
  show = true,
  type = 1,
  acceptText = "Ok",
  cancelText = "Cancel",
}) {
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
              <Button onClick={onClose} size="lg" outline color="secondary">
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

export default function({
  children,
  title,
  onClose,
  onAccept,
  show,
  type,
  acceptText,
  cancelText,
}) {
  return ReactDOM.createPortal(
    <Modal
      onClose={onClose}
      onAccept={onAccept}
      title={title}
      show={show}
      type={type}
      acceptText={acceptText}
      cancelText={cancelText}
    >
      {children}
    </Modal>,
    document.getElementById("root")
  );
}
