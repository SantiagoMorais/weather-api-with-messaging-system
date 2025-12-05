import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  ObservationStats,
  ObservationStatsSchema,
} from "./observation-stats.schema";
import { Location, LocationSchema } from "./location.schema";
import { Document, HydratedDocument } from "mongoose";

export type WeatherLogDocument = HydratedDocument<WeatherLog>;

@Schema({ collection: "weather_logs", timestamps: true, autoIndex: false })
export class WeatherLog {
  @Prop({ type: String, required: true, unique: true, index: true })
  _id: string;

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
