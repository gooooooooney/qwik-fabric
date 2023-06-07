import type { PropFunction, QwikDOMAttributes } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import { cx } from '~/utils/common';
export interface MenuItem {
  label: string;
  value: string;
  onClick$: PropFunction<() => void>;
}

interface MenuProps extends QwikDOMAttributes {
  items: MenuItem[];
  onItemClick$: PropFunction<(item: MenuItem) => void>;
  onClose$: PropFunction<() => void>;
}

const Menu = component$(({ items, onItemClick$, onClose$, ...props }: MenuProps) => {

  return (
    <div class={cx("listWrapper", props.class)}>
      <div class=" shadow-radix text-[rgb(87,70,175)] list">
        {items.map((menu) => (
          <div
            key={menu.label}
            class="listItem  duration-50 hover:(bg-[rgb(110,86,207)] text-white!) cursor-pointer"
            preventdefault:click

            onClick$={(e) => {
              e.stopPropagation()
              onItemClick$(menu);
              onClose$()
            }}

          >
            {menu.label}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Menu;
