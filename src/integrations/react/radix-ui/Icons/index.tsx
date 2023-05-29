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
  ImageIcon,
  CircleIcon,
  SquareIcon
} from '@radix-ui/react-icons';
import React from 'react';
import { ComponentType } from '~/constants/enum';
import { IconName } from './names';
interface IconsProps {
  name?: ComponentType
  icon?: IconName

}

export const Icons = ({ name,icon}: IconsProps) => {
  
  return (
    <>
      {name === ComponentType.TextBox && <TextIcon />}
      {icon === IconName.ImageIcon || name === ComponentType.Img && <ImageIcon />}
      {name === ComponentType.Circle && <CircleIcon />}
      {name === ComponentType.Rect && <SquareIcon />}
      {icon === IconName.FontBoldIcon && <FontBoldIcon />}
      {icon === IconName.FontItalicIcon && <FontItalicIcon />}
      {icon === IconName.StrikethroughIcon && <StrikethroughIcon />}
      {icon === IconName.TextAlignLeftIcon && <TextAlignLeftIcon />}
      {icon === IconName.TextAlignCenterIcon && <TextAlignCenterIcon />}
      {icon === IconName.TextAlignRightIcon && <TextAlignRightIcon />}

    </>
  )
}
Icons.TextIcon = TextIcon

export default qwikify$(Icons, { eagerness: 'visible' })
