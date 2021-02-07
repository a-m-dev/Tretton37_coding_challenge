import express from "express";
import cors from "cors";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";

import AppConfig from "./utils/AppConfig";
import Connect from "./utils/MongoConnect";
import Sleep from "./utils/Sleep";

import CorsMiddleware from "./middlewares/cors";
import NoRouteMatch from "./middlewares/noRouteMatch";
import GlobalErrorHandler from "./middlewares/globalErrorHandler";

// app
const app = express();

// handle CORS
app.use(CorsMiddleware);

// set up middlewares
app.use(cors());
app.use(json());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));

// endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hi thereeeeeeeeasdf naklsdnf kljasndfjk l",
  });
});

// error handling
app.use(NoRouteMatch);
app.use(GlobalErrorHandler);

//setting up server
(async function BootUpServer() {
  try {
    await Connect();
    app.listen(AppConfig.PORT, () => {
      console.log(`
        [SERVER]: Tretton Server is Ready on http://localhost:${AppConfig.PORT}
      `);
    });
  } catch (error) {
    console.log(
      "[SERVER:ERROR]: cannot connect to Database and app fails!",
      JSON.stringify(error, null, 2)
    );

    await Sleep(1000);

    console.log("[SERVER:PARACHUTE]: retrying to connect to mongoDB");
    BootUpServer();
  }
})();
