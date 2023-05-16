import type { HTMLAttributes } from "@builder.io/qwik";
import { component$, useId, useSignal } from "@builder.io/qwik";
import type { CSSProperties } from "../components";

interface TextProps {
  text: string;
  styles: CSSProperties
}

export default component$(({ text, styles }: TextProps) => {
  const textSignal = useSignal(text);
  const id = useId();
  const contentEditable = useSignal<HTMLAttributes<HTMLDivElement>['contentEditable']>("false");

  return (
    <>
      <div class="h-full" data-id={id} style={{ ...styles }}>
        <div
          class="h-full p-1"
          tabIndex={0}
          onBlur$={() => contentEditable.value = 'false'}
          onDblClick$={() => { contentEditable.value = "true" }}
          contentEditable={contentEditable.value}
          onInput$={(e) => { textSignal.value = e.target!.textContent ?? '' }}
        >{textSignal}</div>

      </div>
    </>
  );
})