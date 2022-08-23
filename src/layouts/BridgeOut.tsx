import * as dfd from "danfojs";
import { OverallBridge } from "../components/OverallBridge";

interface Props {
  df: dfd.DataFrame;
}

export const BridgeOut = ({ df }: Props) => {
  return (
    <>
      <OverallBridge data={df} />
    </>
  );
};
