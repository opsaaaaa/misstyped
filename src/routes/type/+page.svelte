<script lang="ts">

  import { afterUpdate, onMount } from 'svelte'

  let typer

  const SPACE = ' '
  
  export let words: string[] = "the to and of a in I is for that you it on with this was be as are have at he not by but from my or we an your all so his they me if one can will just like about up out what has when more do no were who had it's their there her which time get been would she new people how don't some also them now other I'm its our than good only after first him into know see two make over think any then could back these us want because go well said way".split(SPACE)
  export let missed: Array<string[]> = []
  export let input: string[] = ['']

  let lastSpace = false
  let currentLetter

  function handleInput(e) {
    const newChar = e.target.value
    e.target.value = ''
    if (newChar.length !== 1) { 
      console.log(e)
      return
    }

    const w = input.length - 1
    const l = input[w]?.length

    if (newChar === SPACE) {

      if(input.length === words.length) {
        next()
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

  function reset() {
    input = ['']
    missed = []
    typer.focus()
  }

  function next() {
    reset()
  }

  onMount(()=>{
    typer.focus()
  })

</script>


<h1>Demo</h1>

<input
id="input-typer"
bind:this={typer}
on:input={handleInput}
style="
  opacity: 0;
  height: 0;
  width: 0;
"/>

<div
id="word-box"
on:click={()=>{typer.focus()}}
style="
  color: gray;
  font-size: 2rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: .5em;
  justify-content: center;
  padding: 2em;
  line-hight: 2em;
  font-family: monospace;
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


<button on:click={reset}>↺ Reset</button>


<style>
  .word {
    position: relative;
  }
  .word letter {
    display: inline-block;
  }
  .word hint {
    font-size: 1rem;
    display: block;
    position: absolute;
    bottom: -1em;
    left: 0;
    right: 0;
    color: gray;
  }
  .hit {
    color: black;
  }
  .miss {
    color: red;
  }
  letter.active {
    background: #8086;
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



