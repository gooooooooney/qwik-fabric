import type { HTMLAttributes} from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import { cx } from "~/utils/common";

interface LabelField extends HTMLAttributes<HTMLDivElement> {
  label: string;
  forLabel?: string
}
const Label = component$(({ label, forLabel, class: className }: LabelField) => {
  return <div
    class={cx('flex px-4 flex-wrap gap-4 flex-col', className)}
  >
    <label for={forLabel}>
      {label}
    </label>
    <Slot />
  </div>
})
export default Label