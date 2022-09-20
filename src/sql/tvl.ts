type Props = {
  network: string;
  liq_prov: string;
  weth: string;
  usdc: string;
  usdt: string;
  bico: string;
};

export const tvlQuery = ({
  network,
  liq_prov,
  weth,
  usdc,
  usdt,
  bico,
}: Props) => {

  // handle bsc decimals of usdc and usdt 
  // USDC and USDT have 6 decimals everywhere except BSC. 
  const flag = network === 'bsc'? '1' : ''

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
            when lower('${usdc}') then 'USDC'
            when lower('${usdt}') then 'USDT'
            when lower('${bico}') then 'BICO'
            when lower('${weth}') then 'ETH'
        end as token,
        case token_address
            when lower('${flag+usdc}') then 6
            when lower('${flag+usdt}') then 6
        else 18 
        end as decimals,
        ethereum.public.udf_hex_to_int(substr(topics[2],3))/pow(10,decimals) as liq,
        rank() over(partition by token, date(block_timestamp) order by block_timestamp desc) as date_rank
    from ${network}.core.fact_event_logs
    where contract_address = lower('${liq_prov}')
        and topics[0] = '0xf28044030a28cf7d3fb8e8f7bbaa42aee92214081fd522b3a38afb279577db89'
    order by block_timestamp desc 
    )

    select * from (
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
      order by rank
    `;
};
