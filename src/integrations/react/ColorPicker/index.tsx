/** @jsxImportSource react */

import ColorPicker from 'react-color';
import React from 'react';
import type { Color, ColorChangeHandler } from 'react-color';
import { qwikify$ } from '@builder.io/qwik-react';

interface ColorPickerProps {
  color: Color,
  onChangeComplete: ColorChangeHandler
}

function ColorSketchPicker({ color, onChangeComplete }: ColorPickerProps) {
  const [colorState, setColorState] = React.useState(color)
  return (
    <div>
      <ColorPicker.SketchPicker
        color={colorState}
        onChangeComplete={(c, e) => {
          setColorState(c.hex)
          onChangeComplete(c, e)
        }}
      />
    </div>
  )
}


export const ColorChromePicker = qwikify$(function ColorChromePicker({ color, onChangeComplete }: ColorPickerProps) {
  const [colorState, setColorState] = React.useState(color)
  return (
    <div>
      <ColorPicker.ChromePicker
        color={colorState}
        onChangeComplete={(c, e) => {
          setColorState(c.hex)
          onChangeComplete(c, e)
        }}
      />
    </div>
  )
}, { eagerness: "visible" })

export default qwikify$(ColorSketchPicker, { eagerness: "visible" })