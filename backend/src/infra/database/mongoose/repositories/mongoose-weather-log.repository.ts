import { WeatherLog } from "src/domain/weatherLog/enterprise/entities/weather-log.entity";
import { WeatherLogRepository } from "src/domain/weatherLog/application/repositories/weather-log.repository";
import {
  WeatherLogDocument,
  WeatherLog as WeatherLogSchemaClass,
} from "../schemas/weather-log.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongooseWeatherLogMapper } from "../mappers/mongoose-weather-log.mapper";
import { DomainEvents } from "src/core/events/domain-events";
import { Injectable } from "@nestjs/common";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { ILocation } from "src/core/interfaces/services/open-weather/location";

@Injectable()
export class MongooseWeatherLogRepository implements WeatherLogRepository {
  constructor(
    @InjectModel(WeatherLogSchemaClass.name)
    private weatherLogModal: Model<WeatherLogDocument>
  ) {}

  async findMostRecentByLocation(
    location: ILocation
  ): Promise<WeatherLog | null> {
    const doc = await this.weatherLogModal
      .findOne({
        "location.latitude": location.latitude,
        "location.longitude": location.longitude,
      })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();

    if (!doc) return null;

    return MongooseWeatherLogMapper.toDomain(doc);
  }

  async findByHour(
    date: Date,
    location: ILocation
  ): Promise<WeatherLog | null> {
    const start = new Date(date);
    start.setMinutes(0, 0, 0);

    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    const doc = await this.weatherLogModal
      .findOne({
        createdAt: { $gte: start, $lt: end },
        "location.latitude": location.latitude,
        "location.longitude": location.longitude,
      })
      .exec();

    if (!doc) return null;

    return MongooseWeatherLogMapper.toDomain(doc);
  }

  async findMostRecentLog(): Promise<WeatherLog | null> {
    const mostRecentLog = await this.weatherLogModal
      .findOne()
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();

    if (!mostRecentLog) return null;

    return MongooseWeatherLogMapper.toDomain(mostRecentLog);
  }

  async findById(id: UniqueEntityId): Promise<WeatherLog | null> {
    const weatherLogDocument = await this.weatherLogModal.findOne({
      id: id.toString(),
    });
    if (!weatherLogDocument) return null;

    const weatherLogEntity =
      MongooseWeatherLogMapper.toDomain(weatherLogDocument);
    return weatherLogEntity;
  }

  async save(weatherLog: WeatherLog): Promise<void> {
    const data = MongooseWeatherLogMapper.toMongoose(weatherLog);
    const id = weatherLog.id.toString();

    await this.expirePreviousForecast(data.location);

    await this.weatherLogModal.findOneAndUpdate(
      { id },
      { $set: data },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

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

  async findMostRecent(): Promise<WeatherLog | null> {
    const weatherLogDocument = await this.weatherLogModal
      .findOne({})
      .sort({
        createdAt: -1,
      })
      .exec();

    if (!weatherLogDocument) return null;

    const weatherLogEntity =
      MongooseWeatherLogMapper.toDomain(weatherLogDocument);

    return weatherLogEntity;
  }

  async expirePreviousForecast(location: ILocation): Promise<void> {
    const latestLog = await this.weatherLogModal
      .findOne({
        "location.latitude": location.latitude,
        "location.longitude": location.longitude,
        currentForecastStats: { $exists: true, $not: { $size: 0 } },
      })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();

    if (!latestLog) return;

    await this.weatherLogModal
      .updateOne({ _id: latestLog._id }, { $set: { currentForecastStats: [] } })
      .exec();
  }
}
