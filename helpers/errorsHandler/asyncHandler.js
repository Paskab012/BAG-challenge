const asyncHandler = callback => async (req, res, next) => {
  try {
    await callback(req, res, next);
  } catch (err) {
    const errStatus = err.statusCode || 500;
    const errMsg = errStatus === 500 ? `Something failed: ${err.message} try again after` : err.message;
    res.status(errStatus).send({
      status: errStatus,
      errors: {
        body: [errMsg]
      }
    });
  }
};
export default asyncHandler;
