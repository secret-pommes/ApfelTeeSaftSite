import { FastifyRequest } from "fastify";

// mehr brauchste eig net.

export const method = (req: FastifyRequest) => {
  return {
    error: `This resource cant be acceesed with the ${req.method} you used`,
    code: 405,
    originalUrl: req.originalUrl,
  };
};

export const not_found = (req: FastifyRequest) => {
  return {
    message: `Router ${req.method}:${req.originalUrl} not found`,
    error: "Not Found",
    statusCode: 404,
  };
};

export const server_error = (req: FastifyRequest) => {
  return {
    error: "Sorry, server failed to process your request!",
    code: 500,
    originalUrl: req.originalUrl,
  };
};
