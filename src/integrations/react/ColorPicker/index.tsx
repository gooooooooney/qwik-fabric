/** @jsxImportSource react */

import { SketchPicker, ChromePicker } from 'react-color';
import type { Color, ColorChangeHandler } from 'react-color';
import { qwikify$ } from '@builder.io/qwik-react';

interface ColorPickerProps {
  color: Color,
  onChangeComplete: ColorChangeHandler
}

function ColorSketchPicker({ color, onChangeComplete }: ColorPickerProps) {

  return (
    <div>
      <SketchPicker
        color={color}
        onChangeComplete={onChangeComplete}
      />
    </div>
  )
}


export const ColorChromePicker = qwikify$(function ColorChromePicker({ color, onChangeComplete }: ColorPickerProps) {

  return (
    <div>
      <ChromePicker
        color={color}
        onChangeComplete={onChangeComplete}
      />
    </div>
  )
}, { eagerness: "visible" })

export default qwikify$(ColorSketchPicker, { eagerness: "visible" })