import React from "react";
import { Button, ButtonModal } from "../Button";
import { Spinner, Error, Success } from "../IconAnimate";
import type { ButtonNativeProps } from "../Button";
import cn from "classnames";
import './Modal.css';
//type 1 Only 1 accept button
//type 2 2 buttons accept and cancel
export type ModalProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly body?: string;
  readonly spin?: boolean;
  readonly bodyHeight?: React.CSSProperties["height"];
  readonly title?: React.ReactNode;
  readonly onClose?: ButtonNativeProps["onClick"];
  readonly onAccept?: ButtonNativeProps["onClick"];
  readonly onCancel?: ButtonNativeProps["onClick"];
  readonly onRemove?: ButtonNativeProps["onClick"];
  readonly noFooter?: boolean;
  readonly modalLG?: boolean;
  readonly show?: boolean;
  readonly type?: 1 | 2 | 3;
  readonly acceptText?: React.ReactNode;
  readonly cancelText?: React.ReactNode;
  readonly removeText?: React.ReactNode;
};
export default function TLVModal({
  children,
  className,
  body,
  spin,
  bodyHeight,
  title,
  onClose,
  onAccept,
  onCancel,
  onRemove,
  noFooter = false,
  modalLG = false,
  show = true,
  type = 1,
  acceptText = "Ok",
  cancelText = "Cancel",
  removeText = "Leave Page"
}: ModalProps): React.ReactElement {
  const classnames = cn("modal modal-blur fade", {
    show
  }, className);
  return <div className={classnames}>
            <div className={modalLG ? "modal-dialog modal-lg modal-dialog-centered" : "modal-dialog modal-md-plus modal-dialog-centered"}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        {body == "load" ? null : <Button type="button" className="nodal-header-close" onClick={onClose}>X</Button>}
                    </div>
                    <div className="modal-body" style={{
          height: bodyHeight
        }}>
                        {getBody(body)}
                        {children}
                    </div>
                    {noFooter ? null : <div className="modal-footer">
                                {body === "load" ? null : <ButtonModal onClick={onAccept} color="primary" text={acceptText} spin={spin} />}
                                {body === "load" ? null : type === 2 ? <ButtonModal onClick={onCancel} color="danger" text={cancelText} spin={spin} /> : null}     
                                {body === "load" ? null : type === 3 ? <>
                                        <ButtonModal onClick={onRemove} color="danger" text={removeText} spin={spin} />
                                        <ButtonModal onClick={onCancel} color="secondary" text={cancelText} spin={spin} />
                                    </> : null}     
                            </div>}
                </div>
            </div>
        </div>;
}
function getBody(body?: string): React.ReactNode {
  switch (body) {
    case "load":
      return <div className="modal-load">
            <Spinner height={100} width={100} />
        </div>;
    case "error":
      return <div className="modal-error">
            <Error height={100} width={100} />
        </div>;
    case "ok":
      return <div className="modal-ok">
            <Success height={100} width={100} />
        </div>;
    default:
      return null;
  }
}
