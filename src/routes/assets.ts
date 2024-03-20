import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import path from "path";
import fs from "fs";

import * as error from "../structs/error";

const assets: FastifyPluginAsync = async (app) => {
  app.get("/:type/:resource", (req: FastifyRequest, res: FastifyReply) => {
    const file = path.join(
      __dirname,
      `../../public/assets/${(req.params as { type: string })?.type}/${
        (req.params as { resource: string })?.resource
      }`
    );

    if (fs.existsSync(file)) {
      return res
        .type("text/" + (req.params as { resource: string })?.resource.split(".")[1])
        .send(fs.readFileSync(file));
    } else {
      return error.not_found(req);
    }
  });
};

// weird geht nur so aber who cares
export default assets;
