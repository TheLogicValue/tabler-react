// @flow

/**
 * Type definitions for Pointer EventHandling
 */

export type Pointer = {
  /**
   * Handle Pointer Down Event
   */
  onPointerDown?: (event: React.SyntheticEvent) => void,
  /**
   * Handle Pointer Move Event
   */
  onPointerMove?: (event: React.SyntheticEvent) => void,
  /**
   * Handle Pointer Cancel Event
   */
  onPointerCancel?: (event: React.SyntheticEvent) => void,
  /**
   * Handle Pointer Capture Acquisition Event
   */
  onGotPointerCapture?: (event: React.SyntheticEvent) => void,
  /**
   * Handle Pointer Capture Loss Event
   */
  onLostPointerCapture?: (event: React.SyntheticEvent) => void,
  /**
   * Handle Pointer Entering the Current Component
   */
  onPointerEnter?: (event: React.SyntheticEvent) => void,
  /**
   * Handle Pointer Leaving the Current Component Event
   */
  onPointerLeave?: (event: React.SyntheticEvent) => void,
  /**
   * Handle Pointer Over Event
   */
  onPointerOver?: (event: React.SyntheticEvent) => void,
  /**
   * Handle Pointer Up Event
   */
  onPointerUp?: (event: React.SyntheticEvent) => void,
};
