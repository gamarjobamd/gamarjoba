/* Gamarjoba — локальный предпросмотр, повторяющий маршрутизацию Cloudflare Pages.

   Обычный статический сервер отдаёт 404 на /menu и /dish, потому что не знает
   про «чистые» адреса. Здесь та же логика, что у Pages: сначала файл как есть,
   потом <путь>.html, потом <путь>/index.html; если ничего не нашлось — 404.html.

   Запуск:  node tools/serve.mjs        (порт 4173, либо из переменной PORT) */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, join, normalize } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT) || 4173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

const isFile = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

/* порядок разрешения адреса — как у Cloudflare Pages */
async function resolve(pathname) {
  const rel = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const base = join(ROOT, rel);
  for (const candidate of [base, `${base}.html`, join(base, "index.html")]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${PORT}`);
  const file = await resolve(pathname === "/" ? "/index.html" : pathname);
  const send = async (code, path) => {
    const body = await readFile(path);
    res.writeHead(code, {
      "Content-Type": TYPES[extname(path)] || "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": "no-store",
    });
    res.end(req.method === "HEAD" ? undefined : body);
  };
  if (file) return send(200, file);
  const notFound = join(ROOT, "404.html");
  if (await isFile(notFound)) return send(404, notFound);
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("404");
}).listen(PORT, "127.0.0.1", () => {
  console.log(`Gamarjoba: http://localhost:${PORT}`);
});
