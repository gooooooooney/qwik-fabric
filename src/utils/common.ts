import type { ClassValue } from "clsx";
import clsx from "clsx";
import { nanoid } from "nanoid";

export function cx(...args: ClassValue[]) {
  return clsx(args);
}

export function uid() {
  return nanoid();
}

export function downloadFile(data: string, filename: string) {
  const link = document.createElement("a");
  link.href = data;
  link.download = `${uid()}.${filename}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}