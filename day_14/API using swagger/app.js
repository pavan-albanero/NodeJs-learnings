const express = require("express");
const app = express();
const path = require("path");
const usersRouter = require("./routes/userRoutes.js");
const authRoute = require("./routes/authRoute.js");
const logger = require("./util/logger.js");
const http = require("http");
const server = http.createServer(app);
const publicdir = path.join(__dirname, "./public");
const io = require("./util/io.js").init(server);
const event = require("./util/event.js").init();
const auth = require("./middleware/auth.js");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

app.use(express.static(publicdir));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", auth, usersRouter);
app.use("/authentication", authRoute);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/authentication/",
      },
      {
        url: "http://localhost:3000/users/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/authRoute.js", "./routes/userRoutes.js"],
};

const specs = swaggerJSDoc(options);
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("disconnect", function () {
    console.log("Made socket disconnected");
  });
});

server.listen(3000);
console.log("running on port 3000");
logger.info("running on port 3000");

process.on("SIGINT", function () {
  logger.info("\nGracefully shutting down from SIGINT (Ctrl-C)");
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit();
});

module.exports = app;
