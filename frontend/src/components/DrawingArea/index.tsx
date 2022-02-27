import { Stage, Layer, Line } from "react-konva";
import { createRef, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { LineType } from "../utils/types";
import Konva from "konva";

import "./styles.css";
import { useTheme } from "../../hooks/use-theme";

type DrawingAreaProps = {
  lines: LineType[];
  currentColor: string;
  currentStroke: number;
  setLines: (lines: LineType[]) => void;
  handleExportImage: (dataUrl: string) => void;
};

const DrawingArea = ({
  lines,
  setLines,
  currentColor,
  currentStroke,
  handleExportImage,
}: DrawingAreaProps) => {
  const isDrawing = useRef(false);
  const stageRef = createRef<Konva.Stage>();
  const { theme } = useTheme();

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (stage) {
      const position = stage.getPointerPosition();
      if (position)
        setLines([
          ...lines,
          {
            points: [position.x, position.y],
            color: currentColor,
            strokeWidth: currentStroke,
          },
        ]);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    if (stage) {
      const point = stage.getPointerPosition();

      let lastLine = lines[lines.length - 1];

      if (lastLine && point) {
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
      }
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleSaveImage = () => {
    const dataURL = stageRef.current!.toDataURL({
      width: 1000,
      height: 500,
    });
    handleExportImage(dataURL);
  };

  return (
    <div className="canvas-wrapper">
      <Stage
        ref={stageRef}
        width={1000}
        height={500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className="canvas"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
      <div className="save-wrapper">
        <button
          onClick={handleSaveImage}
          style={{ backgroundColor: theme.color, color: theme.bgColor }}
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default DrawingArea;
