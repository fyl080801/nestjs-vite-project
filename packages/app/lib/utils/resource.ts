import { IncomingMessage } from 'http';
import { parse } from 'querystring';

const getRequestBody = async (req: IncomingMessage) => {
  const contentType = req.headers['content-type'] || '';

  return new Promise((resolve, reject) => {
    req.on('data', (data) => {
      try {
        if (contentType.includes('application/json')) {
          resolve(JSON.parse(data.toString()));
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
          resolve(parse(data.toString()));
        }
        // else if (contentType.includes('multipart/form-data')) {
        //   // 暂不支持文件提交
        // }
        else {
          resolve(data.toString());
        }
      } catch (ex) {
        reject(ex);
      }
    });
  });
};

export const handleResourceIndex = async (req: any, model: any) => {
  const where = !!req.query ? { where: req.query } : {};
  return await model.findAll(where);
};

export const handleResourceDescribe = async (req: any, model: any) => {
  return {
    name: model.name,
    tableName: model.tableName,
    attributes: model.rawAttributes,
  };
};

export const handleResourceCreate = async (
  req: IncomingMessage,
  model: any,
) => {
  const data = await getRequestBody(req);
  return await model.create(data);
};
