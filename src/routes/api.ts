import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import { createTransport } from "nodemailer";

import * as error from "../structs/error";

interface MailRequest {
  user: string;
  email: string;
  body: string;
}

let transport = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    method: "XOAUTH2",
    user: "apfelinvoice@gmail.com",
    pass: "fpky pbza meap eqmc",
  },
});

const api: FastifyPluginAsync = async (app) => {
  app.all("/v2/postMail", (req: FastifyRequest, res: FastifyReply) => {
    if (req.method != "POST") {
      return error.method(req, "POST");
    }

    //@ts-ignore - idkf why
    const { user, email, body }: MailRequest = req.body;

    let options = {
      from: `${user} <${email}>`,
      subject: `[EmailSystem - V1.0] ${user} (${email})`,
      text: body,
      html: `<p>${body}</p>`,
    };

    transport.sendMail(options, (err, info) => {
      if (err) {
        return error.server_error(req);
      }

      res.status(204).send();
    });

    // this route only got the replies you see above
    // means this could get REQUEST ABORT in log but idc
  });
};

export default api;
