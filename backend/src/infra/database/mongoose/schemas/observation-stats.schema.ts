import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class ObservationStats {
  @Prop({ type: Date, required: true })
  timestamp: Date;

  @Prop({ type: Number, required: true })
  temperature: number;

  @Prop({ type: Boolean, required: true })
  isDay: boolean;

  @Prop({ type: Number, required: true })
  uvIndex: number;

  @Prop({ type: Number, required: true })
  relativeHumidity: number;

  @Prop({ type: Number, required: true })
  apparentTemperature: number;

  @Prop({ type: Number, required: true })
  precipitationProbability: number;

  @Prop({ type: Number, required: true })
  precipitation: number;

  @Prop({ type: Number, required: true })
  rain: number;

  @Prop({ type: Number, required: true })
  cloudCover: number;

  @Prop({ type: Number, required: true })
  visibility: number;

  @Prop({ type: Number, required: true })
  windSpeed: number;

  @Prop({ type: Number, required: true })
  soilTemperature: number;

  @Prop({ type: Number, required: true })
  soilMoisture: number;
}

export const ObservationStatsSchema =
  SchemaFactory.createForClass(ObservationStats);
