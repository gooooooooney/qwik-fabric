import type { TOriginX, TOriginY } from "fabric/*"
import { ComponentType } from "~/constants/enum"
import type { Shadow } from "./text"
// import type { fabric } from "~/element"

// type Circle = NonNullable<ConstructorParameters<typeof fabric.Circle>[number]>

export const CircleCanvasStyle = {
    left: 0,                    // 圆形的左侧位置
    top: 0,                     // 圆形的顶部位置
    radius: 50,                  // 圆形的半径
    startAngle: 0,              // 圆形的起始角度（以弧度表示）
    endAngle: 360,      // 圆形的结束角度（以弧度表示）
    angle: 0,                   // 圆形的旋转角度（以弧度表示）
    scaleX: 1,                  // 圆形的水平缩放比例
    scaleY: 1,                  // 圆形的垂直缩放比例
    fill: '#181818',                   // 圆形的填充颜色
    opacity: 1,                 // 圆形的不透明度（取值范围为0到1）
    shadow: null as Shadow | null,               // 圆形的阴影设置
    visible: true,              // 圆形的可见性
    selectable: true,           // 圆形是否可选中
    evented: true,              // 圆形是否响应交互事件
    stroke: "#181818",               // 圆形的描边设置
    strokeWidth: 1,             // 圆形的描边宽度
    strokeOpacity: 1,           // 圆形的描边不透明度
    strokeMiterLimit: 10,       // 圆形的描边斜接限制
    strokeDashArray: null,      // 圆形的虚线样式
    strokeDashOffset: 0,        // 圆形的虚线偏移量
    strokeUniform: false,       // 圆形的描边是否统一缩放
    clipTo: null,               // 圆形的剪切路径
    backgroundColor: '',        // 圆形的背景颜色
    transformMatrix: null,      // 圆形的变换矩阵
    flipX: false,               // 圆形是否水平翻转
    flipY: false,               // 圆形是否垂直翻转
    originX: 'left' as TOriginX,            // 圆形的水平变换原点（可选值为 "left"、"center"、"right"）
    originY: 'top' as TOriginY,             // 圆形的垂直变换原点（可选值为 "top"、"center"、"bottom"）
    crossOrigin: '',            // 跨域设置
    fillPattern: null,          // 圆形的填充图案设置
    fillGradient: null,         // 圆形的填充渐变设置
    strokeGradient: null,       // 圆形的描边渐变设置
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