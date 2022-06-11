import { Request, Response, NextFunction } from 'express';

/**
 * GET /api/admin/test
 * Test admin endpoint.
 */
export const adminTest = (req: Request, res: Response, next: NextFunction) => {

  res.json({
    success: true,
    message: 'Admin endpoint works!'
  });

};
