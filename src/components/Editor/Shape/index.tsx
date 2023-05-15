import { HTMLAttributes, QwikMouseEvent, useStyles$, useStylesScoped$ } from "@builder.io/qwik";
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

type IDotSide = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type IDot = {
  side: IDotSide,
  cursor?: string
}

export default component$(({ active, element, ...rest }: ShapeProps) => {
  const state = useContext(GLOBAL_CONTEXT)
  useStylesScoped$(`.dot {
    transform: translate(-50%, -50%);
    &[data-side*="right"] {
      transform: translate(50%, -50%);
    }
    &[data-side*="bottom"] {
      transform: translate(-50%, 50%);
    }
    &[data-side="bottom-right"] {
      transform: translate(50%, 50%);
    }
  }`)
  

  const dotList: IDot[] = [
    { side: 'top', cursor: 'n-resize' },
    { side: 'bottom', cursor: 'n-resize' },
    { side: 'left', cursor: 'e-resize' },
    { side: 'right', cursor: 'e-resize' },
    { side: 'top-left', cursor: 'se-resize' },
    { side: 'top-right', cursor: 'sw-resize' },
    { side: 'bottom-left', cursor: 'sw-resize' },
    { side: 'bottom-right', cursor: 'se-resize' }
  ]

  const getDotStyle = (item: IDot) => {
    const [side, position] = item.side.split('-')
    const style = { [side]: '0%', cursor: item.cursor }
    if (!position) {
      const side2 = ['top', 'bottom'].includes(side) ? 'left' : 'top'
      style[side2] = '50%'
    } else {
      style[position] = '0%'
    }
  
    return style
  }

  const handleMouseDown = $((e: QwikMouseEvent<HTMLDivElement, MouseEvent>, target: HTMLDivElement) => {
    e.stopPropagation()
    const { clientX, clientY } = e
    const { style } = element
    const { left, top } = style
    state.setCurrentBlock(element)
    let maxX = 0, maxY = 0
    const parentRef = document.getElementById('canvas')
    if (parentRef) {
      const parentRect = parentRef?.getBoundingClientRect()
      maxX = parentRect?.width - target.clientWidth
      maxY = parentRect?.height - target.clientHeight
    }
    const move = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      const cssLeft = x - clientX + left
      const cssTop = y - clientY + top
      // 4是小圆点的长度
      style.left = cssLeft < 0 ? 4 : cssLeft > maxX ? maxX - 4 : cssLeft
      style.top = cssTop < 0 ? 4 : cssTop > maxY ? maxY - 4 : cssTop
    }
    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)

  })

  const handleMouseDownOnPoint = $((point: IDot, e: QwikMouseEvent<HTMLDivElement, MouseEvent>, target: HTMLDivElement) => {
    e.stopPropagation()
    const { clientX, clientY } = e
    const { style } = element
  })

  return <div
    preventdefault:click
    preventdefault:mousedown
    onClick$={(e) => {e.stopPropagation();}}
    onMouseDown$={handleMouseDown}
    {...rest}
    class={cx({ "outline outline-yellow outline-1 select-none": active }, "absolute hover:cursor-move")}>
    {
      (active ? dotList : []).map((point) => {
        return <div
          key={point.side}
          data-side={point.side}
          style={{ ...getDotStyle(point) }}
          preventdefault:mousedown
          onMouseDown$={(e, target) => handleMouseDownOnPoint(point, e, target)}
          class="absolute bg-white border border-solid border-rose w-[4px] h-[4px] rounded-[999px] z-1 dot" />
      })
    }
    <Slot />
  </div>
})