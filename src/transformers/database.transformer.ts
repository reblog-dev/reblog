import {
  DATABASE_CONNECTION_TOKEN,
  DATABASE_MODEL_TOKEN_SUFFIX,
} from "@/constants/database.constant";
import { Inject, Provider } from "@nestjs/common";
import { getModelForClass } from "@typegoose/typegoose";
import { Connection } from "mongoose";

export interface TypegooseClass {
  new (...args: any[]);
}

export function getModelToken(modelName: string) {
  return modelName + DATABASE_MODEL_TOKEN_SUFFIX;
}

export function getProviderByModel(model: TypegooseClass): Provider {
  return {
    provide: getModelToken(model.name),
    useFactory: (connection: Connection) => {
      return getModelForClass(model, { existingConnection: connection });
    },
    inject: [DATABASE_CONNECTION_TOKEN],
  };
}

export function InjectModel(model: TypegooseClass) {
  return Inject(getModelToken(model.name));
}
