import type { CircleBlock } from "~/components/core/components"
import type { RenderEleArgs} from ".";
import { fabric } from "."

interface CircleRenderEleArgs extends RenderEleArgs {
  block: CircleBlock
}
export const renderCircle = ({ canvas, block}: CircleRenderEleArgs) => {
  const circleElement = new fabric.Circle({
    ...block as any,
  })
  canvas.add(circleElement)
  return circleElement
}