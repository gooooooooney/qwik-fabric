import EventEmitter from 'events'
import { CANVAS_EVENT_SELECTED, Canvas_Event_Object } from '~/constants/enum'
import { fabric } from '~/element'

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

  const modified = (e: fabric.ModifiedEvent<fabric.TPointerEvent>) => {  
    const target = e.target
    if (target instanceof fabric.Textbox) {
      emitter.emit(Canvas_Event_Object.TEXT_MODIFIED, target)
    }
  }

  const listener = () => {
    if (canvas) {
      canvas.on('selection:created', selected);
      canvas.on('selection:updated', selected);
      canvas.on('selection:cleared', selected);
      canvas.on('object:modified', modified);
    }
  }
  const removeListener = () => {
    canvas.off('selection:created', selected);
    canvas.off('selection:updated', selected);
    canvas.off('selection:cleared', selected);
    canvas.off('object:modified', modified);
  }
  return {
    listener,
    removeListener
  }
}