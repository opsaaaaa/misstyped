
# TODO

- [x] renders a string in a way I can style each letter.
- [x] basic typing functionality with visuals.
- [x] make the demo presnetable.
- [ ] deploy the demo somewhere.
- [ ] save the users mistyped words somewhere. Maybe add user account.
- [ ] add training mistyped words ranked by how often you mistype it and the word frequency.
- [ ] add a way to view mistyped words

- [ ] add levels with different groups of words getting less common.
- [ ] add a score page with accracy and info/stats about mistypes.

- [ ] Add multi lingual support. Start with spanish.
- [ ] make it look good with css
- [ ] Add some basic functionality to lookup word and thier meaning.
- [ ] add some scrolling behavor?

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
