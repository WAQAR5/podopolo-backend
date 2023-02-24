import httpStatus from "http-status";

const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");

const morgan = require("./config/morgan");
const { jwtStrategy } = require("./config/passport");
const { authLimiter } = require("./middlewares/rateLimiter");
const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { fileParser } = require("express-multipart-file-parser");

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  fileParser({
    rawBodyOptions: {
      limit: "30mb",
    },
    busboyOptions: {
      limits: {
        fields: 50,
      },
    },
  })
);

app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (config.env === "production") {
//   app.use("/v1/auth", authLimiter);
// }

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req: any, res: any, next: any) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
export {};
