<script lang="ts">
  import { SPACE, subStringsMatch } from "$lib/utils.ts"
  import { onMount, afterUpdate } from 'svelte'

  export let expected: string[] = ['']
  export let actuall: string[] = ['']

  let missed: string[] = []

  export let onSucceed = ()=>{}
  export let onFail = ()=>{}

  // Note that typer.value has a leading space.
  // this is done because some devices autoshift/capitalize for empty inputs.
  let typer: HTMLInputElement

  export function focus() {
    typer.setSelectionRange(typer.value.length, typer.value.length)
    setTimeout(()=>{typer.focus()}, 50)
  }

  export function clear() {
    actuall = ['']
    missed = []
    typer.value = SPACE
    focus()
  }

  function completeWord() {
    if(actuall.length >= expected.length) {
      if(missed.length > 0) {
        onFail()
      } else {
        onSucceed()
      }
      clear()
      return
    }
    actuall.push('')
    actuall = actuall
    typer.value = SPACE
  }

  function typoAt(w: number, typo: string) {
    missed[w] = typo
    missed = missed
  }

  function handleInput(e: InputEvent | any) {
    const w = actuall.length - 1
    const val = typer.value.trim()

    if(e.data === SPACE) {
      if(val.length !== expected[w].length) {
        typoAt(w, val)
      }
      completeWord()
      return
    }

    if (!subStringsMatch(val, expected[w],
          actuall[w].length, val.length)) {
      typoAt(w, val)
    }

    actuall[w] = val
  }

  onMount(clear)

  afterUpdate(focus)

</script>


<div
style="
  position: relative;
  line-height: 2em;
  padding: 2em 0.1em;
  font-size: 2rem;
  max-width: 24em;
  margin: auto;
  font-family: monospace;
">

  <input
  id="input-typer"
  bind:this={typer}
  on:input={handleInput}
  on:submit={(e)=>{console.log(e)}}
  placeholder={expected[actuall.length - 1]}
  style="
    opacity: 0;
    position: absolute;
  "/>

  <div
  id="word-box"
  role="textbox"
  tabindex="-1"
  on:keypress={focus}
  on:click={focus}
  style="
    color: gray;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  ">

    {#each expected as word, w}
    {@const active = w+1 == actuall.length}
    <span
    class="word"
    >
      {#each word as letter, l}
      {@const inputLetter = actuall[w] ? actuall[w][l] : undefined}
      <letter
      class:miss={inputLetter && inputLetter !== letter}
      class:hit={inputLetter === letter}
      class:active={active && l == actuall[w]?.length}
      >
        {letter}
      </letter>

      {/each}

      {#if missed[w]}
        <hint>{missed[w]}</hint>
      {/if}
    </span>

    <letter
    class:active={active && actuall[w]?.length >= word.length}
    >&nbsp;</letter>
    {/each}
  </div>


  <div
  id="click-to-continue"
  style="
    pointer-events: none;
    position: absolute;
    margin: auto;
    inset: 0px;
    width: fit-content;
    height: fit-content;
    text-align: center;
    font-size: 1.4rem;
    line-height: 2em;
  ">
    <p>Click to Continue Typing</p>
    <p class="emoji" style="font-size: 4rem;">⌨️</p>
  </div>

</div>


<style>
  #click-to-continue {
    visibility: visible;
    transition: opacity 150ms 1s ease;
  }
  #input-typer:focus ~ #click-to-continue {
    opacity: 0;
    visibility: hidden;
    transition: none;
  }
  #input-typer:not(:focus) ~ #word-box {
    transition: filter 150ms 1s ease;
    filter: blur(.2em);
  }
  .word {
    position: relative;
  }
  .word letter {
    display: inline-block;
  }
  .word hint {
    font-size: 1.4rem;
    display: block;
    position: absolute;
    bottom: -1.2em;
    left: 0;
    right: 0;
    color: #c36;
  }
  .hit {
    color: black;
  }
  .miss {
    color: #c36;
  }
  letter.active {
    background: #8084;
    color: #606;
  }
  letter.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: .2em;
    height: 1em;
    background: #8080 ;
  }
</style>

