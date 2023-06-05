import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { GlobalState} from '~/store/context';
import { globalState, GLOBAL_CONTEXT } from '~/store/context';
import type { TemplateState } from '~/store/template';
import { TEMPLATE_CONTEXT } from '~/store/template';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  // ISSUE: useContextProvider must be declared here, otherwise it will not be able to get the context
  const state = useStore<GlobalState>(globalState)
  const template = useStore<TemplateState>({
    tmps: [],
    currentTmp: null,
  })
  useContextProvider(TEMPLATE_CONTEXT, template)
  useContextProvider(GLOBAL_CONTEXT, state)
  return (
    <div>
      <main class="mx-5 ">
        <Slot />
      </main>
    </div>
  );
});
