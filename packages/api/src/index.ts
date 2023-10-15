import spotifyClient from "~/helpers/spotifyClient";
import { app } from "~/app";
import { config } from "~/config";

const isDev = config.NODE_ENV === "development";
console.info(!isDev ? "Running in production mode" : "Running in development mode, Skipping Spotify credentials check")

if (isDev) {
    app.listen(config.APP_PORT, () => {
        console.info(`Server listening on port ${config.APP_PORT}`);
    }
    );
} else {
    console.info("Checking Spotify credentials...")
    spotifyClient.checkCredentials().then(() => {
        console.info("Credentials are valid!")
        console.info("Starting server...")
        app.listen(
            app.get("port"),
            () => {
                console.info(`Server started on port ${app.get("port")}!`)
            })
    }).catch((err) => {
        console.error("Credentials are invalid!")
        console.error(err)
    })
}
