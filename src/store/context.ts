import type { NoSerialize, QRL} from "@builder.io/qwik";
import { noSerialize } from "@builder.io/qwik";
import { $, createContextId } from "@builder.io/qwik";
import type { Canvas } from "fabric/*";
import type { BlockInfo } from "~/components/core/components";
import { CONTEXT_IDS } from "~/constants/enum";
import type { fabric } from "~/element";
export interface GlobalState {
  canvas: NoSerialize<Canvas | undefined>,
  blocks: BlockInfo[];
  canvasStyleData: CanvasStyleData,
  currentBlock: BlockInfo | null,
  activeElements: NoSerialize<fabric.Object[]>
  updateCurrentBlock: QRL<(this: GlobalState, block: BlockInfo | null) => void>
  updateCanvasContext: QRL<(this: GlobalState, canvas?: Canvas) => void>
  updateActiveElements: QRL<(this: GlobalState, elements: fabric.Object[]) => void>
}

export interface CanvasStyleData { // 页面全局数据
  width: number,
  height: number,
  scale: number,
  color: string,
  opacity: number,
  background: string,
  fontSize: number | string,
}

export const GLOBAL_CONTEXT = createContextId<GlobalState>(CONTEXT_IDS.GLOBAL_CONTEXT);

export const globalState: GlobalState = {
  canvas: noSerialize(undefined),
  blocks: [],
  currentBlock: null,
  activeElements: noSerialize([]),
  canvasStyleData: { // 页面全局数据
    width: 750,
    height: 750,
    scale: 100,
    color: '#000',
    opacity: 1,
    background: '#fff',
    fontSize: 14,
  },
  updateActiveElements: $(function (this: GlobalState, elements: fabric.Object[]) {
    this.activeElements = noSerialize(elements)
  }),
  updateCurrentBlock: $(function (this: GlobalState, block: BlockInfo | null) {
    this.currentBlock = block
  }),
  updateCanvasContext: $(function (this: GlobalState, canvas?: Canvas) {

    this.canvas = noSerialize(canvas)
  }),
}
