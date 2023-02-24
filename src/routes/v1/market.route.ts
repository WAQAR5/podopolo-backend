import express from "express";
import httpStatus from "http-status";

const marketRoute = express.Router();

marketRoute.get("/", [], (req, res) => {
  res.status(httpStatus.OK).send({ message: "Tweet Module" });
});

export default marketRoute;
