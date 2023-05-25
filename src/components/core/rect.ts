import { ComponentType } from "~/constants/enum"
import type { Shadow } from "./text"

export const RectCanvasStyle = {
  /**
* Horizontal border radius
* @type Number
* @default
*/
  rx: 5,
  /**
   * Vertical border radius
   * @type Number
   * @default
   */
  ry: 5,
  angle: 0,
  scaleX: 1,
  scaleY: 1,
  width: 100,
  height: 100,
  left: 50,
  top: 50,
  fill: '#000',
  stroke: '',
  strokeWidth: 1,
  shadow: null as Shadow | null | undefined,
}

export const rectBlock = {
  type: ComponentType.Rect as ComponentType.Rect,
  id: '',
  isLock: false,
  name: 'Rect',
  style: {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  },
  canvasStyle: {
    ...RectCanvasStyle,
  },
}