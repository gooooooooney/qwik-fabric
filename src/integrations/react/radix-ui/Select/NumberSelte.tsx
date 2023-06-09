/** @jsxImportSource react */
import type { HtmlHTMLAttributes, PropsWithChildren } from 'react';
import React from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

import { cx } from '~/utils/common';
import { qwikify$ } from '@builder.io/qwik-react';

interface SelectItemProps extends PropsWithChildren, HtmlHTMLAttributes<HTMLDivElement>, Select.SelectItemProps {
}
interface SelectProps extends Select.SelectProps {
  range: number[]
}
const NumberSelect = ({ onValueChange, range = [], ...props }: SelectProps) => {
  props.value = props.value || ""
  return (
    <Select.Root onValueChange={onValueChange} {...props}>
      <Select.Trigger
        className="border-shape inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white  hover:bg-violet-1 focus:shadow-[0_0_0_1px] focus:shadow-violet data-[placeholder]:text-violet9 outline-none"
        aria-label="Food"
      >
        <Select.Value placeholder="Select" />
        <Select.Icon className="text-violet">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Label className="px-[25px] text-xs leading-[25px] font-500">
                Font size
              </Select.Label>
              <Select.Separator className="h-[.5px] bg-gray-3 m-[5px]" />
              {
                range.map((n) => (

                  <div key={n}>
                    <SelectItem value={`${n}`}> {n} </SelectItem>
                  </div>
                ))
              }
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
};


// const SelectItem =(({ children, className, ...props }: SelectItemProps) => {
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item className={cx('text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet-5 data-[highlighted]:text-violet1', className)} {...props} ref={forwardedRef}>
      <Select.ItemText >{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});


export default qwikify$(NumberSelect, { eagerness: "visible" });