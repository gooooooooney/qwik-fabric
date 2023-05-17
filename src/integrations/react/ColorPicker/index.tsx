/** @jsxImportSource react */

import { SketchPicker} from 'react-color';
import type {Color, ColorChangeHandler} from 'react-color';
import { qwikify$ } from '@builder.io/qwik-react';

interface ColorPickerProps {
    color: Color,
    onChangeComplete: ColorChangeHandler
}

function ColorPicker({color, onChangeComplete}: ColorPickerProps) {

    return (
      <div>
        <SketchPicker
          color={color}
          onChangeComplete={ onChangeComplete}
        />
      </div>
    )   
}

export default qwikify$(ColorPicker,  { eagerness: 'hover' })