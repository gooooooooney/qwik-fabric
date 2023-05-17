import EventEmitter from 'events'
import { CANVAS_EVENT_SELECTED } from '~/constants/enum'
import type { fabric } from '~/element'

export const emitter = new EventEmitter()

export function canvasEvent(canvas: fabric.Canvas) {
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

  const listener = () => {
    if (canvas) {
      canvas.on('selection:created', selected);
      canvas.on('selection:updated', selected);
      canvas.on('selection:cleared', selected);
    }
  }
  const removeListener = () => {
    canvas.off('selection:created', selected);
    canvas.off('selection:updated', selected);
    canvas.off('selection:cleared', selected);
  }
  return {
    listener,
    removeListener
  }
}