import { State, initialState, User } from "../ducks/user";

export class UserStateMockBuilder {
  private user: User = initialState.user;

  withUser(value: User) {
    this.user = value;
    return this;
  }

  build(): State {
    return { ...initialState, user: this.user };
  }
}
