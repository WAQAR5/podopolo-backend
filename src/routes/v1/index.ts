import authRoute from "./auth.route";
import tweetRoute from "./tweet.route";

const express = require("express");

const config = require("../../config/config");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/tweet",
    route: tweetRoute,
  },
];

const devRoutes = [];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route: any) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
