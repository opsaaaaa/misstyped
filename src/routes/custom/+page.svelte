<script lang="ts">
  import Typer from "$lib/components/Typer.svelte";
  import { NEWLINE, SPACE, shuffle, isBlankString } from "$lib/utils.ts"

  const enum MODE {
    TYPING,
    CUSTOMIZE,
    STATS,
  }

  let mode = MODE.CUSTOMIZE
  let custom: string = 'Anyone who attempts to generate random numbers by deterministic means is, of course, living in a state of sin.'
  let shouldShuffle: boolean = false

  let expected: string[] = []

  let clear: ()=>void


  function tryShuffle() {
    if(shouldShuffle) {
      expected = shuffle(expected)
    }
  }

  function onSubmit() {
    expected = custom.replaceAll(NEWLINE, SPACE).split(SPACE)
    tryShuffle()
    mode = MODE.TYPING
  }

  function onReset() {
    tryShuffle()
    clear()
  }

  function onFail() {
    tryShuffle()
  }

</script>

<div
style="
  padding: 0.1em;
  margin: 2em auto;
  width: fit-content;
">
  {#if mode === MODE.TYPING}

    <Typer {expected} bind:clear={clear} {onFail} />

    <button on:click={onReset}>🔄 Reset</button>
    <button on:click={()=>{mode = MODE.CUSTOMIZE}}>✏️  Edit</button>

  {:else if mode === MODE.CUSTOMIZE}

    <form on:submit|preventDefault={onSubmit}>

      <label style="display: block;">
        <input type="checkbox" bind:checked={shouldShuffle}/>
        <span>Shuffle Words</span>
      </label>

      <label
      class="textarea-box::after textarea-box"
      data-value={custom}
      style="
        font-size: 2rem;
        position: relative;
        display: grid;
        line-height: 2em;
        font-family: monospace;
        text-align: center;
        margin: 2rem 0;
        border: 2px solid currentColor;
        border-radius: 4px;
        padding: .4em;
      ">
        <span style="
          position: absolute;
          font-size: 1rem;
          top: 0;
          left: 1em;
          transform: translateY(-50%);
          line-height: 1em;
          background: white;
        ">Custom Text</span>
        <textarea
        class="zero"
        bind:value={custom}
        placeholder="Insert your custom word list here..."
        ></textarea>
      </label>

      <button disabled={isBlankString(custom)} type="submit">⌨️  Lets Go! ➡</button>
    </form>

  {:else if mode === MODE.STATS}

    <p>TODO: display some states</p>

  {/if}
</div>

<style>
  .textarea-box:is(:hover, :focus-within) {
    outline: 3px solid black;
  }
  .textarea-box textarea {
    outline: none;
  }
  .textarea-box textarea,
  .textarea-box\:\:after::after {
    max-width: 24em;
    width: 100%;
    display: block;
    grid-area: 1 / 2;
    resize: none;
    overflow: hidden;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
  .textarea-box\:\:after::after {
    content: attr(data-value) '';
    visibility: hidden;
    pointer-events: none;
    padding-bottom: 2em;
  }
</style>
