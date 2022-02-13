import { useEffect, useRef } from "react";
import { useField } from "@unform/core";

interface Props {
  name: string;
  label?: string;
}
type InputProps = JSX.IntrinsicElements["input"] & Props;

const Input = ({ name, ...rest }: InputProps) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <input
      name={name}
      ref={inputRef}
      type="text"
      defaultValue={defaultValue}
      placeholder="Type your username"
      {...rest}
    />
  );
};
export default Input;
