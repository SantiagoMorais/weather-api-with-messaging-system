import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class Location {
  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: String, required: true })
  timezone: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
