
# NOTES

ok So I think this should be different.
How so.

I don't want to just do campaigns.
It should pick the lession/test/campaign smartly.
Its should do that intelegently.




# TODO


## Hack it together Demo
- [x] renders a string in a way I can style each letter.
- [x] basic typing functionality with visuals.
- [x] make the demo presnetable.
- [x] deploy the demo somewhere.
- [x] cleanup code.
- [x] make inputs work better. alias enter to space.

## Make it better
- [x] start on layout
- [x] add message/memo pannel to display "Try again" or "success"
- [x] add levels with different groups of words getting less common.
- [x] Randomize words. I am thinking of using a random sort.

- [ ] make index page for campaign
- [ ] imporove campaign pagination.

- [ ] pick database or storage

- [ ] look at supabase v netlify.
- [ ] https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit

- [ ] fix uppercase phone bug.
- [ ] set the default max_attemtps to 2.
- [ ] create a settings page. max_attempts. font. font-size. linehight. color.
- [ ] create a statistics page between levels.
- [ ] add tooling for displaying word frequencies.
- [ ] plan out pages.
- [ ] add a header and stuff.
- [ ] save the users mistyped words somewhere. Maybe add user account.
- [ ] add training mistyped words ranked by how often you mistype it and the word frequency.
- [ ] add a way to view mistyped words
- [ ] add a export to csv
- [ ] create a function that selects random words while respecting word frequency

- [ ] add a score page with accracy and info/stats about mistypes.


- [ ] Add multi lingual support. Start with spanish.
- [ ] make it look good with css
- [ ] Add some basic functionality to lookup word and thier meaning.
- [ ] add some scrolling behavor?

- [ ] downcase it so that phones don't freakout.

- [ ] get typescript working properly.

# DESIGN


Basically Moneytype but we remeber what you misstyped.
Words, sequences, letters.

Then we can find sequences that you have trouble with.
Those findings can be sorted by frequency.
So that we can fix the most impactful errors first.

This could be adapted to help with spelling.
You feed it thorough audio, text to speach, and then you type it.
Track what you get wrong, and work on fixing it.

ok thats not bad.

# Parts

- typer. a component that you type words in.
    - a hidden input field, we collecte the text/character inserted.
    - a hidden input field that holds the full sting?
    - random word picker.
    - tutorial,
    - miss type recording.
    - slow recording.
    - analizer.

# Plan it out.

Pages things/
- Typer
- Show score
- Navbar
- list mistypes
- 

## Modes

- Campain Mode
- Random mode, word frequency ajusted.
- Custum word mode


# Roadmap to somewhere far away.

- [ ] think about creating a vim extension or writting tool that tracks what you misspell.
- [ ] add a audio reader.
- [ ] and some flashcards and audio settings to drill words for language learning.
- [ ] Add a freedom typing mode, that records what you misspell. instead?

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
