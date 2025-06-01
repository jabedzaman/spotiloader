import { Document } from "mongoose";

export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  DEBUG = "debug",
}

export interface ILog {
  id: string;
  level: LogLevel;
  message: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ILogDoc extends ILog, Document {
  id: string;
}
