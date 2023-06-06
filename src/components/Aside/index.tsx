import type { PropFunction } from "@builder.io/qwik";
import { component$, $ } from "@builder.io/qwik";
import { useTemplateCtx } from "~/use/useTemplateCtx";
import { Image } from "qwik-image";
import { cx } from "~/utils/common";

interface TemplateProps {
    onSelectTmp$: PropFunction<() => void>
}

export default component$(({ onSelectTmp$ }: TemplateProps) => {
    const tmpState = useTemplateCtx();




    return (
        <div class="absolute top-0 left-2% min-w-xs shadow-radix rounded overflow-y-auto h-2xl bg-white">
            <div>
                <div class="grid gap-5 grid-cols-3 m-5 justify-between">
                    {
                        tmpState.tmps.map((tmp) => {
                            return (
                                <div
                                    key={tmp.id}
                                    data-tmp-id={tmp.id}

                                    onClick$={() => {
                                        tmpState.currentTmp = tmp
                                        onSelectTmp$()
                                    }}
                                >
                                    <Image
                                        class={cx("w-full hover:bg-violet-1! shadow-radix h-full rounded object-center object-cover m-auto")}
                                        style={{
                                            boxShadow: tmpState.currentTmp?.id === tmp.id ? "0 0 5px 2px black" : ""
                                        }}
                                        layout="fixed" width={80} height={80}
                                        aspectRatio={1}
                                        src={tmp.src}
                                        alt="" />
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </div>
    )
})