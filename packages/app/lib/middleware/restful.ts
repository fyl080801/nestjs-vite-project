import { ServerResponse } from 'http';
import { AppConfig } from '../types';

const splitPath = (prefix: string, path: string) => {
  const regex = new RegExp(
      '^/' + prefix + '/?([^/]+)?/?([^/]+)?/?([^/]+)?/?([^/]+)?$',
    ),
    match = path.match(regex),
    rest_params = [];

  if (match) {
    for (let i = 1; i < match.length; i++) {
      if (typeof match[i] !== 'undefined') {
        rest_params.push(match[i]);
      }
    }
  }

  return rest_params;
};

export const modelRestful =
  (config?: AppConfig) => (req: any, res: ServerResponse, next: () => void) => {
    const match = splitPath(
      config?.openapiPrefix || 'openapi',
      req.originalUrl,
    );

    console.log(match);

    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify({ success: true, url: req.originalUrl }));
    res.end();
    next();
  };
