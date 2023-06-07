import { ComponentType } from "~/constants/enum"
import type { fabric } from "~/element"

export type ImageProps = NonNullable<ConstructorParameters<typeof fabric.Image>[1]> & {type: ComponentType.Img, id?: string}

export const ImageCanvasStyle: ImageProps = {
  width: 200,
  height: 28,
  fill: '#181818',
  top: 0,
  left: 0,
  shadow: null,
  stroke: null,
  strokeWidth: 1,
  type: ComponentType.Img,
}
export const imageBlock = {
  type: ComponentType.Img as ComponentType.Img,
  id: '',
  isLock: false,
  icon: 'ImageIcon',
  name: 'Image',
  canvasStyle: {
    ...ImageCanvasStyle,
  },
}