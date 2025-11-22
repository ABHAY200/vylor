/**
 * Get the correct asset path for images in the public folder
 * This is needed for GitHub Pages deployment with basePath
 */

export function getImagePath(path: string): string {
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  // If no base path, return the original path
  if (!BASE_PATH) {
    return path
  }
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_PATH}/${cleanPath}`
}

