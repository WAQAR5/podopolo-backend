// const mongoose = require("mongoose");
const app = require("./app");

const logger = require("./config/logger");
import "./routes/v1";

let server: any;
// mongoose.set("useFindAndModify", false);
// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//   logger.info("Connected to MongoDB");
server = app.listen(8080, () => {
  logger.info(`Listening to port 8080`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  console.log(
    "🚀 ~ file: index.ts:27 ~ unexpectedErrorHandler ~ error:",
    error
  );
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
