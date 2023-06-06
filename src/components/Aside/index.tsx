import { $, useContext } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { useTemplateCtx } from "~/use/useTemplateCtx";
import { Image } from "qwik-image";
import { cx } from "~/utils/common";
import { PlusIcon } from "../ui/Icons/Plus";
import { CrossCircledIcon } from "../ui/Icons/Cross";
import { GLOBAL_CONTEXT, globalState } from "~/store/context";
import { loadFromJSON } from "~/utils/fabric";


export default component$(() => {
    const tmpState = useTemplateCtx();
    const state = useContext(GLOBAL_CONTEXT)
    const loadTmp = $(() => {
        if (tmpState.currentTmp) {
            loadFromJSON(tmpState.currentTmp, state.canvas!, state)
        } else {
            //重置画布
            state.canvas?.clear()
            const origin = globalState.canvasStyleData
            state.canvas?.set({
                backgroundColor: origin.backgroundColor,
            })
            state.blocks = []
            state.currentBlock = []
            state.canvasStyleData.backgroundColor = origin.backgroundColor
            state.canvas?.setDimensions({
                width: origin.width,
                height: origin.height,
            })
            state.canvas?.requestRenderAll()
        }

    })

    return (
        <div class="absolute top-0 left-2% min-w-xs shadow-radix rounded overflow-y-auto h-2xl bg-white">
            <div class="m-5">
                <div class="mb-3">Template</div>

                <div>
                    <div class="grid gap-5 grid-cols-3 justify-between">
                        {
                            tmpState.tmps.map((tmp) => {
                                return (
                                    <div key={tmp.id}
                                    >
                                        <div
                                            data-tmp-id={tmp.id}
                                            class="cursor-pointer relative w-80px hover:bg-violet-1! shadow-radix h-80px flex justify-center items-center"
                                            style={{
                                                boxShadow: tmpState.currentTmp?.id === tmp.id ? "0 0 5px 2px black" : ""
                                            }}
                                            onClick$={() => {
                                                tmpState.currentTmp = tmp
                                                loadTmp()
                                            }}
                                        >
                                            <Image
                                                class={cx("  h-full rounded object-center object-contain! m-auto")}

                                                layout="fixed"
                                                height={80}
                                                aspectRatio={1}
                                                src={tmp.src}
                                                alt="" />
                                            <CrossCircledIcon class="absolute -top-2 -right-2%" />
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                        <div
                            class="cursor-pointer flex  w-80px h-80px justify-center items-center"
                            onClick$={() => {
                                tmpState.currentTmp = null
                                loadTmp()
                            }}
                        >
                            <div class="w-full h-full flex justify-center items-center hover:bg-violet-1! shadow-radix h-full rounded object-center object-contain! m-auto">
                                <PlusIcon />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})