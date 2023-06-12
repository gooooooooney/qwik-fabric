import { component$,$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { ImageTransformerProps} from 'qwik-image';
import { useImageProvider } from 'qwik-image';
import ToastProvider from '~/components/ui/Toast/Toast';
import type { AttrState } from '~/store/attr';
import { ATTR_CONTEXT } from '~/store/attr';
import type { GlobalState } from '~/store/context';
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
  const state = useStore<GlobalState>(JSON.parse(JSON.stringify(globalState)), {deep: true})
  const template = useStore<TemplateState>({
    tmps: [],
    currentTmp: null,
  })
  const attrState = useStore<AttrState>({
    shouldShowImage: false,
    shouldShowText: false,
    shouldShowTemplate: false,
    shouldShowShape: false,
    shouldShowColor: false,
  })
  const imageTransformer$ = $(({ src }: ImageTransformerProps): string => {
		return src;
	});

	// Provide your default options
	useImageProvider({
		imageTransformer$,
		resolutions: [1000, 800, 600, 400],
	});
  useContextProvider(TEMPLATE_CONTEXT, template)
  useContextProvider(GLOBAL_CONTEXT, state)
  useContextProvider(ATTR_CONTEXT, attrState)
  return (
    <div>
      <main class="mx-5 ">
      <ToastProvider>
          <Slot />
        </ToastProvider>
      </main>
    </div>
  );
});
