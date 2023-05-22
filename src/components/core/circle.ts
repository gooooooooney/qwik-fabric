import { ComponentType } from "~/constants/enum"

export const CircleCanvasStyle = {
    // width: 200,
    // height: 28,
    radius: 50,
    startAngle: 0,
    endAngle: 360,
    fill: '#181818',
    top: 0,
    left: 0,
    stroke: null as string | null,
    strokeWidth: 1,
    zoomX: 1,
    zoomY: 1,
}
export const circleBlock = {
    type: ComponentType.Circle as ComponentType.Circle,
    id: '',
    isLock: false,
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