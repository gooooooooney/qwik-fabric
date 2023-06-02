import { noSerialize, useContextProvider, $, useStore, useVisibleTask$, useTask$, useComputed$ } from '@builder.io/qwik';
import { useSignal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import type { DocumentHead } from '@builder.io/qwik-city';
// import Aside from '~/components/Aside';
import Editor from '~/components/Editor';
import { blockInfoList } from '~/components/core/components';
import type { ComponentType } from '~/constants/enum';
import { CANVAS_EVENT_SELECTED } from '~/constants/enum';
import type { GlobalState } from '~/store/context';
import { globalState } from '~/store/context';
import { GLOBAL_CONTEXT } from '~/store/context';
import { uid } from '~/utils/common';
import { fabric, renderElement } from '~/element'
import Attr from '~/components/Attr';
import { initCanvasEvent, emitter } from '~/core/event';
import { changeStyleWithScale } from '~/utils/translate';
import { initCanvas } from '~/core';
import { canvas2Object, setGradient } from "~/utils/fabric";
import CommonAttr from "~/integrations/react/radix-ui/CommonAttr";

export default component$(() => {
  const state = useStore<GlobalState>(globalState)
  useContextProvider(GLOBAL_CONTEXT, state)
  const canvasContainerRef = useSignal<HTMLDivElement>();
  const canvasRef = useSignal<HTMLCanvasElement>()
  const width = changeStyleWithScale(state.canvasStyleData.width, state.canvasStyleData.scale)
  const height = changeStyleWithScale(state.canvasStyleData.height, state.canvasStyleData.scale)

  const render = $(({ type, rect, clientX, clientY }: { type: ComponentType, rect: DOMRect, clientX: number, clientY: number }) => {
    if (type) {
      const item = blockInfoList.find(block => block.type == type);
      if (item) {
        item.id = uid();
        // const rect = containerRef!.getBoundingClientRect();
        const { top, left } = rect;
        item.top = clientY - top;
        item.left = clientX - left;
        state.blocks = [...state.blocks, JSON.parse(JSON.stringify(item))];
        const element = renderElement({
          canvas: state.canvas!,
          block: item,
        });
        if (element) {
          element.set('id', item.id).set({
            // 实心 or 空心
            transparentCorners: false,
            // 边框颜色
            borderColor: '#9c6ade',
            // 
            cornerColor: '#FFF',
            // 圆角
            cornerSize: 10,
            // 辅助边粗细
            borderScaleFactor: 1,
            padding: 2,
            cornerStyle: 'circle',
            cornerStrokeColor: '#9c6ade',
            borderOpacityWhenMoving: .3,
          });
          state.canvas?.setActiveObject(element);
        }
      }
    }
  })
  useTask$(({ track }) => {
    track(() => {
      state.blocks
    })
    track(() => {
      state.currentBlock
    })

    isBrowser ? console.log("changed") : null

  })
  useTask$(({ track }) => {
    track(() => {
      state.canvasStyleData.backgroundColor
    })

    isBrowser ? console.log(state.canvasStyleData.backgroundColor) : console.log(state.canvasStyleData.backgroundColor)

  })

  useVisibleTask$(() => {

    const { canvas, initLoadFromJson } = initCanvas(canvasRef.value!, {
      backgroundColor: state.canvasStyleData.backgroundColor,
    })
    const json = localStorage.getItem('canvas')
    initLoadFromJson(json, state);
    const { listener, removeListener } = initCanvasEvent(canvas)
    listener()
    // 没有选中元素 重置currentBlock 和 activeElements
    emitter.on(CANVAS_EVENT_SELECTED.NONE, () => {
      state.activeElements = noSerialize([])
      state.currentBlock = []
    })
    state.canvas = noSerialize(canvas)
    return () => {
      state.canvas = undefined
      canvas.dispose()
      removeListener()
    }
  })

  // FUCK: https://qwik.builder.io/docs/components/events/#synchronous-event-handling
  useVisibleTask$(({ cleanup }) => {
    const containerRef = canvasContainerRef.value
    // FUCK: 需要设置fileDropEnabled： false 才能在app里拖拽， 不然callback不执行
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer!.dropEffect = 'copy'
    }
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const type = e.dataTransfer?.getData('type') as ComponentType;
      render({
        type,
        rect: containerRef!.getBoundingClientRect(),
        clientX: e.clientX,
        clientY: e.clientY
      });
    }
    containerRef?.addEventListener('dragover', handleDragOver)
    containerRef?.addEventListener('drop', handleDrop)
    cleanup(() => {
      containerRef?.removeEventListener('dragover', handleDragOver)
      containerRef?.removeEventListener('drop', handleDrop)
    })

  })

  const fill = useComputed$(() => {
    const f = state.activeElements?.length ? (state.currentBlock[0]?.fill as string)?.split(',') : state.canvasStyleData.backgroundColor?.split(",")
    return f
  })

  const setCanvasBackgroundColor = $((colors: string[]) => {
    if (colors.length === 1) {
      state.canvasStyleData.backgroundColor = colors[0]
      state.canvas?.set('backgroundColor', colors[0])
    } else {
      const gradient = new fabric.Gradient({
        coords: {
          x1: 0,
          y1: 0,
          x2: state.canvasStyleData.width,
          y2: 0,
        },
        colorStops: colors.map((color, index) => ({
          offset: index / (colors.length - 1),
          color,
        }))
      })
      state.canvasStyleData.backgroundColor = colors.join(',')
      state.canvas?.set('backgroundColor', gradient)
    }
    state.canvas?.renderAll()

  })
  const setElementColor = $((colors: string[]) => {
    if (colors.length === 1) {
      state.currentBlock!.forEach(block => {
        block.fill = colors[0]
      })
      state.activeElements?.forEach((element) => {
        element.set('fill', colors[0])
      })
    } else {
      let lineWidths = state.activeElements && (state.activeElements![0] as any).__lineWidths
      if (Array.isArray(lineWidths)) {
        lineWidths = Math.max(...lineWidths)
      }
      if (!lineWidths) {
        lineWidths = state.activeElements?.[0]?.width || 0
      }
      state.activeElements?.forEach((element) => {
        setGradient(element, {
          coords: {
            x1: 0,
            y1: 0,
            x2: lineWidths,
            y2: 0,
          },
          colorStops: colors.map((color, index) => ({
            offset: index / (colors.length - 1),
            color,
          }))
        })
      })

      state.currentBlock.forEach(block => {
        block.fill = colors.join(',')
      })
    }
    state.canvas?.renderAll()
  })

  return (

    <div>
      <div class="flex flex-col justify-center">
        <div class="w-xl mx-auto">
          <CommonAttr
            canvasWidth={state.canvasStyleData.width}
            canvasHeight={state.canvasStyleData.height}
            onChangeCanvasSize$={({ width, height }) => {
              //  state.canvasStyleData.width = width
              //  state.canvasStyleData.height = height
              state.canvas?.setDimensions({
                width: changeStyleWithScale(width, state.canvasStyleData.scale),
                height: changeStyleWithScale(height, state.canvasStyleData.scale),
              })
              state.canvas?.renderAll()
            }}
            client:load
            // is show when currentBlock is not null. when currentBlock is null, it means the canvas is selected
            isElement={!!state.activeElements?.length}
            shadow={state.currentBlock[0]?.shadow || null}
            onShadowValueChange$={(shadow) => {
              state.currentBlock!.forEach((block) => {
                block.shadow = shadow as any
              })
              state.activeElements?.forEach((element) => {
                element.set('shadow', shadow)
              })
              state.canvas?.renderAll()
            }}
            fill={fill.value}
            onChangeColor$={colors => {
              // 没有活跃的block 不存在时，代表选中的是画布
              if (!state.activeElements?.length) {
                setCanvasBackgroundColor(colors)
              } else {
                setElementColor(colors)
              }
              // state.canvas?.renderAll()
            }}
          />
        </div>

        <div class="flex flex-row relative justify-center">
          {/* <div class="w-1/8">
            <Aside />
          </div> */}

          <div class="px-2  flex justify-center items-center flex-col">
            <div
              ref={canvasContainerRef}
              // style={{ width: `${width}px`, height: `${height}px` }}
              class=" bg-[#f5f5f5] h-full mt-3  ">
              <div class=" w-full h-full">
                <Editor>
                  <canvas ref={canvasRef} id="canvas" width={width} height={height} />
                </Editor>

              </div>
            </div>
          </div>
          <div class="w-1/6 absolute top-0 right-2%" >

            <p onClick$={() => {
              const r = canvas2Object(state.canvas!)
              console.log(r)
              localStorage.setItem('canvas', r)
            }}>save</p>
            <Attr />

          </div>
        </div >
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};




