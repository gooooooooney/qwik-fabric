import type { ClassValue } from "clsx";
import clsx from "clsx";
import { nanoid } from "nanoid";

export function cx(...args: ClassValue[]) {
  return clsx(args);
}

export function uid() {
  return nanoid();
}