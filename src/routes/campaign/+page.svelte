<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import levels from "$lib/data/en/levels.json"

  const url = $page.url;

  let pageBottom: HTMLElement
  let scrollBox: HTMLDivElement

  let pageNum = Number(url.searchParams.get('page')) || 0
  let perNum = Number(url.searchParams.get('per')) || 40


  let scrollObserver: IntersectionObserver

  $: current = levels.slice(0, pageNum * perNum + perNum)


  function onPageBottomVisible(entities: IntersectionObserverEntry[]) {
    for ( const e of entities ) {
      console.log(e);
      if(e.isIntersecting) {
        pageNum += 1
      }
    }
  }

  onMount(()=>{
    let options = {
      root: document,
      rootMargin: "0px",
      threshold: 0.5,
    };

    scrollObserver = new IntersectionObserver(
      onPageBottomVisible,
      options
    );


    scrollObserver.observe(pageBottom);
  })

</script>

<h1 style="text-align: center;">Typo Campaigns</h1>

<div
bind:this={scrollBox}
id="level-scroll-wraper"
style="
">
  <div
  style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
    margin: 4em 1em;
    line-height: 1.6em;
    font-family: monospace;
  ">
    {#each current as level, idx}
    <a
    class="level-link"
    href={`/campaign/${idx}`}>
      <span style="font-size: 3em;">#{idx}</span>
      <p>{level}</p>
    </a>
    {/each}
  </div>

  <div
  bind:this={pageBottom}
  style="
    height: 40vh
  "></div>

</div>

<style>
  .level-link {
    padding: 2em;
    display: block;
    color: inherit;
    text-decoration: none;
  }
  .level-link:visited {
    color: darkslateblue;
  }
  .level-link:is(:hover, :focus) {
    background: #0622;
    text-decoration: underline;
    color: darkblue;
  }
</style>





