import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityId } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { vi } from "vitest";
import { DomainEvents } from "./domain-events";

class CustomAggregateCreated implements DomainEvent {
  public occurredAt: Date;
  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.occurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe("Domain events", () => {
  it("should be able to dispatch and listen to events", () => {
    const callbackSpy = vi.fn();

    // Register
    // Subscriber/Handler registered (listening the "custom aggregate created" event)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // Production
    // Creating the aggregate root, but not saving it into the db yet
    const aggregate = CustomAggregate.create();

    expect(aggregate.domainEvents).toHaveLength(1);

    // Dispatch
    // Saving the CustomAggregate on db, then firing the event to the aggregates
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // The subscriber/handler listen to the event and do what is need it with the data
    expect(callbackSpy).toHaveBeenCalled();

    // Cleaner
    // The events list has been clear after the event being fired.
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
