/* eslint-disable qwik/valid-lexical-scope */
import { useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { useSignal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Aside from '~/components/Aside';
import Editor from '~/components/Editor';
import { blockInfoList } from '~/components/core/components';
import type { GlobalState} from '~/store/context';
import { globalState } from '~/store/context';
import { GLOBAL_CONTEXT } from '~/store/context';
import { uid } from '~/utils/common';


export default component$(() => {
  const state = useStore<GlobalState>(globalState)
  useContextProvider(GLOBAL_CONTEXT, state)
  const canvasContainerRef = useSignal<HTMLDivElement>();

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
      e.clientX

      const type = e.dataTransfer?.getData('type');
      if (type) {
        const item = blockInfoList.find(block => block.type == type)
        if (item) {
          item.id = uid()
          const rect = containerRef?.getBoundingClientRect()
          item.style.top = e.clientY - (rect?.y ?? 0)
          item.style.left = e.clientX - (rect?.x ?? 0)
          state.blocks.push(JSON.parse(JSON.stringify(item)))
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
    <div class="flex flex-row">
      <div class="w-1/4">
        <Aside />
      </div>
      <div
        ref={canvasContainerRef}
        class=" bg-[#f5f5f5] p-6 h-full  overflow-auto">
        <div class="overflow-auto w-full h-full">
          <Editor parentState={state} />
        </div>
      </div>
      <div class="w-1/4">
        <p>{state.blocks.map(v => v.name)}</p>
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
