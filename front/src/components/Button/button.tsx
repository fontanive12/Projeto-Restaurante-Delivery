import { ButtonContainer, ButtonVariants } from "./button.styles";

interface ButtonProps {
  variant?: ButtonVariants;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  width?: number;
  height?: number;
  label: string;
  onClick?: () => void;
}

export function Button({  
  variant = "primary",
  width = 350,
  height = 60,
  label,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <ButtonContainer
      variant={variant}
      width={width}
      height={height}
      onClick={onClick}
      {...rest}
    >
      {label}
    </ButtonContainer>
  );
}
