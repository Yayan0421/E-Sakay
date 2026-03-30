// Request logger middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;
  const ip = req.ip;

  console.log(`[${timestamp}] ${method} ${path} - IP: ${ip}`);

  // Log request body if exists (hide passwords)
  if (req.body && Object.keys(req.body).length > 0) {
    const bodyLog = { ...req.body };
    if (bodyLog.password) {
      bodyLog.password = '***hidden***';
    }
    console.log('  Body:', bodyLog);
  }

  next();
};

module.exports = logger;
