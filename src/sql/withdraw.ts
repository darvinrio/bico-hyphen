type Props = {
  network: string;
  liq_pool: string;
  weth: string;
  usdc: string;
  usdt: string;
  bico: string;
};

export const withdrawQuery = ({
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
    withdraws as (
      select 
        block_timestamp,
        tx_hash,
        '0x'|| substr(topics[1],27) as token_withdrawn, 
        case token_withdrawn
          when lower('${usdc}') then 'USDC'
          when lower('${usdt}') then 'USDT'
          when lower('${bico}') then 'BICO'
          when lower('${weth}') then 'ETH'
        end as token,
        case token_withdrawn
          when lower('${flag+usdc}') then 6
          when lower('${flag+usdt}') then 6
          else 18 
        end as decimals,
        ethereum.public.udf_hex_to_int(substr(topics[2],3))/pow(10,decimals) as target_amount, 
        ethereum.public.udf_hex_to_int(substr(topics[3],3))/pow(10,decimals) as actual_amount, 
        regexp_substr_all(SUBSTR(data, 3, len(data)), '.{64}') AS segmented_data,
        '0x'|| substr(segmented_data[0],25) as receiver,
        ethereum.public.udf_hex_to_int(segmented_data[2]) as chainId,
        case chainId 
          when '1' then 'ETH'
          when '10' then 'OPT'
          when '56' then 'BSC'
          when '137' then 'POL'
          when '42161' then 'ARB'
          when '43114' then 'AVA'
          else 'sus'
        end as chainName,
        ethereum.public.udf_hex_to_int(segmented_data[3])/pow(10,decimals) as lpfee,
        ethereum.public.udf_hex_to_int(segmented_data[4])/pow(10,decimals) as transferfee,
        ethereum.public.udf_hex_to_int(segmented_data[5])/pow(10,decimals) as gasfee,
        segmented_data[7] as deposit_tx
      from ${network}.core.fact_event_logs
      where contract_address = lower('${liq_pool}')
        and topics[0] = '0x6bfd5ee5792d66b151a3fab9f56ee828a0f1c3216d4b752e267cd5590326b15c'
    ),
    data as (
      select 
        block_timestamp,
        tx_hash,
        token_withdrawn,
        token,
        target_amount,
        actual_amount,
        case when price is null then lag(price) ignore nulls over (partition by token order by block_timestamp) else price end as price,
        target_amount*price as target_usd,
        actual_amount*price as actual_usd,
        receiver,
        chainId,
        chainName,
        lpfee,
        transferfee,
        gasfee,
        lpfee*price as lpfeeusd,
        transferfee*price as transferfeeusd,
        gasfee*price as gasfeeusd,
        deposit_tx
      from withdraws d left outer join prices p on 
        d.token = p.symbol and 
        date_trunc(hour, block_timestamp) = p.hour
    )
    
    select 
      date(block_timestamp) as date,
      token,
      chainname,
      count(tx_hash) as txs,
      sum(actual_amount) as token_vol,
      sum(actual_usd) as usd_vol,
      sum(target_amount - actual_amount) as lost_token_vol,
      sum(target_usd - actual_usd) as lost_usd_vol,
      sum(lpfee) as lpfee,
      sum(transferfee) as transferfee,
      sum(gasfee) as gasfee,
      sum(lpfeeusd) as lpfee_usd,
      sum(transferfeeusd) as transferfee_usd,
      sum(gasfeeusd) as gasfee_usd,
      sum(lpfee+transferfee+gasfee) as fees,
      sum(lpfeeusd+transferfeeusd+gasfeeusd) as fees_usd
    from data 
    group by 1,2,3
    -- token, chainname, tag , date
    -- tx_hash, actual_amount, target_amount - actual_amount, usd, lpfee, transferfee, gasfee
    `;
};
