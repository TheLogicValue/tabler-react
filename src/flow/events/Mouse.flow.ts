// @flow

/**
 * Type definitions for Mouse EventHandling
 */

export type Mouse = {
  /**
   * Handle Single-click Event (Left-click)
   */
  onClick?: (event: React.MouseEvent) => void,
  /**
   * Handle ContextMenu Click Event (Right-click)
   */
  onContextMenu?: (event: React.MouseEvent) => void,
  /**
   * Handle Double-click Event (Left-click)
   */
  onDoubleClick?: (event: React.MouseEvent) => void,
  /**
   * Handle Mouse Drag Event
   */
  onDrag?: (event: React.MouseEvent) => void,
  /**
   * Handle Mouse Dragging End Event
   */
  onDragEnd?: (event: React.MouseEvent) => void,
  /**
   * Handle Drag Enter of Current Component
   */
  onDragEnter?: (event: React.MouseEvent) => void,
  /**
   * Handle Drag Exit of the Window
   */
  onDragExit?: (event: React.MouseEvent) => void,
  /**
   * Handle Drag Leave of Current Component
   */
  onDragLeave?: (event: React.MouseEvent) => void,
  /**
   * Handle Mouse Drag Over Event
   */
  onDragOver?: (event: React.MouseEvent) => void,
  /**
   * Handle Drag Start Event
   */
  onDragStart?: (event: React.MouseEvent) => void,
  /**
   * Handle Drag-Release Event (Drop)
   */
  onDrop?: (event: React.MouseEvent) => void,
  /**
   * Handle Mouse Down Event
   */
  onMouseDown?: (event: React.MouseEvent) => void,
  /**
   * Handle the entering (hovering) of the Component.
   */
  onMouseEnter?: (event: React.MouseEvent) => void,
  /**
   * Handle the exiting of the Component.
   */
  onMouseLeave?: (event: React.MouseEvent) => void,
  /**
   * Handle Mouse Move Event
   */
  onMouseMove?: (event: React.MouseEvent) => void,
  /**
   * Handle Mouse Out Event
   */
  onMouseOut?: (event: React.MouseEvent) => void,
  /**
   * Handle Mouse Over Event
   */
  onMouseOver?: (event: React.MouseEvent) => void,
  /**
   * Handle Mouse Up Event
   */
  onMouseUp?: (event: React.MouseEvent) => void,
};
