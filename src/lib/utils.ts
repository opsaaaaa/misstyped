
export const SPACE = ' '

export const NEWLINE = "\n"

export function shuffle<T = any>(arr: T[]): T[] {
  return arr.sort(()=>((Math.round(Math.random())*2)-1))
}

