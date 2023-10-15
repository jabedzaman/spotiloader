import spotifyClient from "~/helpers/spotifyClient";

console.info("Checking Spotify credentials...")
spotifyClient.checkCredentials().then(() => {
    console.info("Credentials are valid!")
}).catch((err) => {
    console.error("Credentials are invalid!")
    console.error(err)
})