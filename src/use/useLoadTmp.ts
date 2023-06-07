import { environment } from "~/store/db"
import {$} from '@builder.io/qwik'
import { useTemplateCtx } from "./useTemplateCtx"

export function useLoadTmp() {
  const tmpState = useTemplateCtx()
  const loadTmpFromDb = $(() => {
    environment.loadCanvas().then(res => {
      if (res.length) {
        tmpState.tmps = res
      }
    })
  })
  return loadTmpFromDb
}