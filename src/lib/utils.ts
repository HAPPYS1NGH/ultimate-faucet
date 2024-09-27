import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function spaceAfterCapital(name: string) {
  return name
    .split(/(?=[A-Z])/)
    .map((word, index) => `${word.toUpperCase()} `)
    .join(' ');
}

