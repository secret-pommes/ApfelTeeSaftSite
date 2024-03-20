import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";

import * as error from "../structs/error";

const api: FastifyPluginAsync = async (app) => {
  app.all("/v2/postMail", (req: FastifyRequest, res: FastifyReply) => {
    if (req.method != "POST") {
      return error.method(req);
    }

    // nix
    res.status(204).send();
  });
};

export default api;