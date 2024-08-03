import polka from 'polka'
import type { Request, Next } from 'polka';
import type { ServerResponse } from 'http';

export const handler = (req: Request, res: ServerResponse, next: Next) => {
  const app = polka({
    onNoMatch: () => next(),
  })

  return app.handler(req, res)
}