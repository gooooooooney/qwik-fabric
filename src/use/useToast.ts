import { useContext } from "@builder.io/qwik";
import { TOAST_CONTEXT } from "~/components/ui/Toast/Toast";

export function useToast() {
    return useContext(TOAST_CONTEXT);
}