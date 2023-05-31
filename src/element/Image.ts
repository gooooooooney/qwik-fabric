import type { ImageBlock } from "~/components/core/components"
import type { RenderEleArgs} from ".";
import { fabric } from "."

interface ImageRenderEleArgs extends RenderEleArgs {
  block: ImageBlock
}

export const renderImage = ({ canvas, block}: ImageRenderEleArgs) => {
  const imageElement = new fabric.Image(block.props.text, {
    ...block.canvasStyle as any,
  })
  canvas.add(imageElement)
  return imageElement
}