import { defineConfig, presetUno, presetIcons } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
export default defineConfig({
  presets: [
    presetUno(),
    presetIcons()
  ],
  rules: [
    ['shadow-radio', { 'box-shadow': '0 2px 10px hsla(0, 0%, 0%, 0.141)' }],
  ],
  shortcuts: {
    'border-shape': 'rounded-md shadow-radio border border-solid border-gray-3',
  },
    transformers: [
    transformerVariantGroup() as any
  ],
})