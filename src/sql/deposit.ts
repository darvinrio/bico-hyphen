type Props = {
  network: string;
  liq_pool: string;
  weth: string;
  usdc: string;
  usdt: string;
  bico: string;
};

export const depositQuery = ({
  network,
  liq_pool,
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
      ) 
    ),
    deposits as (
      select 
        block_timestamp,
        tx_hash,
        '0x'|| substr(topics[1],27) as depositor, 
        '0x'|| substr(topics[2],27) as token_deposited, 
          case token_deposited
              when lower('${usdc}') then 'USDC'
              when lower('${usdt}') then 'USDT'
              when lower('${bico}') then 'BICO'
              when lower('${weth}') then 'ETH'
          end as token,
          case token_deposited
              when lower('${flag+usdc}') then 6
              when lower('${flag+usdt}') then 6
              else 18 
          end as decimals,
        regexp_substr_all(SUBSTR(data, 3, len(data)), '.{64}') AS segmented_data,
        ethereum.public.udf_hex_to_int(segmented_data[0]) as chainId,
          case chainId 
              when '1' then 'ETH'
              when '10' then 'OPT'
              when '56' then 'BSC'
              when '137' then 'POL'
              when '42161' then 'ARB'
              when '43114' then 'AVA'
              else 'sus'
          end as chainName,
        ethereum.public.udf_hex_to_int(segmented_data[1])/pow(10,decimals) as amount,
        ethereum.public.udf_hex_to_int(segmented_data[2])/pow(10,decimals) as reward,
        substr(
            hex_decode_string(segmented_data[5]),
            0,
            ethereum.public.udf_hex_to_int(segmented_data[4])
        ) as tag
      from ${network}.core.fact_event_logs
      where contract_address = lower('${liq_pool}')
        and topics[0] = '0x522e11fa05593b306c8df10d2b0b8e01eec48f9d0a9427a7a93f21ff90d66fb1'
    ),
    data as (
      select --distinct chainid 
        block_timestamp,
        tx_hash,
        depositor,
        token_deposited,
        token,
        chainId,
        chainName,
        amount,
        case when price is null then lag(price) ignore nulls over (partition by token order by block_timestamp) else price end as price,
        amount*price as usd_val,
        reward,
        tag
      from deposits d left outer join prices p on 
        d.token = p.symbol and 
        date_trunc(hour, block_timestamp) = p.hour
    )
    
    select 
      date(block_timestamp) as date,
      token,
      chainname,
      tag,
      count(tx_hash) as txs,
      sum(amount) as token_vol,
      sum(usd_val) as usd_vol
    from data -- 13313
    group by 1,2,3,4
    
    -- token, chainname, tag , date
    -- tx_hash, amount, usd_val
      `;
};
