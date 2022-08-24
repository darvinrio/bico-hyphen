import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

export const Card = ({ title, children }: Props) => {
  return (
    <CardDiv>
      <CardHeader>{children}</CardHeader>
      <hr />
      <CardFooter>{title}</CardFooter>
    </CardDiv>
  );
};

const CardDiv = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  border: 1px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
`;

const CardHeader = styled.div`
  color: white;
  padding: 10px;
  font-size: 20px;
`;

const CardFooter = styled.div`
  padding: 10px;
  font-size: 12px;
`;
