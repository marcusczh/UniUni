import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogInScreen from "./LogInScreen";
import { BrowserRouter } from "react-router-dom";
import Store from "../../Store";
import { Provider } from "react-redux";
import axios from "axios";

test("Missing username during log in", () => {
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <LogInScreen />
      </Provider>
    </BrowserRouter>
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const username = screen.getByTestId("username");
  const password = screen.getByTestId("password");
  const login = screen.getByTestId("login");

  userEvent.type(password, "12345");
  userEvent.click(login);
  expect(window.alert).toBeCalledTimes(1);
});

test("Missing password during log in", () => {
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <LogInScreen />
      </Provider>
    </BrowserRouter>
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const username = screen.getByTestId("username");
  const password = screen.getByTestId("password");
  const login = screen.getByTestId("login");

  userEvent.type(username, "123");
  userEvent.click(login);
  expect(window.alert).toBeCalledTimes(1);
});

test("Proper log in", () => {
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <LogInScreen />
      </Provider>
    </BrowserRouter>
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const username = screen.getByTestId("username");
  const password = screen.getByTestId("password");
  const login = screen.getByTestId("login");

  userEvent.type(username, "Test");
  userEvent.type(password, "1234");
  userEvent.click(login);
  expect(window.alert).toBeCalledTimes(0);
});
