import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import '@unocss/reset/normalize.css'
import 'virtual:uno.css'

import '~/styles/global.css'

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="google" content="notranslate"></meta>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body lang="en" class="color-[#181818] bg-[#f5f5f5]">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
