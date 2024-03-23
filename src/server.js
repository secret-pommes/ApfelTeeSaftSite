import fastify from "fastify";
import path from "path";
import fs from "fs";

const app = fastify({ logger: false });
const port = 80;

app.listen({ host: "0.0.0.0", port }, () => {
  console.log(`[Server] Fastify started listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.type("text/html");
  res.send(fs.readFileSync(path.join(process.cwd(), "public/index.html")));
});

app.get("/contact", (req, res) => {
  res.type("text/html");
  res.send(fs.readFileSync(path.join(process.cwd(), "public/contact.html")));
});

app.get("/assets/:type/:file", (req, res) => {
  const location = path.join(
    process.cwd(),
    `public/assets/${req.params.type}/${req.params.file}`
  );

  if (fs.existsSync(location)) {
    return res
      .type(`text/${req.params.file.split(".")[1]}`)
      .send(fs.readFileSync(location));
  }

  res.status(404).send({
    message: `Route ${req.method}:${req.originalUrl} not found`,
    error: "Not Found",
    statusCode: 404,
  });
});
