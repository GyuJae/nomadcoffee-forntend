import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
};

export const darkTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};

type ThemeType = typeof lightTheme;

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  ${reset}
  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.fontColor};
  }
`;
