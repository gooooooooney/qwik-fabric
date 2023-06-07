import type { PropFunction } from '@builder.io/qwik';
import { Slot, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { MenuItem } from '../Menu/Menu';
import Menu from '../Menu/Menu';

interface ContextMenuProps {
  items: MenuItem[];
  id?: string;
  onContextMenu$?: PropFunction<(id?: string) => void>;
}

const ContextMenu = component$(({ items, id, onContextMenu$ }: ContextMenuProps) => {
  const isOpen = useSignal(false);
  const position = useSignal({ x: 0, y: 0 });
  const menuRef = useSignal<HTMLDivElement>();

  useVisibleTask$(({ cleanup }) => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
        isOpen.value = false;
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('contextmenu', handleClickOutside);
    cleanup(() => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleClickOutside);
    });
  })

  return (
    <div>
      {/* {isOpen.value && <div class="fixed top-0 right-0 left-0 bottom-0" onClick$={() => isOpen.value = false} />} */}

      <div ref={menuRef}
        class="relative "
        preventdefault:contextmenu
        onContextMenu$={(event) => {
          isOpen.value = true;
          position.value = {
            x:
              event.clientX ,
            y: event.clientY
          };
          onContextMenu$?.(id)
        }} >
        <Slot />
        {isOpen.value && (
          <div
            style={{ top: position.value.y + 'px', left: position.value.x + 'px' }}
            class="fixed z-10"
          >
            <Menu onClose$={() => {
              isOpen.value = false
            }} items={items} onItemClick$={(item) => {
              isOpen.value = false;
              item.onClick$();
            }} />
          </div>
        )}
      </div>

    </div>
  );
});

export default ContextMenu;
