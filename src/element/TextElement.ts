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

  // 禁止用户垂直缩放
  textElement.setControlVisible('mt', false)
  textElement.setControlVisible('mb', false)

  canvas.add(textElement)
  return textElement
}