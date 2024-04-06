import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src', 'assets', 'remote-images');
const dstDir = path.join(process.cwd(), 'public', 'remote-images');

const copyRecursive = (src, dst) => {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(s, d);
    } else if (entry.isFile()) {
      fs.copyFileSync(s, d);
    }
  }
};

try {
  copyRecursive(srcDir, dstDir);
  console.log('Synced remote images to public/remote-images');
} catch (e) {
  console.error('Failed syncing remote images', e);
}

