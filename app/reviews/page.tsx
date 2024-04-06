import fs from 'fs';
import path from 'path';
import Client from './reviews.client';

export default function ReviewsPage() {
  const imagesDir = path.join(process.cwd(), 'public', 'remote-images', 'reviews');
  let images: string[] = [];
  try {
    if (fs.existsSync(imagesDir)) {
      images = fs
        .readdirSync(imagesDir)
        .filter((f) => /\.(png|jpe?g|svg)$/i.test(f))
        .sort()
        .map((f) => `/remote-images/reviews/${f}`);
    }
  } catch {}
  return <Client images={images} />;
}
