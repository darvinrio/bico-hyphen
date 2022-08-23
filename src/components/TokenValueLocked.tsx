import * as dfd from "danfojs";

import styled from "styled-components";
import Image from "next/image";

import { Area, dataprop } from "../charts/Area";
import { NumberFormatter } from "../utils/Formatters";
import { Metric } from "../charts/Metric";
import { tokenJSON } from "../json/tokens";

type Props = {
  data: dfd.DataFrame;
};

type FlipData = {
  date: number;
  token: string;
  liq: number;
  usd_liq: number;
  price: number;
  rank: number;
};

export const TokenValueLocked = ({ data }: Props) => {
  let tokens = data["token"].unique().values;

  let tokensDiv = tokens.map((token: string) => {
    let plotdf = data.query(data["token"].eq(token));

    let plotUSDdf = plotdf.rename({ date: "timestamp", usd_liq: "balance" });
    let plotUSDdata = dfd.toJSON(plotUSDdf) as dataprop[];

    let plotTokendf = plotdf.rename({ date: "timestamp", liq: "balance" });
    let plotTokendata = dfd.toJSON(plotTokendf) as dataprop[];

    let tokenInfo = dfd.toJSON(plotdf) as FlipData[];

    // return (
    //   <TvlDiv>
    //     <Area plotdata={plotUSDdata} color={tokenJSON[token].color} />

    //     {/* <li>1</li> */}
    //     <li>2</li>
    //     <li>3</li>
    //   </TvlDiv>
    // );

    return (
      <div key={token + "TVL"}>
        <p>Total Value Locked in {token} pools</p>
        <TvlDiv>
          <Area plotdata={plotUSDdata} color={tokenJSON[token].color} />
          <Area plotdata={plotTokendata} color={tokenJSON[token].color} />
          <MetricsDiv>
            <Metric
              label={`USD value locked`}
              value={"$" + NumberFormatter(tokenInfo[0].usd_liq)}
            />
            <Metric
              label={`Tokens locked`}
              value={NumberFormatter(tokenInfo[0].liq)}
            />
            <Metric
              label={`Current price`}
              value={"$" + NumberFormatter(tokenInfo[0].price)}
            />
            <ImageWrapper>
            <Image
              src={tokenJSON[token].png_src}
              alt={token + " logo"}
              layout="fill"
              // layout="responsive"
              objectFit="contain"
              // className="image"
            />
            </ImageWrapper>
          </MetricsDiv>
        </TvlDiv>
      </div>
    );
  });

  return <InfoDiv>{tokensDiv}</InfoDiv>;
};
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  /* display: block ; */
  position: relative
`

const TvlDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

const MetricsDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.5fr 0.5fr;
  grid-gap: 1rem;

  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
  }
`;
