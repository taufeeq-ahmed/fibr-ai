/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function toKebabCase(text: string): string {
  text = text.toLowerCase();
  text = text.replace(/[^a-z0-9]+/g, '-');
  text = text.replace(/^-+|-+$/g, '');
  return text;
}

export { cn, toKebabCase };
