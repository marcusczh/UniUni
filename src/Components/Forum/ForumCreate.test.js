import { render, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ForumCreation from "./ForumCreation";
import Forum from "./Forum";

test("Forum Creation", async () => {
  render(
    <BrowserRouter>
      <ForumCreation />
      <Forum />
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
  const submit = screen.getByTestId("submit");

  userEvent.type(title, "123234");
  userEvent.type(content, "123");
  userEvent.click(submit);
  expect(window.alert).toBeCalledTimes(1);
});
