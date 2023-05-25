// import type { BlockInfo, CSSProperties } from "~/components/core/components"
import type { CanvasStyleData } from "~/store/context"

const filterKeys = ['width', 'height', 'scale']
type keys = keyof CanvasStyleData
export function getCanvasStyle(canvasStyleData: CanvasStyleData) {
  const result: CanvasStyleData = {} as any
  Object.keys(canvasStyleData).filter((key) => !filterKeys.includes(key)).forEach(key => {
      (result as any)[key] = canvasStyleData[key as keys]
      if (key === 'fontSize') {
          result[key] += 'px'
      }
  })

  return result
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}