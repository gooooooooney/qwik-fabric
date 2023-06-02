import { ComponentType } from "~/constants/enum"
import type { fabric } from "~/element"
export type ImageProps = NonNullable<ConstructorParameters<typeof fabric.Image>[number]>

export const ImageCanvasStyle: ImageProps = {
  width: 200,
  height: 28,
  fill: '#181818',
  top: 0,
  left: 0,
  shadow: null,
  stroke: null,
  strokeWidth: 1,
}
export const imageBlock = {
  type: ComponentType.Img as ComponentType.Img,
  id: '',
  isLock: false,
  icon: 'ImageIcon',
  name: 'Image',
  props: {
    text: 'Hello World'
  },
  style: {
    width: 200,
    height: 28,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '',
    letterSpacing: 0,
    textAlign: 'left',
    color: '',
    top: 0,
    left: 0,
  },
  canvasStyle: {
    ...ImageCanvasStyle,
  },
}