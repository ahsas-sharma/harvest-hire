import "dotenv/config";

let CONFIG = {};

if (process.env.NODE_ENV == "development") {
  CONFIG = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: "http://localhost:3000",
    EMAIL_SMTP: {
      MAILSENDER_API_KEY: process.env.MAILSENDER_API_KEY,
      MAILSENDER_EMAIL: process.env.MAILSENDER_EMAIL,
      MAILSENDER_NAME: process.env.MAILSENDER_NAME,
    },
    TWILIO_SMS: {
      ACC_SID: process.env.TWILIO_SID,
      TOKEN: process.env.TWILIO_TOKEN,
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    MONGO_URL: process.env.MONGO_URL,
  };
} else if (process.env.NODE_ENV == "production") {
  CONFIG = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: "https://harvest-hire.onrender.com",
    EMAIL_SMTP: {
      MAILSENDER_API_KEY: process.env.MAILSENDER_API_KEY,
      MAILSENDER_EMAIL: process.env.MAILSENDER_EMAIL,
      MAILSENDER_NAME: process.env.MAILSENDER_NAME,
    },
    TWILIO_SMS: {
      ACC_SID: process.env.TWILIO_SID,
      TOKEN: process.env.TWILIO_TOKEN,
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    MONGO_URL: process.env.MONGO_URL,
  };
}

export default CONFIG;
