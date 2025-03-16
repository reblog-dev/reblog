/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/**
 * @copy from mongoose-lean-id (edited)
 */
import { Schema, Document, Types } from "mongoose";

interface MongooseQuery {
  _mongooseOptions: {
    lean?: boolean;
  };
}

type PossibleResults = Document | Document[] | null | undefined;

export function mongooseLeanId(schema: Schema) {
  schema.post("find", attachId);
  schema.post("findOne", attachId);
  schema.post("findOneAndUpdate", attachId);
  schema.post("findOneAndReplace", attachId);
  schema.post("findOneAndDelete", attachId);
}

function attachId(this: MongooseQuery, res: PossibleResults) {
  if (res == null) {
    return;
  }

  const replaceId = (obj: any) => {
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        if (item == null || isObjectId(item)) return;
        replaceId(item);
      });
      return;
    }

    if (isObjectId(obj)) return;

    if (obj._id != null && Types.ObjectId.isValid(obj._id)) {
      obj.id = obj._id.toString();
    }

    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (Array.isArray(val)) {
        val.forEach((item) => replaceId(item));
      } else if (val != null && typeof val === "object") {
        replaceId(val);
      }
    }
  };

  if (this._mongooseOptions.lean) {
    replaceId(res);
  }
}

function isObjectId(v: any): v is Types.ObjectId {
  return v?._bsontype === "ObjectId" && v instanceof Types.ObjectId;
}
