const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true },
);

export const getImageMetadata = (imagePath: string): ImageMetadata => {
  const path = imagePath.replace(/^~\//, "/src/");
  const metadata = images[path]?.default;
  if (!metadata) {
    throw new Error(`Image not found for path: ${imagePath}`);
  }
  return metadata;
};
