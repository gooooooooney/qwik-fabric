/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { TextIcon } from '@radix-ui/react-icons'
import React from 'react';
import { ComponentType } from '~/constants/enum';
interface IconsProps {
  name: ComponentType;
}

const Icons = ({name}: IconsProps) => {
  return (
    <>
    {name === ComponentType.TextBox && <TextIcon />}
    </>
  )
}
Icons.TextIcon = TextIcon

export default qwikify$(Icons,  { eagerness: 'visible' })
