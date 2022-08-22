type Props = {
  network: string;
  liq_pool: string;
  weth: string;
  usdc: string;
  usdt: string;
  bico: string;
};

export const testQuery = ({
  network,
  liq_pool,
  weth,
  usdc,
  usdt,
  bico,
}: Props) => {
  return `
    with 
    prices as (
      select 
        hour,
        case when symbol = 'WETH' then 'ETH' else symbol end as symbol,
        price
      from ethereum.core.fact_hourly_token_prices
      where symbol in (
        'WETH','BICO','USDT','USDC'
      ) and date(hour) = hour
    ),
    bal_updates as (
      select 
        block_timestamp,
        tx_hash,
        '0x'|| substr(topics[1],27) as token_address,
        case token_address
          when '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8' then 'USDC'
          -- when '0xdac17f958d2ee523a2206206994597c13d831ec7' then 'USDT'
          when '0xa68ec98d7ca870cf1dd0b00ebbb7c4bf60a8e74d' then 'BICO'
          when '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' then 'ETH'
        end as token,
        case token_address
          when '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8' then 6
          when '0xdac17f958d2ee523a2206206994597c13d831ec7' then 6
          else 18 
        end as decimals,
        ethereum.public.udf_hex_to_int(substr(topics[2],3))/pow(10,decimals) as liq,
        rank() over(partition by token, date(block_timestamp) order by block_timestamp desc) as date_rank
      from arbitrum.core.fact_event_logs
      where contract_address = '0xb4778f5aefeb4605ed96e893417271d4a55e32ee'
        and topics[0] = '0xf28044030a28cf7d3fb8e8f7bbaa42aee92214081fd522b3a38afb279577db89'
      order by block_timestamp desc 
    )
    
    select 
      date,
      sum(usd_liq) as tvl 
    from  (
      select 
          date(block_timestamp) as date,
          token,
          liq,
        price,
        liq*price as usd_liq,
        rank() over (partition by token order by date desc) as rank
      from bal_updates join prices on date(block_timestamp)=hour and token=symbol
      where date_rank = 1
    )
    group by 1
      `;
};
