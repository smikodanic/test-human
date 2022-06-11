import { Request, Response as IResponse, NextFunction as INext } from 'express';

interface IRequest extends Request {
  client: any;
}

export { IRequest, IResponse, INext };
