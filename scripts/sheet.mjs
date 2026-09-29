import sharp from "sharp";
import fs from "fs";
const files = fs.readdirSync("public/img").filter((f) => f.endsWith(".webp"));
const W = 300, H = 200, cols = 6;
const rows = Math.ceil(files.length / cols);
const comps = [];
for (let i = 0; i < files.length; i++) {
  const buf = await sharp("public/img/" + files[i]).resize(W, H, { fit: "cover" }).toBuffer();
  const label = Buffer.from(`<svg width="${W}" height="22"><rect width="${W}" height="22" fill="black"/><text x="4" y="16" font-size="14" fill="white">${files[i]}</text></svg>`);
  const x = (i % cols) * W, y = Math.floor(i / cols) * (H + 22);
  comps.push({ input: buf, left: x, top: y }, { input: label, left: x, top: y + H });
}
await sharp({ create: { width: W * cols, height: rows * (H + 22), channels: 3, background: "#222" } })
  .composite(comps).jpeg({ quality: 75 }).toFile(process.argv[2]);
console.log("ok");
