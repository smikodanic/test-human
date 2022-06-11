import { Request, Response, NextFunction } from 'express';

/**
 * GET /api/customer/test
 * Test customer endpoint.
 */
export const customerTest = (req: Request, res: Response, next: NextFunction) => {

  res.json({
    success: true,
    message: 'Customer endpoint works!'
  });

};
