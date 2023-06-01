import type { TOriginX, TOriginY } from "fabric/*"
import { ComponentType } from "~/constants/enum"
import type { Shadow } from "./text"
// import type { fabric } from "~/element"

// type Circle = NonNullable<ConstructorParameters<typeof fabric.Circle>[number]>

export const CircleCanvasStyle = {
    radius: 50,
    startAngle: 0,
    endAngle: 360,
    left: 265.5,
    top: 115,
    width: 100,
    height: 100,
    fill: "#181818",
    stroke: "#181818",
    strokeWidth: 1,
    strokeDashArray: null,
    strokeLineCap: "butt",
    strokeDashOffset: 0,
    strokeLineJoin: "miter",
    strokeUniform: false,
    strokeMiterLimit: 10,
    scaleX: 1,
    scaleY: 1,
    angle: 0,
    flipX: false,
    flipY: false,
    opacity: 1,
    visible: true,
    backgroundColor: "",
    fillRule: "nonzero",
    paintFirst: "fill",
    globalCompositeOperation: "source-over",
    skewX: 0,
    skewY: 0,
    shadow: null as Shadow | null | undefined,
    originX: 'left' as TOriginX,       
    originY: 'top' as TOriginY,   
}

export const circleBlock = {
    type: ComponentType.Circle as ComponentType.Circle,
    id: '',
    isLock: false,
    icon: 'CircleIcon',
    name: 'Circle',
    style: {
        width: 200,
        height: 28,
        top: 0,
        left: 0,
    },
    canvasStyle: {
        ...CircleCanvasStyle,
    },
}