import fastify from "fastify";

import * as log from "./structs/log";

const app = fastify({ logger: false });

const port = 80;
app.listen({ host: "0.0.0.0", port }, () => {
  log.Info(`Server started listneing in port ${port}`);
});

app.register(import("./routes/api"), { prefix: "/api" });
app.register(import("./routes/assets"), { prefix: "/assets" });
app.register(import("./routes/pages"), { prefix: "/" });
