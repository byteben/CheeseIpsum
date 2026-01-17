import { app } from "@azure/functions";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateText } from "../../../shared/generator-core.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// cheese.json at repo root (single source of truth)
const WORDS_PATH = path.resolve(__dirname, "../../../cheese.json");

let wordsCache = null;
async function loadWords() {
  if (wordsCache) return wordsCache;
  wordsCache = JSON.parse(await fs.readFile(WORDS_PATH, "utf8"));
  return wordsCache;
}

app.http("generate", {
  route: "generate",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (req) => {
    const words = await loadWords();

    const mode = (req.query.get("mode") ?? "cheeselatin").toLowerCase();
    const countRaw = req.query.get("count") ?? "25";
    const count = Math.max(1, Math.min(50, parseInt(countRaw, 10) || 25));

    const text = generateText(words, { mode, count });

    return {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        // tighten later to https://cheeseipsum.com
        "access-control-allow-origin": "*"
      },
      jsonBody: { mode, count, text }
    };
  }
});