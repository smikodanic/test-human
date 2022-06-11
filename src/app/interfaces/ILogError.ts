/**
 * Error document to be inserted into mongoDB
 */
interface ILogError {
  _id?: string;
  user_id: string;
  user_role: string;
  status: number;
  category: string;
  level: 'error' | 'warning' | 'info' | 'debug';
  message: string;
  stack: string;
  endpoint: string; // POST http://...
  ip: string;
  time: number;
}

export { ILogError };
