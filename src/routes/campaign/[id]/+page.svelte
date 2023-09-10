<script lang="ts">
  import { onMount } from "svelte"
  import { shuffle, SPACE } from "$lib/utils.ts"
  import Typer from "$lib/components/Typer.svelte"
  import { memo } from "$lib/store/memo.ts"
  import { goto } from '$app/navigation';

  const MAX_ATTEMPTS = 3

  /** @type {import('./$types').PageData} */
  export let data;
  export let clear;

  let attempts = 0

  $: words = data.level

  function reset() {
    clear()
    words = shuffle(words)
    memo.set("Avoid reseting, the purpose is to collect typos.")
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
    memo.set("Reset")
  }

</script>

<h1>Campaign</h1>

<Typer {words} {onSucceed} {onFail} bind:clear={clear}/>

<button on:click={reset}>↺ Reset</button>

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

