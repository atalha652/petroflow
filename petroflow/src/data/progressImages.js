export const progressSiteImages = [
  '/images/arco-ogi.webp',
  '/images/exxon-gas-station-fayetteville-north-260nw-2441726207.webp',
  '/images/images-21.jpg',
]

export function getProgressImage(index) {
  if (!progressSiteImages.length) return null
  const safeIndex = Math.abs(index) % progressSiteImages.length
  return progressSiteImages[safeIndex]
}
