import { ApiV3Token, ApiV3PoolInfoStandardItem, ApiV3PoolInfoItem } from '@raydium-io/raydium-sdk-v2'
import { wSolToSolString } from '@/utils/token'

export function getPoolName(input: ApiV3Token[] | ApiV3PoolInfoItem) {
  let tokens: ApiV3Token[]
  if (Array.isArray(input)) {
    tokens = input
  } else {
    tokens = [input.mintA, input.mintB]
  }
  
  if (tokens.length < 2) return wSolToSolString(tokens[0].symbol) || tokens[0]?.address.substring(0, 6)
  return `${wSolToSolString(tokens[0].symbol) || tokens[0]?.address.substring(0, 6)} - ${
    wSolToSolString(tokens[1]?.symbol) || tokens[1]?.address.substring(0, 6)
  }`
} 