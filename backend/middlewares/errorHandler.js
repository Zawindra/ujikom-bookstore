export function errorHandler(err, req, res, next) {
  console.error(err);
  // If Zod validation error, return detail
  if (err?.issues) {
    return res.status(400).json({ message: "Validation error", errors: err.issues });
  }
  res.status(500).json({ message: err.message || "Internal server error" });
}
