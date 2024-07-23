// @ts-ignore
import {Hammer} from '@squadette/hammerjs';
// @ts-ignore
import {Mousetrap} from 'mousetrap';

export enum KonvaNodeEvent {
  mouseover = 'mouseover',
  mouseout = 'mouseout',
  mousemove = 'mousemove',
  mouseleave = 'mouseleave',
  mouseenter = 'mouseenter',
  mousedown = 'mousedown',
  mouseup = 'mouseup',
  wheel = 'wheel',
  contextmenu = 'contextmenu',
  click = 'click',
  dblclick = 'dblclick',
  touchstart = 'touchstart',
  touchmove = 'touchmove',
  touchend = 'touchend',
  tap = 'tap',
  dbltap = 'dbltap',
  dragstart = 'dragstart',
  dragmove = 'dragmove',
  dragend = 'dragend',
}

export class DWebBrowserInput {
  public isDraggable = false;
  public isDroppable = false;
}

export class WebBrowserInput {
  constructor() {
    const trap = new Mousetrap(document as any);
    const ham = new Hammer(document as any);
    trap.bind('4', function() {
      console.log('4');
    });
    ham.on('tap', function() {
      console.log('5');
    });
  }
}

export class Move {
  xDelta: number = 0;
  yDelta: number = 0;
  xForce: number = 0;
  yForce: number = 0;
  x: number = 0;
  y: number = 0;
}

export class Group {}

export class HotkeyInput {}

export class SSystemEvents {}

export class ZoomInOut {}

export class Log {}

export class Drag {}

export class Drop {}

export class History {}

export class InputConfig {
  events = {
    // 1. File & Properties
    'Ctrl+Shift+E': 'Export',
    'Ctrl+Alt+S': 'Save to Version History',
    'Ctrl+Shift+K': 'Place Image',
    // 2. Edit
    'Ctrl+C': 'Copy',
    'Ctrl+X': 'Cut',
    'Ctrl+V': 'Paste',
    'Ctrl+Shift+V': 'Paste Over Selection',
    'Alt+drag': 'Resize from Center',
    '_Alt+drag': 'Duplicate Selection',
    'Ctrl+Alt+C': 'Copy Properties',
    'Ctrl+Alt+V': 'Paste Properties',
    // 3. Select
    'Ctrl+right-click': 'Select Layer Menu',
    'Ctrl+click': 'Deep Select',
    // 4. View
    '⎵+drag': 'Pan',
    '+ Zoom': 'In',
    '- Zoom': 'Out',
    'Shift+1': 'Zoom to Fit',
    'Shift+0': 'Zoom to 100%',
    'Shift+R': 'Rulers',
    'Ctrl+Shift+3': 'Show Outlines',
    'Ctrl+Alt+Y': 'Pixel Preview',
    // 5. Arrange
    'Ctrl+]': 'Bring Forward',
    'Ctrl+[': 'Send Backward',
    'Ctrl+Shift+]': 'Bring to Front',
    'Ctrl+Shift+[': 'Send to Back',
    // 6. Tools
    'V': 'Move',
    'C': 'Add/Show Comments',
    'P': 'Pen',
    'Shift+P': 'Pencil',
    'R': 'Rectangle',
    'O': 'Ellipse',
    'L': 'Line',
    'F': 'Frame',
    'S': 'Slice',
    'I': 'Pick Color',
    // 7. Text
    'T': 'Text',
    '_Ctrl+Shift+V': 'Paste and Match Style',
    'Ctrl+B': 'Bold',
    'Ctrl+I': 'Italic',
    'Ctrl+U': 'Underline',
    // 8. Object
    'Ctrl+G': 'Group Selection',
    'Ctrl+Shift+G': 'Ungroup Selection',
    'Ctrl+Shift+H': 'Show/Hide Selection',
    'Ctrl+Shift+L': 'Lock/Unlock Selection',
    'Ctrl+E Flatten': 'Selection',
    'Ctrl+Shift+O': 'Outline Stroke',
    'Alt+double+click': 'Crop Image',
    // 9. Components
    'Ctrl+Alt+K': 'Create Component',
    'Ctrl+Alt+B': 'Detach Instance',
    // 10. Misc
    'Ctrl+Shift+/': 'Keyboard Shortcuts',
  };
}
