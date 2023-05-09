import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { routeLoader$ } from '@builder.io/qwik-city';
 
export const useDadJoke = routeLoader$(async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });
  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});


export default component$(() => {
    const dadJokeSignal = useDadJoke();

  return (
    <>
    <p>About</p>
    <p>{dadJokeSignal.value.joke}</p>
    <a href="/">go home</a>
    </>
  );
});

export const head: DocumentHead = {
  title: 'About',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
