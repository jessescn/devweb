import * as React from 'react';
import DrawingArea from '../DrawingArea';
import { useState } from 'react';
import ToolsBar from '../ToolsBar';
import { LineType } from '../utils/types';

const Canvas = () => {
  const [lines, setLines] = useState<LineType[]>([]);
  const [color, setColor] = useState('#000');
  const [strokeWith, setStrokeWidth] = useState(4)

  return (
    <div>
      <ToolsBar setColor={setColor} setStrokeWidth={setStrokeWidth}/>
      <DrawingArea
        lines={lines}
        currentStroke={strokeWith}
        setLines={setLines}
        currentColor={color}
      />
    </div>
  )
}

export default Canvas;