import { fabric } from "~/element"
import initAligningGuidelines from "./initAligningGuidelines"
import { initCenteringGuidelines } from "./initCenteringGuidelines"
import { initMouseEvent } from "./initMouseEvent"
import { guideLines } from "./guidelines"
import { GuideLines } from "./lines"

export function initCanvas(canvasEl: HTMLCanvasElement, options: Record<string, any>) {
  console.log(`Fabric.js版本：${fabric.version}`)
  const canvas = new fabric.Canvas(canvasEl, {
    ...options,
    fireRightClick: true, // 启用右键，button的数字为3
    stopContextMenu: true, // 禁止默认右键菜单
    controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    includeDefaultValues: true, // 指示toObject/toDatalessObject是否应该包含默认值，如果设置为false，则优先于对象值
    selectionBorderColor: '#7367f0', // 选中边框颜色
    selectionLineWidth: 1, // 边框粗细
    selectionDashArray: [5], // 边框虚线
    selectionColor: 'rgba(15,103,240,0.3)', // 选中背景颜色
    selectionFullyContained: true, // 选中元素是否完全包含在选择区域中
    // 元素对象被选中时保持在当前z轴，不会跳到最顶层
    preserveObjectStacking: true,// 默认false
    backgroundVpt: true, // 背景是否随画布移动
  })

  

  initCenteringGuidelines(canvas)
  // initAligningGuidelines(canvas)
  // new GuideLines(canvas)
  guideLines(canvas)
  initMouseEvent(canvas)


  return {
    canvas,
  }
}