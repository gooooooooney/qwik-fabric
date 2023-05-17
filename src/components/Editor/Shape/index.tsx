import type { HTMLAttributes, QwikMouseEvent } from "@builder.io/qwik";
import { useStylesScoped$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { Slot, component$, $ } from "@builder.io/qwik";
import type { BlockInfo } from "~/components/core/components";
import { GLOBAL_CONTEXT } from "~/store/context";
import { cx } from "~/utils/common";

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
  const { updateCurrentBlock } = useContext(GLOBAL_CONTEXT)
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
    { side: 'bottom', cursor: 's-resize' },
    { side: 'left', cursor: 'w-resize' },
    { side: 'right', cursor: 'e-resize' },
    { side: 'top-left', cursor: 'nw-resize' },
    { side: 'top-right', cursor: 'ne-resize' },
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
    updateCurrentBlock(element)
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

  const handleMouseDownOnPoint = $((point: IDot, e: QwikMouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    const { clientX, clientY } = e
    const { style } = element
    const { width, height, top, left } = style
    const parentRef = document.getElementById('canvas')
    const move = (e: MouseEvent) => {
      const handleTop = () => {
        style.height = e.clientY < parentRef!.getBoundingClientRect().top + 4 ? style.height : height - (e.clientY - clientY)
        const positionTop = top - style.height + height
        style.top = positionTop < 0 ? 0 : positionTop
        if (style.height < 0) {
          style.height = -style.height
          style.top = top + height
        }
      }
      const handleBottom = () => {
        style.height = e.clientY - clientY + height
        if (style.height + style.top > parentRef!.getBoundingClientRect().height) {
          style.height = parentRef!.getBoundingClientRect().height - style.top - 8
        }
        // if (style.height < 0) {
        //   style.height = -style.height
        // }
      }
      switch (point.side) {
        case 'top':
          handleTop()
          break;
        case 'bottom':
          handleBottom()
          break;
        case 'left':
          style.width = width - (e.clientX - clientX)
          style.left = left - style.width + width
          break;
        case 'right':
          style.width = e.clientX - clientX + width
          break;
        case 'top-left':
          // style.top = e.clientY - clientY + style.top
          style.height = height - (e.clientY - clientY)
          style.width = width - (e.clientX - clientX)
          style.left = left - style.width + width
          style.top = top - style.height + height
          break;
        case 'top-right':
          // style.top = e.clientY - clientY + style.top
          style.height = height - (e.clientY - clientY)
          style.width = e.clientX - clientX + width
          style.top = top - style.height + height
          style.left = left
          break;
        case 'bottom-left':
          // style.left = e.clientX - clientX + style.left
          style.width = width - (e.clientX - clientX)
          style.height = e.clientY - clientY + height
          style.left = left - style.width + width
          style.top = top
          break;
        case 'bottom-right':
          style.width = e.clientX - clientX + width
          style.height = e.clientY - clientY + height
          break;
        default:
          break;
      }
      // style.width = e.clientX - clientX + width
      // style.height = e.clientY - clientY + height
    }
    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  })

  return <div
    preventdefault:click
    preventdefault:mousedown
    onClick$={(e) => { e.stopPropagation(); }}
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
          onMouseDown$={(e) => handleMouseDownOnPoint(point, e)}
          class="absolute bg-white border border-solid border-rose w-[4px] h-[4px] rounded-[999px] z-1 dot" />
      })
    }
    <Slot />
  </div>
})