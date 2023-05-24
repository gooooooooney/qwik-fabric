import type { TextBlock } from "~/components/core/components"
import type { RenderEleArgs } from ".";
import { fabric } from "."

interface TextRenderEleArgs extends RenderEleArgs {
  block: TextBlock
}

export const renderText = ({ canvas, block }: TextRenderEleArgs) => {

 
  const textElement = new fabric.Textbox(block.props.text, {
    ...block.canvasStyle,
  })

  canvas.add(textElement)
  return textElement
}