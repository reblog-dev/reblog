import { Collections } from "@/constants/database.constant";
import { BaseModel } from "@/shared/models/base.model";
import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  options: {
    customName: Collections.Articles,
  },
})
export class ArticleModel extends BaseModel {
  @prop({ required: true, trim: true, unique: true })
  slug: string;

  @prop({ required: true })
  title: string;

  @prop()
  description?: string;

  @prop()
  aiSummary?: string;

  @prop({ required: true })
  content: string;
}
