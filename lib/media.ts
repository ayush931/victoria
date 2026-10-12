/** Free stock imagery; see MEDIA-CREDITS.md. These are mood references, not property photographs. */
export const media = {
  goa: '/images/goa-coast-4k.jpg',
  villa: '/images/villa-4k.jpg',
  interior: '/images/interior-4k.jpg',
  film4k: '/videos/coastal-aerial-4k.mp4',
  film: '/videos/coastal-aerial-4k.mp4',
  filmArch: '/videos/architectural-villa-4k.mp4',
  filmVilla: '/videos/luxury-villa-4k.mp4',
};
export function imageSet(src: string) {
  if (src.startsWith('/images/') && src.endsWith('-4k.jpg')) return [640, 960, 1600, 2400, 3840].map(width => `${width === 3840 ? src : src.replace('-4k.jpg', `-${width}.webp`)} ${width}w`).join(', ');
  if (!src.startsWith('https:')) return undefined;
  return [640, 960, 1600, 2400, 3840].map(width => `${src.replace('w=3840', `w=${width}`)} ${width}w`).join(', ');
}
