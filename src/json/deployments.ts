interface deployments {
  name: string;
  database: string;
  liq_provider_deployment: string;
  liq_pool_deployment: string;
}

export const liq_provider_deployments: deployments[] = [
  {
    name: "ETH",
    database: "ethereum",
    liq_provider_deployment: "0xebab24f13de55789ec1f3ffe99a285754e15f7b9",
    liq_pool_deployment: "0x2A5c2568b10A0E826BfA892Cf21BA7218310180b",
  },
  {
    name: "ARB",
    database: "arbitrum",
    liq_provider_deployment: "0xb4778f5aefeb4605ed96e893417271d4a55e32ee",
    liq_pool_deployment: "0x856cb5c3cBBe9e2E21293A644aA1f9363CEE11E8",
  },
  {
    name: "OPT",
    database: "optimism",
    liq_provider_deployment: "0xb4778f5aefeb4605ed96e893417271d4a55e32ee",
    liq_pool_deployment: "0x856cb5c3cbbe9e2e21293a644aa1f9363cee11e8",
  },
  {
    name: "POL",
    database: "polygon",
    liq_provider_deployment: "0xebab24f13de55789ec1f3ffe99a285754e15f7b9",
    liq_pool_deployment: "0x2A5c2568b10A0E826BfA892Cf21BA7218310180b",
  },
  {
    name: "BNB",
    database: "bsc",
    liq_provider_deployment: "0x279ac60785a2fcb85550eb243b9a42a543171cc7",
    liq_pool_deployment: "0x94D3E62151B12A12A4976F60EdC18459538FaF08",
  },
  {
    name: "AVA",
    database: "avalanche",
    liq_provider_deployment: "0xebab24f13de55789ec1f3ffe99a285754e15f7b9",
    liq_pool_deployment: "0x2A5c2568b10A0E826BfA892Cf21BA7218310180b",
  },
];
