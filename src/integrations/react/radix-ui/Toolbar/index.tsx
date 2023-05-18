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
  TextIcon,
  ImageIcon,
  UnderlineIcon
} from '@radix-ui/react-icons';
import './styles.css';
import { qwikify$ } from '@builder.io/qwik-react';
import { CanvasTextStyle } from '~/constants/enum';

interface ToolbarKitProps {
  onChange: (value: string[]) => void;
}
const ToolbarKit = ({onChange}: ToolbarKitProps) => (
  <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
    <Toolbar.ToggleGroup onValueChange={onChange} type="multiple" aria-label="Text formatting">
      <Toolbar.ToggleItem className="ToolbarToggleItem" value={CanvasTextStyle.Bold} aria-label="Bold">
        <FontBoldIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value={CanvasTextStyle.FontStyle} aria-label="Italic">
        <FontItalicIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ToolbarToggleItem"
        value={CanvasTextStyle.Strikethrough}
        aria-label="Strike through"
      >
        <StrikethroughIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="ToolbarToggleItem"
        value={CanvasTextStyle.Underline}
        aria-label="Strike through"
      >
        <UnderlineIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="ToolbarSeparator" />
    <Toolbar.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="left" aria-label="Left aligned">
        <TextAlignLeftIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="center" aria-label="Center aligned">
        <TextAlignCenterIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="right" aria-label="Right aligned">
        <TextAlignRightIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="text" aria-label="Text">
        <TextIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="image" aria-label="Image">
        <ImageIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    {/* <Toolbar.Separator className="ToolbarSeparator" />
    <Toolbar.Link className="ToolbarLink" href="#" target="_blank" style={{ marginRight: 10 }}>
      Edited 2 hours ago
    </Toolbar.Link> */}
    <Toolbar.Button className="ToolbarButton" style={{ marginLeft: 'auto' }}>
      Share
    </Toolbar.Button>
  </Toolbar.Root>
);

export default qwikify$(ToolbarKit,  { eagerness: "visible" });