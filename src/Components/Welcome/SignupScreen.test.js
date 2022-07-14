import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupScreen from "./SingupScreen";
import { BrowserRouter } from "react-router-dom";

test("Missing username during sign up", () => {
  render(
    <BrowserRouter>
      <SignupScreen />
    </BrowserRouter>
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const username = screen.getByTestId("username");
  const password = screen.getByTestId("password");
  const passwordCfm = screen.getByTestId("passwordCfm");
  const teleHandle = screen.getByTestId("teleHandle");
  const submit = screen.getByTestId("submit");

  userEvent.type(password, "123");
  userEvent.type(passwordCfm, "123");
  userEvent.type(teleHandle, "123");
  userEvent.click(submit);
  expect(window.alert).toBeCalledTimes(1);
});

test("Missing password during sign up", () => {
  render(
    <BrowserRouter>
      <SignupScreen />
    </BrowserRouter>
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const username = screen.getByTestId("username");
  const password = screen.getByTestId("password");
  const passwordCfm = screen.getByTestId("passwordCfm");
  const teleHandle = screen.getByTestId("teleHandle");
  const submit = screen.getByTestId("submit");

  userEvent.type(username, "123");
  userEvent.type(passwordCfm, "123");
  userEvent.type(teleHandle, "123");
  userEvent.click(submit);
  expect(window.alert).toBeCalledTimes(1);
});

test("Missing password confirmation during sign up", () => {
  render(
    <BrowserRouter>
      <SignupScreen />
    </BrowserRouter>
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const username = screen.getByTestId("username");
  const password = screen.getByTestId("password");
  const passwordCfm = screen.getByTestId("passwordCfm");
  const teleHandle = screen.getByTestId("teleHandle");
  const submit = screen.getByTestId("submit");

  userEvent.type(username, "123");
  userEvent.type(password, "123");
  userEvent.type(teleHandle, "123");
  userEvent.click(submit);
  expect(window.alert).toBeCalledTimes(1);
});

test("Missing Telegram handle during sign up", () => {
  render(
    <BrowserRouter>
      <SignupScreen />
    </BrowserRouter>
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const username = screen.getByTestId("username");
  const password = screen.getByTestId("password");
  const passwordCfm = screen.getByTestId("passwordCfm");
  const teleHandle = screen.getByTestId("teleHandle");
  const submit = screen.getByTestId("submit");

  userEvent.type(username, "123");
  userEvent.type(password, "123");
  userEvent.type(passwordCfm, "123");
  userEvent.click(submit);
  expect(window.alert).toBeCalledTimes(1);
});

test("passwords not matching during sign up", () => {
  render(
    <BrowserRouter>
      <SignupScreen />
    </BrowserRouter>
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const username = screen.getByTestId("username");
  const password = screen.getByTestId("password");
  const passwordCfm = screen.getByTestId("passwordCfm");
  const teleHandle = screen.getByTestId("teleHandle");
  const submit = screen.getByTestId("submit");

  userEvent.type(username, "123");
  userEvent.type(password, "123");
  userEvent.type(passwordCfm, "1234");
  userEvent.type(teleHandle, "123");
  userEvent.click(submit);
  expect(window.alert).toBeCalledTimes(1);
});

/* test("Duplicate username during sign up", () => {
  render(
    <BrowserRouter>
      <SignupScreen />
    </BrowserRouter>
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const username = screen.getByTestId("username");
  const password = screen.getByTestId("password");
  const passwordCfm = screen.getByTestId("passwordCfm");
  const teleHandle = screen.getByTestId("teleHandle");
  const submit = screen.getByTestId("submit");

  userEvent.type(username, "123");
  userEvent.type(password, "123");
  userEvent.type(passwordCfm, "123");
  userEvent.type(teleHandle, "123");
  userEvent.click(submit);
  expect(window.alert).toBeCalledTimes(1);
}); */

test("Proper sign up", () => {
  render(
    <BrowserRouter>
      <SignupScreen />
    </BrowserRouter>
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const username = screen.getByTestId("username");
  const password = screen.getByTestId("password");
  const passwordCfm = screen.getByTestId("passwordCfm");
  const teleHandle = screen.getByTestId("teleHandle");
  const submit = screen.getByTestId("submit");

  userEvent.type(username, "123");
  userEvent.type(password, "123");
  userEvent.type(passwordCfm, "123");
  userEvent.type(teleHandle, "123");
  userEvent.click(submit);

  userEvent.type(username, "123");
  userEvent.type(password, "123");
  userEvent.type(passwordCfm, "123");
  userEvent.type(teleHandle, "123");
  userEvent.click(submit);
  expect(window.alert).toBeCalledTimes(0);
});
