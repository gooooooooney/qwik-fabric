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
  rectElement.set({
    transparentCorners: false,
    cornerColor: 'blue',
    cornerStrokeColor: 'red',
    borderColor: 'red',
    cornerSize: 12,
    padding: 10,
    cornerStyle: 'circle',
    borderDashArray: [3, 3]
  });
  return rectElement
}