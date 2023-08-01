import { Request } from 'express';

export const getInfoFromReq = (req: Request) => {
  const { method, originalUrl: url, body, query, params, ip } = req;
  return {
    method,
    url,
    body,
    query,
    params,
    ip,
  };
};
