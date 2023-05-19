import { useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { useSignal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Aside from '~/components/Aside';
import Editor from '~/components/Editor';
import { blockInfoList } from '~/components/core/components';
import type { ComponentType } from '~/constants/enum';
import type { GlobalState } from '~/store/context';
import { globalState } from '~/store/context';
import { GLOBAL_CONTEXT } from '~/store/context';
import { uid } from '~/utils/common';
import { fabric, renderElement } from '~/element'
import Attr from '~/components/Attr';
import { canvasEvent } from '~/utils/event';
import { changeStyleWithScale } from '~/utils/translate';

export default component$(() => {
  const state = useStore<GlobalState>(globalState)
  useContextProvider(GLOBAL_CONTEXT, state)
  const canvasContainerRef = useSignal<HTMLDivElement>();
  const canvasRef = useSignal<HTMLCanvasElement>()
  const width = changeStyleWithScale(state.canvasStyleData.width, state.canvasStyleData.scale)
  const height = changeStyleWithScale(state.canvasStyleData.height, state.canvasStyleData.scale)

  useVisibleTask$(() => {
    const canvas = new fabric.Canvas(canvasRef.value!)
    const { listener, removeListener } = canvasEvent(canvas)

    listener()
    state.updateCanvasContext(canvas)
    return () => {
      state.updateCanvasContext(undefined)
      canvas.dispose()
      removeListener()
    }
  })

  // FUCK: https://qwik.builder.io/docs/components/events/#synchronous-event-handling
  useVisibleTask$(({ cleanup }) => {
    const containerRef = canvasContainerRef.value
    // FUCK: 需要设置fileDropEnabled： false 才能在app里拖拽， 不能染callback不执行
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer!.dropEffect = 'copy'
    }
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const type = e.dataTransfer?.getData('type') as ComponentType;
      if (type) {
        const item = blockInfoList.find(block => block.type == type)
        if (item) {
          item.id = uid()
          const rect = containerRef!.getBoundingClientRect()
          console.log(rect)
          const { top, left } = rect
          item.canvasStyle.top = item.style.top = e.clientY - top
          item.canvasStyle.left = item.style.left = e.clientX - left
          console.log(e, left)
          state.blocks.push(JSON.parse(JSON.stringify(item)))
          const block = renderElement({
            canvas: state.canvas!,
            block: item,
          })
          if (block) {
            block.set('id', item.id)
            state.canvas?.setActiveObject(block)
          }
        }
      }
    }
    containerRef?.addEventListener('dragover', handleDragOver)
    containerRef?.addEventListener('drop', handleDrop)
    cleanup(() => {
      containerRef?.removeEventListener('dragover', handleDragOver)
      containerRef?.removeEventListener('drop', handleDrop)
    })

  })

  
  return (
    <div class="flex flex-col p-4">
      <div class="py-2 m-auto box-border">
        </div>
      <div class="flex flex-row">
        <div class="w-1/8">
          <Aside />
        </div>

        <div class="px-2 flex-1 flex justify-center">

          <div
            ref={canvasContainerRef}
            style={{ width: `${width}px`, height: `${height}px` }}
            class=" bg-[#f5f5f5] h-full  ">
            <div class=" w-full h-full">
              <Editor parentState={state} >
                <canvas ref={canvasRef} id="canvas" width={width} height={height} />
              </Editor>

            </div>
          </div>
        </div>
        <div class="w-1/6" >
          <Attr />
        </div>
      </div >
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
