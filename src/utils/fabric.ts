import { fabric } from "~/element";
type GradientOption = ConstructorParameters<typeof fabric.Gradient>[0]

export function setGradient(element: fabric.Object, {
    type ='linear',
    coords = { x1: 0, y1: 0, x2: 100, y2: 0 },
    gradientUnits = 'pixels',
    colorStops = [
        { offset: 0, color: 'red', opacity: 1 },
        { offset: 1, color: 'blue', opacity: 1 }
    ],
}: GradientOption) {
    const gradientEle = new fabric.Gradient({
        type,
        coords,
        gradientUnits,
        colorStops
    })
    element.set('fill', gradientEle)
}