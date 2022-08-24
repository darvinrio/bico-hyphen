import React from "react";
import { Card } from "../layouts/Card";

interface props {
  label: string;
  value: string | number;
  large? : boolean
}

export const Metric = ({ label, value, large=false }: props) => {

  if(large) {
    return (
      <Card title={label}>
        <h1>{value}</h1>
      </Card>
  );
  }

  return (
      <Card title={label}>
        <h2>{value}</h2>
      </Card>
  );
};

