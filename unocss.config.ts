import { defineConfig, presetUno, presetIcons } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
export default defineConfig({
  presets: [
    presetUno(),
    presetIcons()
  ],
  rules: [
    ['shadow-radio', { 'box-shadow': '0 2px 10px hsla(0, 0%, 0%, 0.141)' }],
    ['font-Arial', { 'font-family': 'Arial' }],
    ['font-Times-New-Roman', { 'font-family': 'Times New Roman' }],
    ['font-Hoefler-Text', { 'font-family': 'Hoefler Text' }],
    ['font-Delicious', { 'font-family': 'Delicious' }],
    ['font-Helvetica', { 'font-family': 'Helvetica' }],
    ['font-Verdana', { 'font-family': 'Verdana' }],
    ['font-Georgia', { 'font-family': 'Georgia' }],
    ['font-Courier', { 'font-family': 'Courier' }],
    ['font-Comic-Sans-MS', { 'font-family': 'Comic Sans MS' }],
    ['font-Impact', { 'font-family': 'Impact' }],
    ['font-Monaco', { 'font-family': 'Monaco' }],
    ['font-Optima', { 'font-family': 'Optima' }],
    ['font-Plaster', { 'font-family': 'Plaster' }],
    ['font-Engagement', { 'font-family': 'Engagement' }],
  ],
  shortcuts: {
    'border-shape': 'rounded-md shadow-radio border border-solid border-gray-3',
  },
  transformers: [
    transformerVariantGroup() as any
  ],
})