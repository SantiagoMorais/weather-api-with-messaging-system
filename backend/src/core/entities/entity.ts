import { UniqueEntityId } from "./unique-entity-id";

export abstract class Entity<Props> {
  private _id: UniqueEntityId;
  protected props: Props;

  get id() {
    return this._id;
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId();
    this.props = props;
  }

  /**
   * Returns a boolean result if an entity is equal to another
   * based on their structures or their _id's
   * @param entity class Entity
   * @returns boolean
   */
  public equals(entity: Entity<unknown>) {
    if (entity === this) return true;
    if (entity.id.equals(this.id)) return true;
    return false;
  }
}
