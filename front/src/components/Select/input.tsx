import { useFormContext } from "react-hook-form";
import { InputContainer } from "./input.styles";

interface InputProps {
  width: number;
  height: number;
  label: string;
  id: string;
  placeholder?: string;
  errorMessage: string | undefined;
  type?: string;
}

export function Input({
  width,
  height,
  label,
  id,
  placeholder = "",
  errorMessage,
  type,
}: InputProps) {
  const { register } = useFormContext();
  return (
    <InputContainer width={width} height={height}>
      <label htmlFor={id}>{label}</label>
      <input id={id} placeholder={placeholder} {...register(id)} type={type} />
      <span>{errorMessage}</span>
    </InputContainer>
  );
}
