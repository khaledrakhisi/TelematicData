import { BrowserRouter } from "react-router-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { LoginContextProvider } from "../../store/loginContext";
import LoginBox from "../Login";

describe("Login Functionality", () => {
  /**
   *
   * Simulating Login functionality
   *
   */

  let usernameTextbox: HTMLElement | null = null;
  let passwordTextbox: HTMLElement | null = null;
  let loginButton: HTMLElement | null = null;

  const MockLogin = () => (
    <BrowserRouter>
      <LoginContextProvider>
        <LoginBox />
      </LoginContextProvider>
    </BrowserRouter>
  );

  beforeEach(() => {
    const { getByRole, getByLabelText } = render(<MockLogin />);
    // Step 1: Targeting User name Textbox
    usernameTextbox = getByRole("textbox");

    // Step 2: Targeting Password Textbox
    passwordTextbox = getByLabelText("Password");

    // Step 3: Targeting login Button
    loginButton = getByRole("button");
  });
  afterEach(cleanup);

  test("Login elements existance", () => {
    expect(usernameTextbox).toBeInTheDocument();
    expect(passwordTextbox).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should not login with incorrect authentication", async () => {
    fireEvent.change(usernameTextbox!, { target: { value: "abc" } });
    // value of textbox should be changed
    expect(usernameTextbox?.getAttribute("value")).toBe("abc");

    fireEvent.change(passwordTextbox!, { target: { value: "abc" } });
    // value of textbox should be changed
    expect(passwordTextbox?.getAttribute("value")).toBe("abc");

    fireEvent.click(loginButton!);
    waitFor(() => {
      screen.getByText(/errormessage/i);
    });
    expect(screen.getByText(/errormessage/i)).toBeInTheDocument();
  });
});
