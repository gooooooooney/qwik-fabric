import { ComponentType } from "~/constants/enum";
import Text from "./Text";

export const componentList = [
  {
    name: 'Text',
    type: ComponentType.Text,
    component$: Text,
    props: {
      text: 'Hello World'
    }
  }
]