import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Location, LocationSchema } from "./location.schema";
import {
  ObservationStats,
  ObservationStatsSchema,
} from "./observation-stats.schema";

export type WeatherLogDocument = HydratedDocument<WeatherLog>;

@Schema({ collection: "weather_logs", timestamps: true, autoIndex: false })
export class WeatherLog {
  @Prop({ type: String, required: true, unique: true })
  id: string; // Unique entity id from Entity. It's different of _id object_id from MongoDB

  @Prop({ type: ObservationStatsSchema, required: true })
  hourlyObservationStats: ObservationStats;

  @Prop({ type: LocationSchema, required: true })
  location: Location;

  @Prop({ type: [ObservationStatsSchema], required: true })
  currentForecastStats: ObservationStats[];

  @Prop({ type: String, required: false, default: null })
  insight: string | null;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, required: false })
  updatedAt?: Date | null;
}

export const WeatherLogSchema = SchemaFactory.createForClass(WeatherLog);
