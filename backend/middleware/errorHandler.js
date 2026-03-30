// Error handler middleware (must be last in Express)
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: message,
    status: status,
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
