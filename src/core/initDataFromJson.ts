import { fabric } from "~/element";
import type { GlobalState } from "~/store/context";

function getColor(color: string | fabric.TFiller | null) {
  if (typeof color === 'string') {
    return color;
  }
  if (color instanceof fabric.Gradient) {
    return color.colorStops.map(stop => stop.color).join(',');
  }
  // if (color instanceof fabric.Pattern) {
  //   return color.source;
  // }
  return '';

}
export function initLoadFromJson(json: string | null, canvas: fabric.Canvas, state: GlobalState) {
  if (json) {
    canvas.loadFromJSON(json, (o, e) => {
      state.blocks.push({ ...o, fill: getColor(e.fill) } as any);
    }).then(c => {
      const fill = getColor(c.backgroundColor);
      state.canvasStyleData.backgroundColor = fill
      c.requestRenderAll()
    });
  }
}