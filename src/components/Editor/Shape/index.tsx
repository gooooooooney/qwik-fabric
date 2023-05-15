import type { HTMLAttributes, QwikMouseEvent } from "@builder.io/qwik";
import { useTask$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { Slot, component$, useComputed$, $, useStore } from "@builder.io/qwik";
import type { BlockInfo } from "~/components/core/components";
import { ComponentType } from "~/constants/enum";
import { GLOBAL_CONTEXT } from "~/store/context";
import { cx } from "~/utils/common";
import { mod360 } from "~/utils/translate";

interface ShapeProps extends HTMLAttributes<HTMLDivElement> {
  active: boolean,
  element: BlockInfo
  // defaultStyle: {}
}

export default component$(({ active, element, ...rest }: ShapeProps) => {
  const state = useContext(GLOBAL_CONTEXT)
  const localState = useStore({
    pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'], // 八个方向
    pointList2: ['r', 'l'], // 左右两个方向
    initialAngle: { // 每个点对应的初始角度
      lt: 0,
      t: 45,
      rt: 90,
      r: 135,
      rb: 180,
      b: 225,
      lb: 270,
      l: 315,
    },
    angleToCursor: [ // 每个范围的角度对应的光标
      { start: 338, end: 23, cursor: 'nw' },
      { start: 23, end: 68, cursor: 'n' },
      { start: 68, end: 113, cursor: 'ne' },
      { start: 113, end: 158, cursor: 'e' },
      { start: 158, end: 203, cursor: 'se' },
      { start: 203, end: 248, cursor: 's' },
      { start: 248, end: 293, cursor: 'sw' },
      { start: 293, end: 338, cursor: 'w' },
    ],
    cursors: {},
  })
  const getCursor = $(() => {
    const { angleToCursor, initialAngle, pointList } = localState
    const curComponent = element
    const rotate = mod360(curComponent.style.rotate as number) // 取余 360
    const result = {}
    let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

    pointList.forEach(point => {
      const angle = mod360(initialAngle[point as keyof typeof initialAngle] + rotate)
      const len = angleToCursor.length
      // eslint-disable-next-line no-constant-condition
      while (true) {
        lastMatchIndex = (lastMatchIndex + 1) % len
        const angleLimit = angleToCursor[lastMatchIndex]
        if (angle < 23 || angle >= 338) {
          (result as any)[point] = 'nw-resize'

          return
        }

        if (angleLimit.start <= angle && angle < angleLimit.end) {
          (result as any)[point] = angleLimit.cursor + '-resize'

          return
        }
      }
    })

    return result
  })
  useTask$(() => {
    if (element) {
      localState.cursors = getCursor()
    }

  })
  const isActive = useComputed$(() => {
    return active && !element.isLock
  })
  const getPointList = () => {
    if (!isActive.value) return []
    return element.type === ComponentType.Line ? localState.pointList2 : localState.pointList
  }
  const getPointStyle = (point: string) => {
    const width = element.style.width as number
    const height = element.style.height as number
    const hasT = /t/.test(point)
    const hasB = /b/.test(point)
    const hasL = /l/.test(point)
    const hasR = /r/.test(point)
    let newLeft = 0
    let newTop = 0

    // 四个角的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
    } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
        newLeft = width / 2
        newTop = hasT ? 0 : height
      }

      // 左右两边的点，高度居中
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = Math.floor(height / 2)
      }
    }

    const style = {
      marginLeft: '-4px',
      marginTop: '-4px',
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: localState.cursors[point],
    }

    return style
  }


  const handleMouseDown = $((e: QwikMouseEvent<HTMLDivElement, MouseEvent>) => {
    state.setCurrentBlock(element)
    const pos = { ...element.style }
    const startY = e.clientY
    const startX = e.clientX
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top)
    const startLeft = Number(pos.left)
    // 如果元素没有移动，则不保存快照
    let hasMove = false
    const limitX = document.documentElement.clientWidth - document.getElementById('editor')!.offsetWidth
    const limitY = document.documentElement.clientHeight - document.getElementById('editor')!.offsetHeight
    const move = (moveEvent: MouseEvent) => {
      hasMove = true
      const curX = moveEvent.clientX
      const curY = moveEvent.clientY
      pos.top = curY - startY + startTop
      pos.left = curX - startX + startLeft
        // 防止拖拽元素被甩出可视区域
      //   if ( pos.left > limitX) {
      //      pos.left = limitX;
      // }

      // if ( pos.left < 0) {
      //     pos.left  = 0;
      // }

      // if (pos.top > limitY) {
      //     pos.top = limitY;
      // }

      // if (pos.top < 0) {
      //     pos.top = 0;
      // }
      console.log(curX)

      // 修改当前组件样式
      element.style = {...element.style, ...pos} 
      // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
      // 如果不使用 $nextTick，吸附后将无法移动
      // this.$nextTick(() => {
        // 触发元素移动事件，用于显示标线、吸附功能
        // 后面两个参数代表鼠标移动方向
        // curY - startY > 0 true 表示向下移动 false 表示向上移动
        // curX - startX > 0 true 表示向右移动 false 表示向左移动
      //   eventBus.$emit('move', curY - startY > 0, curX - startX > 0)
      // })
    }

    const up = () => {
      // 触发元素停止移动事件，用于隐藏标线
      // eventBus.$emit('unmove')
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  })

  const handleMouseDownOnPoint = $((point: string, e: QwikMouseEvent<HTMLDivElement, MouseEvent>, target: HTMLDivElement) => {
    e.stopPropagation()
    const style = { ...element.style }
    const proportion = style.width as number / (style.height as number)
    const center = {
      x: style.left as number + (style.width as number) / 2,
      y: style.top as number + (style.height as number) / 2,
    }

    const editorRectInfo = document.querySelector('#editor')?.getBoundingClientRect()
    const pointRect = target.getBoundingClientRect()

    // 当前点击圆点相对于画布的中心坐标
    const curPoint = {
      x: Math.round(pointRect.left - editorRectInfo!.left + target.offsetWidth / 2),
      y: Math.round(pointRect.top - editorRectInfo!.top + target.offsetHeight / 2),
    }
    // 获取对称点的坐标
    const symmetricPoint = {
      x: center.x - (curPoint.x - center.x),
      y: center.y - (curPoint.y - center.y),
    }

    // 是否需要保存快照
    let needSave = false
    let isFirst = true
    const move = (moveEvent: MouseEvent) => {
      // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
      // 因此第一次点击时不触发 move 事件
      if (isFirst) {
        isFirst = false
        return
      }

      needSave = true
      const curPositon = {
        x: moveEvent.clientX - Math.round(editorRectInfo!.left),
        y: moveEvent.clientY - Math.round(editorRectInfo!.top),
      }

      // calculateComponentPositonAndSize(point, style, curPositon, proportion, needLockProportion, {
      //   center,
      //   curPoint,
      //   symmetricPoint,
      // })

      // this.$store.commit('setShapeStyle', style)
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      // needSave && this.$store.commit('recordSnapshot')
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  })
  return <div
    preventdefault:click
    onMouseDown$={handleMouseDown}
    {...rest}
    class={cx({ "outline outline-yellow outline-1 select-none": active }, "absolute hover:cursor-move")}>
    {
      getPointList().map((point) => {
        return <div
          key={point}
          style={{ ...getPointStyle(point) }}
          preventdefault:mousedown
          onMouseDown$={(e, target) => handleMouseDownOnPoint(point, e, target)}
          class="absolute bg-white border border-solid border-rose w-[4px] h-[4px] rounded-[999px] z-1" />
      })
    }
    <Slot />
  </div>
})