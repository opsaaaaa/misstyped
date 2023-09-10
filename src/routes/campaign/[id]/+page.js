import levels from "$lib/data/en/levels.json"
import { shuffle, SPACE } from "$lib/utils.ts"

export function load({ params }) {

    const id = Number(params.id)
    const next = (id + 1) % levels.length
    const prev = (id + levels.length - 1) % levels.length
    return {
        level: shuffle(levels[id].split(SPACE)),
        length: levels.length,
        next,
        prev,
        id,
        url: {
          next: `/campaign/${next}`,
          prev: `/campaign/${prev}`,
        },
    };
}

