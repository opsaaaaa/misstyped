<script lang="ts">
  import Typer from "$lib/components/Typer.svelte"
  import { memo } from "$lib/store/memo.ts"

  const SPACE = ' '

  const levels: string[] = [
    "the to and of a in I is for that you it on with this was be as are have"
  ]
  
  export let words: string[] = shuffle(levels[0].split(SPACE))

  function shuffle(arr: Array) {
    return arr.sort(()=>((Math.round(Math.random())*2)-1))
  }

  function reset() {
    words = shuffle(levels[0].split(SPACE))
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

