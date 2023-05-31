import { fabric } from "~/element";
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

export function canvas2Image(canvas: fabric.Canvas) {
    return canvas.toDataURL()
}

export function canvas2Object(canvas: fabric.Canvas) {
    return canvas.toObject(['id'])
}