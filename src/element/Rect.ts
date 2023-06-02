import type { RectBlock } from "~/components/core/components"
import type { RenderEleArgs} from ".";
import { fabric } from "."

interface RectRenderEleArgs extends RenderEleArgs {
  block: RectBlock
}
export const renderRect = ({ canvas, block}: RectRenderEleArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {type, ...styles} = block


  const rectElement = new fabric.Rect({
    ...styles,
  })

  canvas.add(rectElement)
  return rectElement
}