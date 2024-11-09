import cors, { CorsOptions } from "cors";

// Load environment variables

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      (process.env.ALLOWED_ORIGINS &&
        process.env.ALLOWED_ORIGINS.includes(origin))
    ) {
      // Allow requests from allowed origins or requests with no origin (e.g., server-to-server requests)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent across origins if needed
};

export default cors(corsOptions);
