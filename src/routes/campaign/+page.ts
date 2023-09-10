
import levels from "$lib/data/en/levels.json"

const DEFAULT_PAGE = 0
const DEFAULT_PER = 20

export function load({ url }: any) {
  let per = Number(url.searchParams.get('per')) | DEFAULT_PER
  let page = Number(url.searchParams.get('page')) | DEFAULT_PAGE

  // let current = pageContent(page, per)

  // function more() {
  //   console.log('more')
  //   page + 1
  //   url.searchParams.set('page', String(page))
  //   current = addContent(current, page, per)
  // }

  //   function less() {
  //     current = removeContent(current, per)
  //   }

  return {
    levels,
    per,
    page,
  }
}

// function removeContent(current: any[], per: number) {
  
// }

// function addContent(current: any[], page: number, per: number) {
//   current.push(...pageContent(page, per))
//   return current
// }

// function pageContent(page: number, per: number) {
//   return levels.slice(page * per, page * per + per)
// }

