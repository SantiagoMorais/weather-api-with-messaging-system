import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;
export type UserRole = "Role_Admin" | "Role_User";

@Schema({ collection: "users" })
export class User {
  @Prop({ type: String })
  _id: string;

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

  @Prop({ type: [String], default: ["Role_User"] })
  roles: UserRole[];
}

export const UserSchema = SchemaFactory.createForClass(User);
