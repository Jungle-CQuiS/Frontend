// src/globalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #444;
  }
`;

export default GlobalStyle;
