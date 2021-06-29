import { SteffyEntity } from "../../src/decorators/entity";

@SteffyEntity('account')
export class Account {
  public username!: string;
}