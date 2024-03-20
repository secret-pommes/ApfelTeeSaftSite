import { FastifyRequest } from "fastify";

// mehr brauchste eig net.

export const method = (req: FastifyRequest, expected: string) => {
  return {
    message: `Route ${expected}:/${req.originalUrl} cant be accessed with the method ${req.method}.`,
    error: "Wrong Method",
    statusCode: 405,
  };
};

export const not_found = (req: FastifyRequest) => {
  return {
    message: `Route ${req.method}:${req.originalUrl} not found`,
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
