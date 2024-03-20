import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import path from "path";
import fs from "fs";

import * as error from "../structs/error";

const pages: FastifyPluginAsync = async (app) => {
  app.get("/", (req, res) => {
    res.type("text/html");
    res.send(fs.readFileSync(path.join(__dirname, "../../public/index.html")));
  });

  // dot delete will break the server
  app.get("/arisa", (req, res) => {
    return `arisa's backend\n\nWritten by: not_secret1337 in typescript using fastify!\nReleased: 20/03/2024\n\n\n\ngot you some server stats btw: \n\n-Time: ${new Date().toISOString()}\n-Uptime: ${
      process.uptime
    }\n-System is running on: ${process.platform}`;
  });
};

export default pages;
