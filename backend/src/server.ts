import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectMongoDB } from "./database/mongodb.js";

const startServer = async () => {
  await connectMongoDB();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
