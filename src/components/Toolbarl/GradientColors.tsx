import { component$ } from "@builder.io/qwik"
import TooltipTrigger from "../ui/Tooltip/Tooltip"

export const GradientColors = component$(() => <>
    <div
        class="flex py-2 flex-wrap gap-x-4 gap-y-1 flex-col"
    >
        <label class='text-[#0d1216b3] text-xs'>
            Gradients
        </label>
        <div class="flex flex-wrap ">

            <TooltipTrigger tip='#000000,#737373'>
                <div data-color="#000000,#737373" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#737373]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#000000,#c89116'>
                <div data-color="#000000,#c89116" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#c89116]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#000000,#3533cd'>
                <div data-color="#000000,#3533cd" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#000000] to-[#3533cd]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#a6a6a6,#3533cd'>
                <div data-color="#a6a6a6,#3533cd" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#a6a6a6] to-[#3533cd]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ffa7ad,#ffa9f9'>
                <div data-color="#ffa7ad,#ffa9f9" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ffa7ad] to-[#ffa9f9]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#cdffd8,#94b9ff'>
                <div data-color="#cdffd8,#94b9ff" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#cdffd8] to-[#94b9ff]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff9a9e,#fad0c4'>
                <div data-color="#ff9a9e,#fad0c4" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff3131,#ff914d'>
                <div data-color="#ff3131,#ff914d" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff3131] to-[#ff914d]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff5757,#8c52ff'>
                <div data-color="#ff5757,#8c52ff" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff5757] to-[#8c52ff]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#5170ff,#ff66c4'>
                <div data-color="#5170ff,#ff66c4" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#5170ff] to-[#ff66c4]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#004aad,#cb6ce6'>
                <div data-color="#004aad,#cb6ce6" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#004aad] to-[#cb6ce6]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#8c52ff,#5ce1e6'>
                <div data-color="#8c52ff,#5ce1e6" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff66c4,#ffcbcb'>
                <div data-color="#ff66c4,#ffcbcb" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff66c4] to-[#ffcbcb]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#0cc0df,#ffde59'>
                <div data-color="#0cc0df,#ffde59" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#0cc0df] to-[#ffde59]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ffde59,#ff914d'>
                <div data-color="#ffde59,#ff914d" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ffde59] to-[#ff914d]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff914d,#ffcbcb'>
                <div data-color="#ff914d,#ffcbcb" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff914d] to-[#ffcbcb]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#ff66c4,#ffde59'>
                <div data-color="#ff66c4,#ffde59" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#ff66c4] to-[#ffde59]" ></div>
            </TooltipTrigger>
            <TooltipTrigger tip='#8c52ff,#ff914d'>
                <div data-color="#8c52ff,#ff914d" class="transition w-[25px] h-[25px] rounded shadow-radix cursor-pointer hover:opacity-80 bg-gradient-to-r from-[#8c52ff] to-[#ff914d]" ></div>
            </TooltipTrigger>






        </div>
    </div>
</>)