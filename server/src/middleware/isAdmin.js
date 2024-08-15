function isAdmin(req, res, next) {
  if (req.payload && req.payload.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Not authorized. Only admins can perform this action." });
  }
}

export default isAdmin;
