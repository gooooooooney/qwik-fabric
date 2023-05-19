/** @jsxImportSource react */
import React from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  // TextIcon,
  // ImageIcon,
  UnderlineIcon
} from '@radix-ui/react-icons';
import './styles.css';
import { qwikify$ } from '@builder.io/qwik-react';
import type { TextAlign} from '~/constants/enum/style';
import { FontStyle, FontWeight, TextDecoration } from '~/constants/enum/style';
import { cx } from '~/utils/common';

interface ToolbarKitProps {
  onChangeTextStyle: (value: string[]) => void;
  onChangeAlignment: (value: TextAlign) => void;
  alignmentDefaultValue?: TextAlign;
  textStyleDefaultValue?: string[];
  class?: string
}
const ToolbarKit = ({onChangeTextStyle, onChangeAlignment, alignmentDefaultValue, textStyleDefaultValue, class: className}: ToolbarKitProps) => (
  <Toolbar.Root orientation='vertical' className={cx('ToolbarRoot', className)} aria-label="Formatting options">
    <Toolbar.ToggleGroup defaultValue={textStyleDefaultValue} onValueChange={onChangeTextStyle} type="multiple" aria-label="Text formatting">
      <Toolbar.ToggleItem className="ToolbarToggleItem" value={FontWeight.Bold} aria-label="Bold">
        <FontBoldIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value={FontStyle.Italic} aria-label="Italic">
        <FontItalicIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ToolbarToggleItem"
        value={TextDecoration.LineThrough}
        aria-label="Strike through"
      >
        <StrikethroughIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ToolbarToggleItem"
        value={TextDecoration.Underline}
        aria-label="Strike through"
      >
        <UnderlineIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="ToolbarSeparator" />
    <Toolbar.ToggleGroup onValueChange={onChangeAlignment} type="single" defaultValue={alignmentDefaultValue} aria-label="Text alignment">
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="left" aria-label="Left aligned">
        <TextAlignLeftIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="center" aria-label="Center aligned">
        <TextAlignCenterIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="right" aria-label="Right aligned">
        <TextAlignRightIcon />
      </Toolbar.ToggleItem>
      {/* <Toolbar.ToggleItem className="ToolbarToggleItem" value="text" aria-label="Text">
        <TextIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="image" aria-label="Image">
        <ImageIcon />
      </Toolbar.ToggleItem> */}
    </Toolbar.ToggleGroup>
    {/* <Toolbar.Separator className="ToolbarSeparator" /> */}
    {/* <Toolbar.Link className="ToolbarLink" href="#" target="_blank" style={{ marginRight: 10 }}>
      Edited 2 hours ago
    </Toolbar.Link> */}
    {/* <Toolbar.Button className="ToolbarButton" style={{ marginLeft: 'auto' }}>
      Share
    </Toolbar.Button> */}
  </Toolbar.Root>
);

export default qwikify$(ToolbarKit,  { eagerness: "visible" });