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

  /* 'notransparent' 클래스가 없는 svg path에만 투명한 fill 적용 */
  /* svg path:not(.notransparent) {
    fill: none !important;
  } */
`;

export default GlobalStyle;
