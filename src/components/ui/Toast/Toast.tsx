import type { QRL } from "@builder.io/qwik";
import { Slot, component$, $, createContextId, useContextProvider, useSignal } from "@builder.io/qwik";
import { CONTEXT_IDS } from "~/constants/enum";
import { cx, uid } from "~/utils/common";
enum ToastPosition {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  CENTER_TOP = 'center-top',
  CENTER_BOTTOM = 'center-bottom',
}

export interface Toast {
  id: string;
  message: string;
  duration: number;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-top" | "center-bottom";
  visible: boolean;
}

interface ToastContextProps {
  toast: QRL<(options: Partial<Toast>) => void>;
}

export const TOAST_CONTEXT = createContextId<ToastContextProps>(CONTEXT_IDS.TOAST_CONTEXT);

const ToastProvider = component$(() => {

  const toasts = useSignal<Toast[]>([]);
  const hideToast = $((id: string) => {
    toasts.value = toasts.value.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast));

    setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id);
    }, 500);
  });

  const toast = $((options: Partial<Toast>) => {
    const newToast: Toast = {
      id: uid(),
      message: '',
      duration: 3000,
      position: ToastPosition.CENTER_TOP,
      visible: true,
      ...options,
    };
    toasts.value = [...toasts.value, newToast]
    setTimeout(() => {
      hideToast(newToast.id);
    }, newToast.duration);
  });

  useContextProvider(TOAST_CONTEXT, { toast })


  const ToastComponent = () => (
    <div class="fixed inset-0 top-4 left-4 right-4 bottom-4 flex items-end justify-center  pointer-events-none  sm:items-start sm:justify-end">
      {toasts.value.map((toast) => (
        <div
          key={toast.id}
          class={cx(
            'absolute',
            'bg-gray-800',
            'text-white',
            'px-4',
            'py-2',
            'rounded',
            'shadow',
            'transition-opacity',
            'duration-500',
            'ease-in-out',
            {
              'bottom-0': toast.position.includes('bottom'),
              'top-0': toast.position.includes('top'),
              'left-0': toast.position.includes('left'),
              'right-0': toast.position.includes('right'),
              'top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-full': toast.position === 'center-top',
              'bottom-1/5 left-1/2 transform -translate-x-1/2 translate-y-full': toast.position === 'center-bottom',
              'opacity-0': !toast.visible,
              'opacity-100': toast.visible,
            }
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Slot />
      <ToastComponent />
    </>
  );
});

export default ToastProvider;
