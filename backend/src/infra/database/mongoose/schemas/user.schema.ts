import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { TUserRoles } from "src/core/types/user-roles";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: "users" })
export class User {
  @Prop({ type: UniqueEntityId, required: true, unique: true })
  id: UniqueEntityId; // Unique entity id from Entity. It's different of _id object_id from MongoDB

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

  @Prop({ type: [String], default: ["Role_User"], select: false })
  roles: TUserRoles[] = ["Role_User"];
}

export const UserSchema = SchemaFactory.createForClass(User);
