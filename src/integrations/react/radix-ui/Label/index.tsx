/** @jsxImportSource react */
import type { PropsWithChildren } from 'react';
import React from 'react';
import * as Label from '@radix-ui/react-label';
import { qwikify$ } from '@builder.io/qwik-react';

interface LabelField extends PropsWithChildren {
    label: string;
}

const LabelField = ({label, children}: LabelField) => (
    <div
        className='flex px-4 flex-wrap gap-4 items-center'
    >
        <Label.Root className="LabelRoot" htmlFor={label}>
            {label}
        </Label.Root>
        {children}
    </div>
);

export default qwikify$(LabelField,  { eagerness: "visible" });