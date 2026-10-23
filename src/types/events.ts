import type * as React from "react";

/** Event prop groups retained from the public API, using React native handler types. */
export type AnimationEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
>>;

export type ClipboardEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onCopy" | "onCut" | "onPaste"
>>;

export type CompositionEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onCompositionStart" | "onCompositionEnd" | "onCompositionUpdate"
>>;

export type FocusEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onBlur" | "onFocus"
>>;

export type FormEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onChange" | "onInput" | "onInvalid" | "onSubmit"
>>;

export type ImageEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onLoad" | "onError"
>>;

export type KeyboardEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onKeyDown" | "onKeyPress" | "onKeyUp"
>>;

export type MediaEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onAbort" | "onCanPlay" | "onCanPlayThrough" | "onDurationChange" | "onEmptied" | "onEncrypted" | "onEnded" | "onError" | "onLoadedData" | "onLoadedMetadata" | "onLoadStart" | "onPause" | "onPlay" | "onPlaying" | "onProgress" | "onRateChange" | "onSeeked" | "onSeeking" | "onStalled" | "onSuspend" | "onTimeUpdate" | "onVolumeChange" | "onWaiting"
>>;

export type MouseEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onClick" | "onContextMenu" | "onDoubleClick" | "onDrag" | "onDragEnd" | "onDragEnter" | "onDragExit" | "onDragLeave" | "onDragOver" | "onDragStart" | "onDrop" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseOut" | "onMouseOver" | "onMouseUp"
>>;

export type OtherEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DetailsHTMLAttributes<T>,
  "onToggle"
>>;

export type PointerEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onPointerDown" | "onPointerMove" | "onPointerUp" | "onPointerCancel" | "onGotPointerCapture" | "onLostPointerCapture" | "onPointerEnter" | "onPointerLeave" | "onPointerOver"
>>;

export type SelectionEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onSelect"
>>;

export type TouchEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onTouchCancel" | "onTouchEnd" | "onTouchMove" | "onTouchStart"
>>;

export type UIEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onScroll"
>>;

export type WheelEvents<T extends Element = HTMLElement> = Readonly<Pick<React.DOMAttributes<T>,
  "onWheel"
>>;
