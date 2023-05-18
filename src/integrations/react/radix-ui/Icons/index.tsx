/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  TextIcon,
  ImageIcon
} from '@radix-ui/react-icons';
import React from 'react';
import { ComponentType } from '~/constants/enum';
import { IconName } from './names';
interface IconsProps {
  name?: ComponentType
  icon?: IconName

}

const Icons = ({ name,icon}: IconsProps) => {
  console.log(TextAlignCenterIcon.name)
  return (
    <>
      {name === ComponentType.TextBox && <TextIcon />}
      {icon === IconName.FontBoldIcon && <FontBoldIcon />}
      {icon === IconName.FontItalicIcon && <FontItalicIcon />}
      {icon === IconName.StrikethroughIcon && <StrikethroughIcon />}
      {icon === IconName.TextAlignLeftIcon && <TextAlignLeftIcon />}
      {icon === IconName.TextAlignCenterIcon && <TextAlignCenterIcon />}
      {icon === IconName.TextAlignRightIcon && <TextAlignRightIcon />}
      {icon === IconName.ImageIcon && <ImageIcon />}

    </>
  )
}
Icons.TextIcon = TextIcon

export default qwikify$(Icons, { eagerness: 'visible' })
