import { useCallback } from "react";
import DrawingArea from "../DrawingArea";
import { useState } from "react";
import ToolsBar from "../ToolsBar";
import { LineType } from "../utils/types";
import { store, actions } from "../../store";

const Canvas = () => {
  const [lines, setLines] = useState<LineType[]>([]);
  const [color, setColor] = useState("#000");
  const [strokeWith, setStrokeWidth] = useState(4);

  const handleSave = useCallback((data: string) => {
    store.dispatch(actions.images.save(data));
  }, []);

  return (
    <div>
      <ToolsBar setColor={setColor} setStrokeWidth={setStrokeWidth} />
      <DrawingArea
        handleExportImage={handleSave}
        lines={lines}
        currentStroke={strokeWith}
        setLines={setLines}
        currentColor={color}
      />
    </div>
  );
};

export default Canvas;
