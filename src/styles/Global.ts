import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
   
@import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200&display=swap');

  
body {
  height: 100% ;
  display: flex ;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text} ;
  font-family: ${({ theme }) => theme.font_family.name}, ${({ theme }) =>
  theme.font_family.type};
  
  margin: 30px;
  padding: 10px;
}
p {
  opacity: 0.8;
  line-height: 1.5;
  font-size: 1.1rem;
  h1{
  font-size: 3rem
}
}
img {
  max-width: 100%;
}
a {
  color: black;
  text-decoration: none;

  :hover{
    color:#5f5ccd ;
  }
}
`;
