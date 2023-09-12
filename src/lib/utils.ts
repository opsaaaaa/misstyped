
export const SPACE = ' '

export const NEWLINE = "\n"

export function shuffle<T = any>(arr: T[]): T[] {
  return arr.sort(()=>((Math.round(Math.random())*2)-1))
}

export function subStringsMatch(a:string, b:string, start:number, end: number):boolean {
  return a.slice(start, end) === b.slice(start, end)
}

export function isBlankString(str: string): boolean {
  return !str.match(/[^ ]/)
}

