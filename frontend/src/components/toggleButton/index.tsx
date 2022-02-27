import "./styles.css";

type ToggleButtonProps = {
  onChange: () => void;
};

export const ToggleButton = (props: ToggleButtonProps) => {
  return (
    <label className="switch">
      <input type="checkbox" onChange={props.onChange} />
      <span className="slider round"></span>
    </label>
  );
};
