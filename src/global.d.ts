import { ReturnModelType } from "@typegoose/typegoose/lib/types";
import { PaginateModel } from "mongoose";

declare global {
  export type MongooseModel<T> = ReturnModelType<T> &
    PaginateModel<T & Document>;
}
