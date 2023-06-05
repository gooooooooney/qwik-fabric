/** @jsxImportSource react */
import type { PropsWithChildren } from 'react';
import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

// import './styles.css';
import { qwikify$ } from '@builder.io/qwik-react';


interface TooltipProps extends PropsWithChildren {
  tip: string
}

const _Tooltip = ({ tip, children }: TooltipProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild >
          <div>
            {children}
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent"
            sideOffset={5}
            side='bottom'
          >
            {tip}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default qwikify$(_Tooltip, { eagerness: 'visible' });