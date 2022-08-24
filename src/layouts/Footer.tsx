import React from "react";
import styled from "styled-components";

export const Footer = () => {
  return <StyledFooter>a mayonas dash</StyledFooter>;
};

const StyledFooter = styled.footer`
  margin-top: 20px;
  height: 80px;
  padding: 10px;

  /* flex-shrink: 0; */
  text-align: center;
  justify-content: center;
  background-color: white;
  color: black;
  border-radius: 10px;
`;
