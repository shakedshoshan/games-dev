import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges CSS class names using clsx and tailwind-merge
 * @param {...any} inputs - Any number of class name inputs (strings, objects, or arrays)
 * @returns {string} A merged string of CSS class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
