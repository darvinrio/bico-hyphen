import * as dfd from "danfojs";

import { TotalValueLocked } from "../components/TotalValueLocked";
import { TokenValueLocked } from "../components/TokenValueLocked";

interface Props {
  df: dfd.DataFrame
}

export const ValueLocked = ({df}:Props) => {

  return (
    <>
      <TotalValueLocked data={df} />
      <TokenValueLocked data={df} />
    </>
  );
};
