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

function truncateText(desc:string, maxLength:number) {
  if (desc.length <= maxLength) {
    return desc;
  }
  return `${desc.substring(0, maxLength)}...`;
}

export { cn, toKebabCase, truncateText };
