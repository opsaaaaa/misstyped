<script lang="ts">
  import { shuffle, SPACE } from "$lib/utils.ts"
  import Typer from "$lib/components/Typer.svelte"
  import { memo } from "$lib/store/memo.ts"

  export let words: string[] = shuffle(
    "the to and of a in I is for that you it on with this was be as are have".split(SPACE)
  )

  function reset() {
    words = shuffle(words)
  }

  function next() {
    reset()
  }

  function onSucceed() {
    reset()
    memo.set("Success!")
  }

  function onFail() {
    reset()
    memo.set("Try again!")
  }

  function onReset() {
    reset()
    memo.set("Reset")
  }

</script>

<h1>Demo</h1>

<Typer {words} {onSucceed} {onFail} {onReset}/>

