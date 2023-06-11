import { Slot, $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';

interface TooltipProps {
    tip: string;
}

const Tooltip = component$(({ tip }: TooltipProps) => {
    const isTooltipVisible = useSignal(false);
    const setIsTooltipVisible = $((visible: boolean) => {
        isTooltipVisible.value = visible;
    })

    useStylesScoped$(`
  .tooltip-trigger {
    position: relative;
    z-index: 1;
  }

  .tooltip {
    position: absolute;
    z-index: 2;
    background-color: #333;
    color: #fff;
    font-size: 14px;
    padding: 8px;
    border-radius: 4px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s;
  }

  .tooltip-content {
    position: relative;
    width: max-content;
  }

  .tooltip-arrow {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: transparent transparent #333 transparent;
  }

  .tooltip-trigger:hover + .tooltip,
  .tooltip:hover {
    opacity: 1;
    pointer-events: auto;
  }
  `)

    return (
        <div class="relative inline-block">
            <div
                onMouseEnter$={() => setIsTooltipVisible(true)}
                onMouseLeave$={() => setIsTooltipVisible(false)}
                class="tooltip-trigger"
            >
                <Slot />
            </div>

            {
                isTooltipVisible.value && (
                    <div class="tooltip">
                        <div class="tooltip-content">
                            {/* <div class="tooltip-arrow" /> */}
                            {tip}
                        </div>
                    </div>
                )
            }
        </div >
    );
});

export default Tooltip;
