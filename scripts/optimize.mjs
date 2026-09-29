import sharp from "sharp";
import fs from "fs";
const dir = "../raw-images";
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".png")) continue;
  const name = f.replace(".png", "");
  const w = /hero|after|before|aerial|wall/.test(name) ? 2000 : name.startsWith("tex-") ? 700 : 1200;
  await sharp(`${dir}/${f}`).resize({ width: w, withoutEnlargement: true }).webp({ quality: 76 }).toFile(`public/img/${name}.webp`);
}
console.log("done");
