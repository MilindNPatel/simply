import express, { Request, Response, NextFunction} from 'express'

const validate = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = schema.validate(req.body);
      if (error) throw new Error(error);
      next();
    } catch (err) {
      res.status(400).send({
        error: true,
        message: err.message
      });
    }
  };
};

export default validate;
