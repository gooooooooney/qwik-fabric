import { noSerialize, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { useSignal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Aside from '~/components/Aside';
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
import { canvasEvent, emitter } from '~/core/event';
import { changeStyleWithScale } from '~/utils/translate';
import { initCanvas } from '~/core';

export default component$(() => {
  const state = useStore<GlobalState>(globalState)
  useContextProvider(GLOBAL_CONTEXT, state)
  const canvasContainerRef = useSignal<HTMLDivElement>();
  const canvasRef = useSignal<HTMLCanvasElement>()
  const width = changeStyleWithScale(state.canvasStyleData.width, state.canvasStyleData.scale)
  const height = changeStyleWithScale(state.canvasStyleData.height, state.canvasStyleData.scale)

  useVisibleTask$(() => {

    const canvas = new fabric.Canvas(canvasRef.value!, {
      backgroundColor: state.canvasStyleData.backgroundColor,
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
      includeDefaultValues: false // 指示toObject/toDatalessObject是否应该包含默认值，如果设置为false，则优先于对象值
    })
    initCanvas()
    canvas.renderAll()
     
    
    const { listener, removeListener } = canvasEvent(canvas)
    listener()
    // 没有选中元素 重置currentBlock 和 activeElements
    emitter.on(CANVAS_EVENT_SELECTED.NONE, () => {
      state.activeElements = noSerialize([])
      state.updateCurrentBlock(null)
    })
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
      if (type) {
        const item = blockInfoList.find(block => block.type == type)
        if (item) {
          item.id = uid()
          const rect = containerRef!.getBoundingClientRect()
          const { top, left } = rect
          item.canvasStyle.top = item.style.top = e.clientY - top
          item.canvasStyle.left = item.style.left = e.clientX - left
          state.blocks.push(JSON.parse(JSON.stringify(item)))
          const element = renderElement({
            canvas: state.canvas!,
            block: item,
          })
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
            })
            state.canvas?.setActiveObject(element)
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
    <div >
      {/* <div class="py-2 m-auto box-border">
      </div> */}
      <div class="flex flex-row">
        <div class="w-1/8">
          <Aside />
        </div>

        <div class="px-2 flex-1 flex justify-center items-center flex-col">
          <div
            ref={canvasContainerRef}
            style={{ width: `${width}px`, height: `${height}px` }}
            class=" bg-[#f5f5f5] h-full mt-3  ">
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


