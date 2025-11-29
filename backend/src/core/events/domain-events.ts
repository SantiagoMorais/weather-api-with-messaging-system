import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityId } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";

type DomainEventCallback = (event: unknown) => void;

/**
 * @class DomainEvents
 * @description Global dispatcher responsible for managing and dispatching Domain Events.
 * It ensures events are handled by registered listeners (handlers) and
 * preserves transactional consistency by dispatching only after the Aggregate Root
 * has been successfully processed (saved) by the repository.
 */
export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallback[]> = {};
  private static markedAggregates: AggregateRoot<unknown>[] = [];

  /**
   * @method markAggregateForDispatch
   * @description Marks an Aggregate Root (AR) that has pending events, making it ready for dispatch.
   * This is typically called by the AR's 'addDomainEvent' method.
   * @param aggregate The Aggregate Root instance to mark.
   */
  public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>) {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>) {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      this.dispatch(event)
    );
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<unknown>
  ) {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));

    this.markedAggregates.splice(index, 1);
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityId
  ): AggregateRoot<unknown> | undefined {
    return this.markedAggregates.find((aggregate) => aggregate.id.equals(id));
  }

  /**
   * @method dispatchEventsForAggregate
   * @description Dispatches all pending events for a specific Aggregate Root ID.
   * This method should be called by the Infrastructure layer (Repository)
   * immediately after a successful transaction (e.g., after saving to the database).
   * @param id The UniqueEntityId of the Aggregate Root whose events should be dispatched.
   */
  public static dispatchEventsForAggregate(id: UniqueEntityId) {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  /**
   * @method register
   * @description Registers a handler function to listen for a specific Domain Event class.
   * This is typically called during application startup/initialization.
   * @param callback The function to execute when the event occurs (the Handler).
   * @param eventClassName The name of the Domain Event class (e.g., 'UserCreatedEvent').
   */
  public static register(
    callback: DomainEventCallback,
    eventClassName: string
  ) {
    const wasEventRegisteredBefore = eventClassName in this.handlersMap;

    if (!wasEventRegisteredBefore) {
      this.handlersMap[eventClassName] = [];
    }

    this.handlersMap[eventClassName].push(callback);
  }

  /**
   * @method clearHandlers
   * @description Utility method to clear all registered handlers (mainly for testing purposes).
   */
  public static clearHandlers() {
    this.handlersMap = {};
  }

  /**
   * @method clearMarkedAggregates
   * @description Utility method to clear all marked aggregates (mainly for testing purposes).
   */
  public static clearMarkedAggregates() {
    this.markedAggregates = [];
  }

  private static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name;

    const isEventRegistered = eventClassName in this.handlersMap;

    if (isEventRegistered) {
      const handlers = this.handlersMap[eventClassName];

      for (const handler of handlers) {
        handler(event);
      }
    }
  }
}
