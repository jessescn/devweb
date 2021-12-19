import * as React from 'react';

type ToolsBarProps = {
  setColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
}

const ToolsBar = ({ setColor, setStrokeWidth }: ToolsBarProps) => {


  const handleStrokeWidthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStrokeWidth(parseInt(event.target.value));
  }

  return (
    <div>
      <input type="color" onChange={(e) => setColor(e.target.value)} />
      <select
        name="stroke-width"
        id="stroke-width"
        onChange={handleStrokeWidthChange}
        defaultValue={4}
      >
        {[...Array(6)].map((x, i) => <option value={i+1} key={i+1}>Stroke Width: {i+1}</option>)}
      </select>
    </div>
  )
}

export default ToolsBar;