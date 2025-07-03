import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (path: string) => {
  if (!path) return '';
  
  // Nếu là URL đầy đủ (http/https), trả về nguyên gốc
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Xử lý đường dẫn local
  return path.startsWith('./') ? path.slice(2) : path;
}
