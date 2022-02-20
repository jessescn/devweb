import { State } from "../../store/ducks";
import { UserStateMockBuilder } from "./user-mock-builder";
import { ImageStateMockBuilder } from "./image-mock-builder";

import { State as UserState } from "../ducks/user/index";
import { State as ImageState } from "../ducks/images/index";

export class StateMockBuilder {
  private userState = new UserStateMockBuilder().build();
  private imageState = new ImageStateMockBuilder().build();

  withUserState(value: UserState) {
    this.userState = value;
    return this;
  }

  withImageState(value: ImageState) {
    this.imageState = value;
    return this;
  }

  build(): State {
    return {
      user: this.userState,
      images: this.imageState,
    };
  }
}
