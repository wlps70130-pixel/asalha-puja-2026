import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

copyFileSync(resolve("src/index.template.html"), resolve("index.html"));
