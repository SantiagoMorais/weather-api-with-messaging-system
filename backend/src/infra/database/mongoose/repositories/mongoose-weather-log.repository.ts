import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { WeatherLogRepository } from "src/domain/weatherLog/application/repositories/weather-log.repository";
import {
  WeatherLogDocument,
  WeatherLog as WeatherLogSchemaClass,
} from "../schemas/weather-log.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongooseWeatherLogMapper } from "../mappers/mongoose-weather-log.mapper";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { DomainEvents } from "src/core/events/domain-events";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MongooseWeatherLogRepository implements WeatherLogRepository {
  constructor(
    @InjectModel(WeatherLogSchemaClass.name)
    private weatherLogModal: Model<WeatherLogDocument>
  ) {}

  async findById(id: string | number): Promise<WeatherLog | null> {
    const weatherLogDocument = await this.weatherLogModal.findById(id);
    if (!weatherLogDocument) return null;

    const weatherLogEntity =
      MongooseWeatherLogMapper.toDomain(weatherLogDocument);
    return weatherLogEntity;
  }

  async save(weatherLog: WeatherLog): Promise<void> {
    const data = MongooseWeatherLogMapper.toMongoose(weatherLog);
    const id = data._id;

    await this.weatherLogModal.findByIdAndUpdate(new UniqueEntityId(id), data, {
      upsert: true,
      new: true,
      runValidators: true,
    });

    DomainEvents.dispatchEventsForAggregate(weatherLog.id);
  }

  async findManyRecent(amount: number): Promise<WeatherLog[]> {
    const weatherLogDocuments = await this.weatherLogModal
      .find({})
      .sort({ createdAt: -1 })
      .limit(amount)
      .exec();

    const domainWeatherLogs = weatherLogDocuments.map((document) =>
      MongooseWeatherLogMapper.toDomain(document)
    );

    return domainWeatherLogs;
  }

  async findByDate(date: Date): Promise<WeatherLog | null> {
    const weatherLogDocument = await this.weatherLogModal.findOne({
      createdAt: { $eq: date },
    });

    if (!weatherLogDocument) return null;

    const weatherLogEntity =
      MongooseWeatherLogMapper.toDomain(weatherLogDocument);

    return weatherLogEntity;
  }
}
