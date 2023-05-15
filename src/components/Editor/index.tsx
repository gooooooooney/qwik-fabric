import { component$ } from "@builder.io/qwik";
import Grid from "./Grid";
import type { GlobalState } from "~/store/context";
import Block from "./Block";
import { getCanvasStyle, getShapeStyle } from "~/utils/style";
import { changeStyleWithScale } from "~/utils/translate";
import Shape from "./Shape";

interface EditorProps {
  parentState: GlobalState
}
export default component$(({ parentState }: EditorProps) => {
  const width = changeStyleWithScale(parentState.canvasStyleData.width, parentState.canvasStyleData.scale)
  const height = changeStyleWithScale(parentState.canvasStyleData.height, parentState.canvasStyleData.scale)
  return (
    <div
    id="editor"
      style={
        {
          ...getCanvasStyle(parentState.canvasStyleData),
          width: width + 'px',
          height: height+ 'px',
        }
      }
      class="relative bg-white m-a">
      <Grid width={width} height={height} />
      {
        parentState.blocks.map((block) => (
          <Shape
            style={{...getShapeStyle(block.style)}}
            active={block.id == parentState.currentBlock?.id}
            element={block}
            key={block.id}>
            <Block block={block} />
          </Shape>
        ))
      }
    </div>
  );
})