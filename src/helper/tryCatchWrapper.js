const tryCatchWrapper = (asyncExpressFunc) => {
  return async (req, res, next) => {
      try {
          await asyncExpressFunc(req, res, next)
      } catch (error) {
          res.status(400).json({error})
      }
  }
};

module.exports = tryCatchWrapper;
