export const enum ComponentType {
  Text = 'text',
  TextBox = 'Textbox',
  Line = 'line',
  Img = 'img',
  Circle = 'Circle',
  Rect = 'Rect',
  Triangle = 'triangle',
  Ellipse = 'ellipse',
  Canvas = 'canvas',
}

export const enum CONTEXT_IDS {
  GLOBAL_CONTEXT = 'gooney.context.global',
  TEMPLATE_CONTEXT = 'gooney.context.template',
}

export const enum CANVAS_EVENT_SELECTED {
  ONE = 'selected:one',
  MULTIPLY = 'selected:multiple',
  NONE = 'selected:none',
}

export const enum Canvas_Event_Object {
  TEXT_MODIFIED = 'text:modified',
  CONTEXT_MENU = 'context:menu',
}

export const enum KEY_CODE {
  DELETE = 'Delete',
  BACKSPACE = 'Backspace',
  ESC = 'Escape',
  ENTER = 'Enter',
  CTRL = 'Control',
  CMD = 'Meta',
  Z = 'z',
  X = 'x',
  C = 'c',
  V = 'v',
  A = 'a',
  S = 's',
  D = 'd',
  G = 'g',
  H = 'h',
  J = 'j',
  K = 'k',
  L = 'l',
  Q = 'q',
  W = 'w',
  E = 'e',
  R = 'r',
  T = 't',
  Y = 'y',
  U = 'u',
  I = 'i',
  O = 'o',
  P = 'p',
  F = 'f',
  B = 'b',
  N = 'n',
  M = 'm',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  SPACE = ' ',
}

export const enum CanvasTextStyle {
  Bold = 'bold',
  Underline = 'underline',
  Strikethrough = 'strikethrough',
  FontStyle = 'italic',
}