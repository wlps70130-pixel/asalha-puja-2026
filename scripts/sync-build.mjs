import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve("dist");
const assets = resolve("assets");

copyFileSync(resolve(dist, "index.html"), resolve("index.html"));

if (existsSync(assets)) {
  rmSync(assets, { recursive: true, force: true });
}

mkdirSync(assets, { recursive: true });
cpSync(resolve(dist, "assets"), assets, { recursive: true });
