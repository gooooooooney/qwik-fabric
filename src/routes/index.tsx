import { noSerialize, $, useVisibleTask$, useComputed$, useContext } from '@builder.io/qwik';
import { useSignal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
// import Aside from '~/components/Aside';
import Editor from '~/components/Editor';
import { blockInfoList } from '~/components/core/components';
import type { ComponentType } from '~/constants/enum';
import { CANVAS_EVENT_SELECTED } from '~/constants/enum';
import { GLOBAL_CONTEXT } from '~/store/context';
import { uid } from '~/utils/common';
import { fabric, renderElement } from '~/element'
import Attr from '~/components/Attr';
import { initCanvasEvent, emitter } from '~/core/event';
import { changeStyleWithScale } from '~/utils/translate';
import { initCanvas } from '~/core';
import { canvas2Image, canvas2Object, loadFromJSON, setGradient } from "~/utils/fabric";
import CommonAttr from "~/integrations/react/radix-ui/CommonAttr";
import { elementBorder } from '~/constants/fabric';
import { environment } from '~/store/db';
import { useTemplateCtx } from '~/use/useTemplateCtx';
import DropdownMenu from '~/integrations/react/radix-ui/DropdownMenu/DropdownMenu';
import Tooltip from '~/integrations/react/radix-ui/Tooltip/Tooltip';
import { useToast } from '~/use/useToast';
import Aside from '~/components/Aside';

export default component$(() => {
  const state = useContext(GLOBAL_CONTEXT)
  const tmpState = useTemplateCtx()
  const { toast } = useToast()
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
          element.set({
            id: item.id,
            ...elementBorder
          });
          state.canvas?.setActiveObject(element);
        }
      }
    }
  })

  // useVisibleTask$(({ track }) => {
  //   track(() => {
  //     state.blocks
  //   })
  //   track(() => {
  //     state.currentBlock
  //   })
  //   track(() => {
  //     state.canvasStyleData.backgroundColor
  //   })

  //   if (state.canvas) {
  //     const r = canvas2Object(state.canvas!)
  //     console.log(r)
  //     localStorage.setItem('canvas', r)
  //   }

  // })

  const loadTmpFromDb = $(() => {
    environment.loadCanvas().then(res => {
      // initLoadFromJson(json, state);
      // console.log(res)
      if (res.length) {
        tmpState.tmps = res
      }
    })
  })

  useVisibleTask$(() => {

    const { canvas } = initCanvas(canvasRef.value!, {
      backgroundColor: state.canvasStyleData.backgroundColor,
    })

    loadTmpFromDb()
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

  const loadTmp = $(() => {
    if (tmpState.currentTmp) {
      
      loadFromJSON(JSON.stringify(tmpState.currentTmp.data), state.canvas!, state)
    }

  })

  const handleSaveTmp = $(() => {
    // 重新保存为模板 不需要id 有id表示是更新 不需要id表示是新建
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...data } = canvas2Object(state.canvas!)
    const url = canvas2Image(state.canvas!)
    environment.saveCanvas({ src: url, data }).then(() => {
      loadTmpFromDb()
      toast({
        message: 'success',
      });
    })



  })

  return (

    <div>
      <div class="flex flex-col justify-center">
        <div class="flex items-center justify-between w-full mx-auto">
          <div>
            <DropdownMenu
              onSaveTmp$={handleSaveTmp}
            />
          </div>
          <div class="w-xl">
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
          <div>
            <Tooltip tip='Save data to local'>
              <div
                class="h-[25px] px-4 flex justify-center items-center rounded  shadow-radix cursor-pointer hover:opacity-80 "
                onClick$={() => {
                  const r = canvas2Object(state.canvas!)
                  environment.saveCanvas({ ...(tmpState.currentTmp || {}), ...r })
                  toast({
                    message: 'success',
                    duration: 3000,
                    position: 'center-top',
                  });
                }}>Save</div>
            </Tooltip>
          </div>
        </div>

        <div class="flex flex-row relative justify-center mt-8">
          <div class="w-1/8">
            <Aside onSelectTmp$={() => {
              loadTmp()
            }} />
          </div>

          <div class="absolute top-0 left-1/2 -translate-x-1/2">
            <div class="px-2  flex justify-center items-center flex-col">
              <div
                ref={canvasContainerRef}
                // style={{ width: `${width}px`, height: `${height}px` }}
                class=" bg-[#f5f5f5] h-full ">
                <div class=" w-full h-full">
                  <Editor>
                    <canvas ref={canvasRef} id="canvas" width={width} height={height} />
                  </Editor>

                </div>
              </div>
            </div>
          </div>
          <div class="w-1/6 absolute top-0 right-2%" >


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




