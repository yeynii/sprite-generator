import { ReactNode } from "react";
import styled from "styled-components";
interface ButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
const Button = ({ children, ...rest }: Partial<ButtonProps>) => {
  return <Container {...rest}>{children}</Container>;
};

const Container = styled.button<{ disabled?: boolean }>`
  background-color: #eeeeee;
  border: 1px solid gray;
  ${({ disabled }) => !disabled && `cursor: pointer`};
  font-size: 1em;
  :hover {
    ${({ disabled }) => !disabled && `filter: brightness(0.9)`};
  }
`;

export default Button;
