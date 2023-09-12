<script lang="ts">
  import { shuffle } from "$lib/utils.ts"
  import Typer from "$lib/components/Typer.svelte"
  import { memo } from "$lib/store/memo.ts"
  import { goto } from '$app/navigation'

  import text from '$lib/data/words/en.400.txt'

  console.log(text)

  const MAX_ATTEMPTS = 2

  /** @type {import('./$types').PageData} */
  export let data: any;
  export let clear: ()=>void;

  let attempts = 0

  $: words = data.level

  function reset() {
    clear()
    words = shuffle(words)
  }

  function onSucceed() {
    goto(data.url.next)
    memo.set("Success! Next set.")
  }

  function onFail() {
    attempts++
    reset()
    memo.set("Collecting Typo's. Please try again!")
    if(attempts >= MAX_ATTEMPTS) {
      memo.set("Enough data, moving on...")
      attempts = 0
      goto(data.url.next)
    }
  }

  function onReset() {
    reset()
    memo.set("Avoid resetting because the goal is to collect your typos.")
  }

</script>

<h1>Campaign #{data.id}</h1>

<Typer expected={words} {onSucceed} {onFail} bind:clear={clear}/>

<button on:click={onReset}>↺ Reset</button>

<a
on:click={clear}
href={data.url.prev}
>
  Prev: {data.prev}
</a>


<a
on:click={clear}
href={data.url.next}
>
  Next: {data.next}
</a>

