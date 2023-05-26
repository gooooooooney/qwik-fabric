import EventEmitter from 'events'
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from '~/constants/enum'
import { fabric } from '~/element'

export const emitter = new EventEmitter()

export function initCanvasEvent(canvas: fabric.Canvas) {
  const selected = () => {
    const activeElements = canvas.getActiveObjects()
    if (activeElements?.length === 1) {
      const activeElement = activeElements[0]
      emitter.emit(CANVAS_EVENT_SELECTED.ONE, activeElement)
    } else if (activeElements?.length > 1) {
      emitter.emit(CANVAS_EVENT_SELECTED.MULTIPLY, activeElements)
    } else {
      emitter.emit(CANVAS_EVENT_SELECTED.NONE)
    }
  }

  const modified = (e: fabric.ModifiedEvent<fabric.TPointerEvent>) => {
    const target = e.target
    if (target instanceof fabric.Textbox) {
      emitter.emit(Canvas_Event_Object.TEXT_MODIFIED, target)
    }
  }

  const mouseUp = (ev: fabric.TPointerEventInfo<fabric.TPointerEvent>) => {
    // 获取画布视口边界
    const canvasBoundaries = canvas.calcViewportBoundaries()

    // 矩形本身
    const obj = ev.target
    if (!obj) return

    // 矩形的边界
    const objBoundingRect = obj.getBoundingRect()

    // 【公式1】
    if (objBoundingRect.left < canvasBoundaries.tl.x) {
      obj.left = canvasBoundaries.tl.x + 10
    }

    // 【公式2】
    if (objBoundingRect.left + objBoundingRect.width > canvasBoundaries.br.x) {
      obj.left = canvasBoundaries.br.x - objBoundingRect.width -10
    }

    // 【公式3】
    if (objBoundingRect.top < canvasBoundaries.tl.y) {
      obj.top = canvasBoundaries.tl.y + 10
    }

    // 【公式4】
    if (objBoundingRect.top + objBoundingRect.height > canvasBoundaries.br.y) {
      obj.top = canvasBoundaries.br.y - objBoundingRect.height - 10
    }

    // 刷新画布
    canvas.renderAll()
  }

  const listener = () => {
    if (canvas) {
      canvas.on('selection:created', selected);
      canvas.on('selection:updated', selected);
      canvas.on('selection:cleared', selected);
      canvas.on('object:modified', modified);
      canvas.on('mouse:up', mouseUp)
    }
  }
  const removeListener = () => {
    canvas.off('selection:created', selected);
    canvas.off('selection:updated', selected);
    canvas.off('selection:cleared', selected);
    canvas.off('object:modified', modified);
    canvas.off('mouse:up', mouseUp)
  }

  return {
    listener,
    removeListener
  }
}