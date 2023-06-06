import type { TDataUrlOptions } from "fabric"
import { elementBorder } from "~/constants/fabric";
import { fabric } from "~/element";
import type { GlobalState } from "~/store/context";
import { TemplateCanvas } from "~/store/template";
type GradientOption = ConstructorParameters<typeof fabric.Gradient>[0]

export function setGradient(element: fabric.Object | undefined, {
  type = 'linear',
  coords,
  gradientUnits = 'pixels',
  colorStops = [
    { offset: 0, color: 'red', opacity: 1 },
    { offset: 1, color: 'blue', opacity: 1 }
  ],
}: GradientOption) {
  if (element) {
    const gradientEle = new fabric.Gradient({
      type,
      coords: coords || { x1: 0, y1: 0, x2: element.width, y2: 0 },
      gradientUnits,
      colorStops
    })
    element.set('fill', gradientEle)

  }

}

export function canvas2Json(canvas: fabric.Canvas) {
  return canvas.toJSON()
}

export function canvas2DatalessJSON(canvas: fabric.Canvas) {
  return canvas.toDatalessJSON(['id'])
}

export function json2Canvas(canvas: fabric.Canvas, json: string) {
  canvas.loadFromJSON(json)
  canvas.renderAll()
}

export function canvas2Image(canvas: fabric.Canvas, options: TDataUrlOptions = { multiplier: 1, format: 'png', quality: 1 }) {

  canvas.getActiveSelection().set('selectable', false)

  return canvas.toDataURL(options)
}

export function blobUrl2Base64(url: string): Promise<string> {
  return fetch(url).then(res => res.blob()).then(blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result! as any);
      };
      reader.readAsDataURL(blob);
    })
  })

}

export function canvas2Object(canvas: fabric.Canvas) {
  return canvas.toObject(['id'])
}



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
export function loadFromJSON(tmp: TemplateCanvas, canvas: fabric.Canvas, state: GlobalState) {

  const { data, canvasStyle } = tmp;
  canvas.loadFromJSON(JSON.stringify(data), (o, e) => {
    e.set({ ...elementBorder })
    state.blocks.push({ ...o, fill: getColor(e.fill) } as any);
  }).then(c => {
    const fill = getColor(c.backgroundColor);
    state.canvasStyleData.backgroundColor = fill

    // state.canvasStyleData.width = canvasStyle?.width || 0
    // state.canvasStyleData.height = canvasStyle?.height || 0
    c.setDimensions({ 
      width: canvasStyle?.width, 
      height: canvasStyle?.height
    })

    c.requestRenderAll()
  }).catch(err => {
    console.log(err)
  })

}