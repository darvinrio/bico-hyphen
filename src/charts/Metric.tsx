import React from "react";
import styled from "styled-components";

interface props {
  label: string;
  value: string | number;
}

export const Metric = ({ label, value }: props) => {
  return (
    <MetricDiv>
      <h4>{label}</h4>
      {/* <hr /> */}
      <h2>{value}</h2>
      {/* <h1>{value}</h1> */}
    </MetricDiv>
  );
};

const MetricDiv = styled.div`
  size: auto ;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;

  h1 {
    font-size: 3rem;
  }
`;
