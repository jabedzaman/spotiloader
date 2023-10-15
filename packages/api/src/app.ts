import express, { type Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "~/config";
import { router } from "~/routes";
import { protect } from "~/utils/middleware";

export const app: Express = express();

app.use(cors(
    config.NODE_ENV === "production"
        ? {
            origin: "*",
        }
        : {}
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet(
    config.NODE_ENV === "production"
        ? {
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", "data:"],
                },
            },
        }
        : {}
));
app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev"));

app.set("port", config.APP_PORT);
app.set("name", config.APP_NAME);
app.set("url", config.APP_URL);

app.set("trust proxy", true);
app.set("json spaces", 2);

app.use('/api/v1', protect, router);
app.use((_, res) => {
    res.status(404).json({ message: "Not Found" });
})

