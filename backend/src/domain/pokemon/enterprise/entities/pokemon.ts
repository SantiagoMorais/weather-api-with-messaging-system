import { Entity } from "src/core/entities/entity";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { IPokemonProps } from "src/core/interfaces/entities/pokemon-props";

export class Pokemon extends Entity<IPokemonProps> {
  get name() {
    return this.props.name;
  }

  get pokemonId() {
    return this.props._id;
  }
  get description() {
    return this.props.description;
  }

  get habitat() {
    return this.props.habitat;
  }

  get height() {
    return this.props.height;
  }

  get weight() {
    return this.props.weight;
  }

  get images() {
    return this.props.images;
  }

  get stats() {
    return this.props.stats;
  }

  get types() {
    return this.props.types;
  }

  get url() {
    return this.props.url;
  }

  static create(props: IPokemonProps, id?: UniqueEntityId) {
    const pokemon = new Pokemon(
      {
        ...props,
      },
      id
    );

    return pokemon;
  }
}
