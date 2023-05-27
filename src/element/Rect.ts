import type { RectBlock } from "~/components/core/components"
import type { RenderEleArgs} from ".";
import { fabric } from "."

interface RectRenderEleArgs extends RenderEleArgs {
  block: RectBlock
}
export const renderRect = ({ canvas, block}: RectRenderEleArgs) => {
  const rectElement = new fabric.Rect({
    ...block.canvasStyle as any,
  })

  canvas.add(rectElement)
  return rectElement
}