import { index, modelOptions, plugin } from "@typegoose/typegoose";
// import { mongooseLeanId } from "./plugins/lean-id";
import * as mongoosePaginate from "mongoose-paginate-v2";

// @plugin(mongooseLeanId)
@plugin(mongoosePaginate)
@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    versionKey: false,
  },
})
@index({ createdAt: -1 })
export class BaseModel {
  createdAt: Date;
  updatedAt: Date;
}
