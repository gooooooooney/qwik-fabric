import type { QRL} from "@builder.io/qwik";
import { $, createContextId } from "@builder.io/qwik";
import type { BlockInfo } from "~/components/core/components";
import { CONTEXT_IDS } from "~/constants/enum";
export interface GlobalState {
  blocks: BlockInfo[];
  canvasStyleData: CanvasStyleData,
  currentBlock:   BlockInfo | null,
  setCurrentBlock: QRL<(this: GlobalState, block: BlockInfo | null) => void>
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
  blocks: [],
  currentBlock: null,
  canvasStyleData: { // 页面全局数据
    width: 1200,
    height: 740,
    scale: 100,
    color: '#000',
    opacity: 1,
    background: '#fff',
    fontSize: 14,
  },
  setCurrentBlock: $(function(this: GlobalState,block: BlockInfo | null) {
    this.currentBlock = block
  })
}
