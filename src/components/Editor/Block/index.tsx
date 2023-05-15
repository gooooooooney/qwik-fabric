import { component$ } from "@builder.io/qwik";
import Text from "~/components/core/Text";
import type { BlockInfo } from "~/components/core/components";

interface BlockProps {
  block: BlockInfo
}

export default component$(({block}: BlockProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  switch (block.type) {
    case 'text':
      return (
        <Text text={block.props.text} styles={block.style as any} />
      )
    default:
      return null
  }
})