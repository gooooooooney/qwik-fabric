import { ComponentType } from "~/constants/enum"
import type { Shadow } from "./text"
import { ImageIcon } from "@radix-ui/react-icons"

export const ImageCanvasStyle = {
  width: 200,
  height: 28,
  fill: '#181818',
  top: 0,
  left: 0,
  // shadow
  shadow: null as Shadow | null | undefined,
  // fontStyle
  // stroke and strokeWidth
  stroke: null as string | null,
  strokeWidth: 1,
}
export const imageBlock = {
  type: ComponentType.Img as ComponentType.Img,
  id: '',
  isLock: false,
  icon: ImageIcon,
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