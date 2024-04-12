import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// function to merge tailwind classes with clsx classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// function to get the id from a given url
export function getIdFromUrl(url: string): string {
  const urlParts = url.split("/").filter(Boolean);
  const id = urlParts[urlParts.length - 1];

  return id;
}

// function to get a range of numbers
export function getRange(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}
