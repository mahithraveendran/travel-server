import { Server } from "http";
import app from "./app";
import { config } from "./app/config";

let server: Server;

async function main() {
  server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}
// run main server
main();

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`😈 unhandled Rejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`😈 uncaught Exception is detected , shutting down ...`, err);

  process.exit(1);
});
