import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = Document & User;

@Schema({ collection: "users" })
export class User {
  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, required: false })
  updatedAt?: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
