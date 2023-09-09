<script lang="ts">
  import { onMount } from 'svelte'

  const SPACE = ' '
  const NEWLINE = "\n"

  export let words: string[]

  export let missed: Array<string[]> = []
  export let input: string[] = ['']

  export let onSucceed = ()=>{}
  export let onFail = ()=>{}
  export let onReset = ()=>{}

  let typer
  let lastSpace = false

  export function clear() {
    input = ['']
    missed = []
    typer.focus()
  }

  function reset() {
    clear()
    onReset()
  }

  function handleInput(e) {
    // TODO: think about using e.data instead,
    // think about the inputType and what Im suporting
    // there is a bug on phone keyboard where every character is capital
    // because its always a empty line.
    let newChar = e.target.value
    e.target.value = ''

    if (newChar === NEWLINE) {
      newChar = SPACE
    }

    if (newChar.length !== 1) { 
      return
    }
    const w = input.length - 1
    const l = input[w]?.length

    if (newChar === SPACE) {

      if(input.length === words.length) {
        if(missed.length > 0) {
          onFail()
        } else {
          onSucceed()
        }
        clear()
        return
      }

      if(lastSpace) {
        return
      }
      lastSpace = true
      if(!missed[w] && input[w].length < words[w].length) {
        addMissed(w, words[w][l], SPACE)
        console.log(missed)
      }

      input[input.length] = ''

      return
    }
    lastSpace = false

    input[w] += newChar

    if (w < 0 || l === undefined ) { return }

    const targetChar = words[w][l]
    
    if (newChar === targetChar) {return}

    addMissed(w, targetChar, newChar)
  }

  function addMissed(w, targetChar, newChar) {
    if(missed[w]) {
      missed[w][1] = input[w]
      missed[w][2] += targetChar
      missed[w][3] += newChar
    } else {
      missed[w] = [words[w], input[w], targetChar, newChar]
    }
  }


  onMount(()=>{
    typer.focus()
  })

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

  <textarea
  id="input-typer"
  bind:this={typer}
  on:input={handleInput}
  on:submit={(e)=>{console.log(e)}}
  style="
    opacity: 0;
    position: absolute;
  "></textarea>

  <div
  id="word-box"
  on:click={()=>{typer.focus()}}
  style="
    color: gray;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  ">

    {#each words as word, w}
    {@const active = w+1 == input.length}
    <span
    class="word"
    >
      {#each word as letter, l}
      {@const inputLetter = input[w] ? input[w][l] : undefined}
      <letter
      class:miss={inputLetter && inputLetter !== letter}
      class:hit={inputLetter === letter}
      class:active={active && l == input[w]?.length}
      >
        {letter}
      </letter>

      {/each}

      {#if missed[w]}
        <hint>{missed[w][1]}</hint>
      {/if}
    </span>

    <letter
    class:active={active && input[w]?.length >= word.length}
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
    <p style="margin: 0">Click to Continue Typing</p>
    <p style="font-size: 6rem; margin: 0;">⌨️</p>
  </div>

</div>

<button on:click={reset}>↺ Reset</button>


<style>
  #click-to-continue {
    visiblity: visible;
    transition: opacity 150ms 1s ease;
  }
  #input-typer:focus ~ #click-to-continue {
    opacity: 0;
    visiblity: hidden;
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



