<script lang="ts">
  import { memo } from "$lib/store/memo.ts"

  let memos: string[] = []

  memo.subscribe(val=>{
    if (!val || val.length === 0) {return}
    memos.push(val)
    memos = memos
  })

</script>

<div
style="
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1em;
  width: fit-content;
  height: fit-content;
">
  <div
  style="
    padding: .4em .8em;
  ">

    {#each memos as msg}
    <p>{msg}</p>
    {/each}

    <button
    on:click={()=>{memo.set('Hi, Im Memo. Im a robot.')}}
    style="
      font-size: 1.6rem;
      display: inline-block;
      width: min-content;
      margin-top: -2em;
      margin-left: -2em;
    ">
      🤖
    </button>



  </div>
</div>

