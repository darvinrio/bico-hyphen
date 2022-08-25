import USDC_png from "../imgs/USDC.png";
import BICO_png from "../imgs/BICO.png";
import USDT_png from "../imgs/USDT.png";
import WETH_png from "../imgs/WETH.png";
import { StaticImageData } from "next/image";

type tokenInfo = {
  [token: string]: {
    color: `#${string}`;
    deployments: {
      [chain: string]: string;
    };
    png_src: StaticImageData;
  };
};

export const tokenJSON: tokenInfo = {
  USDC: {
    color: "#256FC0",
    deployments: {
      ETH: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      ARB: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
      OPT: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
      POL: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      AVA: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
      BNB: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    },
    png_src: USDC_png,
  },
  BICO: {
    color: "#de4000",
    deployments: {
      ETH: "0xf17e65822b568b3903685a7c9f496cf7656cc6c2",
      ARB: "0xa68ec98d7ca870cf1dd0b00ebbb7c4bf60a8e74d",
      OPT: "0xd6909e9e702024eb93312b989ee46794c0fb1c9d",
      POL: "0x91c89a94567980f0e9723b487b0bed586ee96aa7",
      AVA: "0xf17e65822b568b3903685a7c9f496cf7656cc6c2",
      BNB: "0x06250a4962558f0f3e69fc07f4c67bb9c9eac739",
    },
    png_src: BICO_png,
  },
  USDT: {
    color: "#249975",
    deployments: {
      ETH: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      ARB: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      OPT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      POL: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      AVA: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      BNB: "0x55d398326f99059ff775485246999027b3197955",
    },
    png_src: USDT_png,
  },
  ETH: {
    color: "#353535",
    deployments: {
      ETH: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      ARB: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      OPT: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      POL: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      AVA: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
      BNB: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    },
    png_src: WETH_png,
  },
};
