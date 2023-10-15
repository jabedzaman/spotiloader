import * as zod from 'zod';

// TODO: complete this function

/**
 * Check if its a url or id,
 * if url, check if its from domain open.spotify.com or spotify.com
 * also check if its a playlist or album or track or artist 
 * @param input - url or id
 * @returns - type of input
**/
export const filter = (input: string) => {
    const isUrl = zod.string().url().parse(input);
    if (!isUrl) {
       return input;
    }
    const isSpotifyUrl = zod.string().regex(/^(https:\/\/open.spotify.com\/|https:\/\/spotify.com\/)/).parse(input);
    if (!isSpotifyUrl) {
        return input;
    }  
};
