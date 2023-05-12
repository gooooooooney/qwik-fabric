/* eslint-disable qwik/valid-lexical-scope */
import { useVisibleTask$ } from '@builder.io/qwik';
import { useSignal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Aside from '~/components/Aside';
import { componentList } from '~/components/core/components';


export default component$(() => {
  const draggableRef = useSignal<HTMLDivElement>();
  const renderComponents = useSignal<typeof componentList>([]);

  // FUCK: https://qwik.builder.io/docs/components/events/#synchronous-event-handling
  useVisibleTask$(({ cleanup }) => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer!.dropEffect = 'copy'
    }
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const type = e.dataTransfer?.getData('text');
      if (type) {
        // FUCK: 数组不能push 
        const item = componentList.find(comp => comp.type == type)
        if (item) {
          renderComponents.value = [...renderComponents.value, item];
        }
      }
    }
    draggableRef.value?.addEventListener('dragover', handleDragOver)
    draggableRef.value?.addEventListener('drop', handleDrop)
    cleanup(() => {
      draggableRef.value?.removeEventListener('dragover', handleDragOver)
      draggableRef.value?.removeEventListener('drop', handleDrop)
    })
  })
  return (
    <div class="flex flex-row">
      <div class="w-1/4">
        <Aside />
      </div>
      <div
        ref={draggableRef}
        class="w-1/2 h-screen border border-solid border-coolgray">
        {
          renderComponents.value.map((comp, i) => (
            <div key={comp.type + i}>
              <comp.component$ text={comp.props.text} />
            </div>
          ))
        }
      </div>
      <div class="w-1/4">
        <p>ComponentList</p>
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
