import { fabric } from "~/element"

export function initCanvas() {
  fabric.Object.prototype.originX = 'center'
  fabric.Object.prototype.originY = 'center'
}