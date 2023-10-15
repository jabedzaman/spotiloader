import path from 'path';
import { readdirSync } from 'fs';
import os from 'os';
import { Router } from 'express';
import { RequestHandler, ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export const router = Router();

const isCompiled = path.extname(__filename) === '.js';
const thisFileName = path.basename(__filename);

const loadRoutes = async (dirPath: string, prefix = '/') => {
    readdirSync(dirPath, {
        withFileTypes: true,
    }).forEach(async f => {
        if (f.isFile()) {
            if (f.name == thisFileName) return;

            const isRouteMod = f.name.endsWith(`.routes.${isCompiled ? 'js' : 'ts'}`);
            if (isRouteMod) {
                const route = f.name.replace(`.routes.${isCompiled ? 'js' : 'ts'}`, '');
                const modRoute = path.join(prefix, route);
                console.log('🛰️', 'Loaded', modRoute);
                let mod: {
                    default: RequestHandler<
                        ParamsDictionary,
                        any,
                        any,
                        ParsedQs,
                        Record<string, any>
                    >;
                };

                if (os.type() === 'Windows_NT') {
                    mod = await import('file://' + path.join(dirPath, f.name));
                } else {
                    mod = await import(path.join(baseDir, prefix + f.name));
                }
                router.use(modRoute, mod.default);
            }
        } else if (f.isDirectory()) {
            await loadRoutes(path.resolve(dirPath, f.name), prefix + f.name + '/');
        }
    });
};

let baseDir = path.dirname(__filename);

baseDir = path.resolve(baseDir);

loadRoutes(baseDir);