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

// export function getShapeStyle(style: BlockInfo['style']) {
//   const result: any = {};
//   ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
//       if (attr != 'rotate') {
//           result[attr] = (style as any)[attr] + 'px'
//       } else {
//           result.transform = 'rotate(' + style[attr] + 'deg)'
//       }
//   })

//   return result as CSSProperties
// }