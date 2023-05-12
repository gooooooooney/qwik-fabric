import { component$, useSignal } from "@builder.io/qwik";

interface TextProps {
  text: string;
}

export default component$(({ text }: TextProps) => {
  const textSignal = useSignal(text);
  return (
    <>
      <div contentEditable="true">
        <p>{textSignal}</p>
      </div>
    </>
  );
})