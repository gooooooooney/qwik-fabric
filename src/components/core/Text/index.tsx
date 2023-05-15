import { component$, useId, useSignal } from "@builder.io/qwik";
import type { CSSProperties } from "../components";

interface TextProps {
  text: string;
  styles: CSSProperties
}

export default component$(({ text, styles }: TextProps) => {
  const textSignal = useSignal(text);
  const id = useId();
  return (
    <>
      <div class="h-full" data-id={id} style={{...styles}}>
        <div class="h-full p-1">{textSignal}</div>
        
      </div>
    </>
  );
})