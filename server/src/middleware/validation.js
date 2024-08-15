import { body, validationResult } from "express-validator";

function registerValidation() {
  return [
    body("name").notEmpty(),
    body("phoneNo").isMobilePhone(),
    body("email").isEmail(),
    body("password").isLength({
      min: 2,
      max: 10,
    }),
    body("govtID").notEmpty(),
  ];
}

function loginValidation() {
  return [
    body("email").isEmail(),
    body("password").isLength({
      min: 2,
      max: 10,
    }),
  ];
}

function handleValidationErrors(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    //no errors
    return next();
  }

  res.status(400).send({ errors: result.array() });
}

export { registerValidation, loginValidation, handleValidationErrors };
