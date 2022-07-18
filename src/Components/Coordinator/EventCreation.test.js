import { render, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import EventCreation from "./EventCreation";
import Coordinator from "./Coordinator";

test("Event Creation", async () => {
  render(
    <BrowserRouter>
      <EventCreation />
      <Coordinator />
    </BrowserRouter>,
    {
      initialState: {
        user: {
          user: {
            bio: "I'm a prospective business student in SMU! I enjoy long walks on the beach and playing sports with my friends.",
            bookmarks: [],
            currentStatus: "NS",
            events: [],
            interests: (4)[
              ("Business",
              "Law and Policy",
              "Mathematics and Science",
              "Personal Finance")
            ],
            password: "1234",
            pastStatus: ["Junior College"],
            profilePicture:
              "http://res.cloudinary.com/dv1ej3tz8/image/upload/v1657785477/Coconut-Free-Download-PNG_zn5pb8.png",
            score: 0,
            teleHandle: "@THusk",
            username: "Thomas Husk",
            __v: 0,
          },
        },
      },
    }
  );
  jest.spyOn(window, "alert").mockImplementation(() => {});
  const title = screen.getByTestId("title");
  const content = screen.getByTestId("content");

  const timepicker = screen.getByTestId("timepicker");
  const location = screen.getByTestId("location");

  userEvent.type(title, "123234");
  userEvent.type(location, "123");
  userEvent.type(content, "123");
  userEvent.click(timepicker);

  const date = screen.getByText("8");
  const time = screen.getByTestId("time");
  const close = screen.getByTestId("close");
  userEvent.click(date);
  userEvent.type(time, "1231pm");
  userEvent.click(close);
  const submit = screen.getByTestId("submit");
  userEvent.click(submit);
  expect(window.alert).toBeCalledTimes(1);
});
