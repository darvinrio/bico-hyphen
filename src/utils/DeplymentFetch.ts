import { liq_provider_deployments } from "../json/deployments";
import { tokenJSON } from "../json/tokens";

export const fetchDeployments = (chain: string) => {
  let hyphen_details = liq_provider_deployments.filter(
    (d) => d.name == chain
  )[0];

  return {
    network: hyphen_details.database,
    liq_prov: hyphen_details.liq_provider_deployment,
    liq_pool: hyphen_details.liq_pool_deployment,
    weth: tokenJSON.ETH.deployments[chain],
    usdc: tokenJSON.USDC.deployments[chain],
    usdt: tokenJSON.USDT.deployments[chain],
    bico: tokenJSON.BICO.deployments[chain],
  };
};
