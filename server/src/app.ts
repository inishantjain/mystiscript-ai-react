import {} from "dotenv/config";
import "express-async-errors";
import express from "express";
const app = express();

//Routers
import authRouter from "./routes/authRoute";
import postRouter from "./routes/postRoute";
import promptStoryRouter from "./routes/promptStoryRoute";
//middlewares
import { notFound } from "./middlewares/not-found";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import cookieParser from "cookie-parser";

const CORS_URL = process.env.CORS_URL;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CORS_URL); // Replace '*' with the specific domains want to allow
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    res.sendStatus(204); // No Content for preflight requests
  } else {
    next(); // Continue processing other requests
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); //jwt secret used to sign cookies

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/story", promptStoryRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const run = async () => {
  try {
    app.listen(PORT, () => console.log("Listening on port :", PORT));
  } catch (error) {
    console.error(error);
  }
};

run();
