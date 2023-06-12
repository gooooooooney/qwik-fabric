import { noSerialize, $, useVisibleTask$ } from '@builder.io/qwik';
import { useSignal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Editor from '~/components/Editor';
import { blockInfoList } from '~/components/core/components';
import type { ComponentType } from '~/constants/enum';
import { CANVAS_EVENT_SELECTED } from '~/constants/enum';
import { downloadFile, uid } from '~/utils/common';
import { renderElement } from '~/element'
import Attr from '~/components/Attr';
import { initCanvasEvent, emitter } from '~/core/event';
import { changeStyleWithScale } from '~/utils/translate';
import { initCanvas } from '~/core';
import { canvas2Image, canvas2Object } from "~/utils/fabric";
import { elementBorder } from '~/constants/fabric';
import { environment } from '~/store/db';
import { useTemplateCtx } from '~/use/useTemplateCtx';
import DropdownMenu from '~/integrations/react/radix-ui/DropdownMenu/DropdownMenu';
import Tooltip from '~/integrations/react/radix-ui/Tooltip/Tooltip';
import { useToast } from '~/use/useToast';
import Aside from '~/components/Aside/';
import { useLoadTmp } from '~/use/useLoadTmp';
import { useCanvasCtx } from '~/use/useCanvasCtx';
import { Toolbar } from '~/components/Toolbarl/Toolbar';

export default component$(() => {
  const state = useCanvasCtx()
  const tmpState = useTemplateCtx()
  const { toast } = useToast()
  const loadTmpFromDb = useLoadTmp()
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
          console.log(element.getCenterPoint())
          console.log(element.left +5, element.top+50)
          console.log(element.getCoords(true))
          state.canvas?.setActiveObject(element);
        }
      }
    }
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



  const handleSaveTmp = $(() => {
    // 重新保存为模板 不需要id 有id表示是更新 不需要id表示是新建
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...data } = canvas2Object(state.canvas!)
    const url = canvas2Image(state.canvas!)

    environment.saveCanvas({
      canvasStyle: {
        width: state.canvas!.width,
        height: state.canvas!.height,
      }, src: url, data
    }).then(() => {
      loadTmpFromDb()
      toast({
        message: 'success',
      });
    })
  })

  const handleDownload = $(() => {
    const url = canvas2Image(state.canvas!)

    downloadFile(url, 'image')
  })

  return (

    <div>
      <div class="flex flex-col justify-center">
        <div class="flex items-center justify-between w-full mx-auto">
          <div>
            <DropdownMenu
              onDownload$={handleDownload}
              onSaveTmp$={handleSaveTmp}
            />
          </div>
          <div class="w-xl">
            <Toolbar />
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
            <Aside />
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
          <div class="xl:w-xs md:w-1/6 absolute top-0 right-2%" >


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




