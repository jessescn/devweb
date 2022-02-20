import { render, screen } from "../../jest/utils";
import Header from "../Header";

import reactDom from "react-router-dom";
import { UserStateMockBuilder } from "../../store/__mock__/user-mock-builder";
import { StateMockBuilder } from "../../store/__mock__/state-mock-builder";
import { User } from "../../store/ducks/user";

const mockedUsedLocation = { pathname: "/login" };

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useLocation: () => mockedUsedLocation,
}));

const defaultUseLocationReturn = {
  pathname: "/",
  hash: "",
  search: "",
  state: {},
  key: "",
};

describe("Header", () => {
  beforeAll(() => {
    jest.spyOn(reactDom, "useNavigate").mockReturnValue(jest.fn());
  });

  it("should render Home button when pathname is not home", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeTruthy();
  });

  it("should render Login button when pathname is home and its not logged", () => {
    jest
      .spyOn(reactDom, "useLocation")
      .mockReturnValueOnce(defaultUseLocationReturn);
    render(<Header />);

    expect(screen.getByText("Login")).toBeTruthy();
  });

  it("should render Sair button when user is logged", () => {
    jest
      .spyOn(reactDom, "useLocation")
      .mockReturnValueOnce(defaultUseLocationReturn);

    const userMock: User = { name: "user_test", email: "user@user.com" };
    const userState = new UserStateMockBuilder().withUser(userMock).build();
    const initialState = new StateMockBuilder()
      .withUserState(userState)
      .build();

    render(<Header />, { initialState });

    expect(screen.getByText("Olá, user_test")).toBeTruthy();
    expect(screen.getByText("Sair")).toBeTruthy();
  });
});
