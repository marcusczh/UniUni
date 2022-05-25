import { useState } from "react";

function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCfm, setPasswordCfm] = useState("");
  const [basicInfo11, setBasicInfo11] = useState("");
  const [basicInfo1, setBasicInfo1] = useState([]);
  const [basicInfo2, setBasicInfo2] = useState([]);
  const [basicInfo3, setBasicInfo3] = useState([]);

  const basic1 = ["JC", "Poly", "ITE", "NS", "Working", "Overseas"];
  const basic2 = [
    "Healthcare",
    "Engineering",
    "Business",
    "Computing",
    "Arts and Humanities",
    "Law and Policy",
    "Social Sciences",
    "Design and Environment",
    "Mathematics and Science",
  ];
  const basic3 = ["Personal Finance", "Adulting", "Part-time Jobs", "Career"];

  function handleCheckboxChange(data, array, setter) {
    const isChecked = array.some((checkedCheckbox) => checkedCheckbox === data);
    if (isChecked) {
      setter(array.filter((checkedCheckbox) => checkedCheckbox !== data));
    } else {
      setter(array.concat(data));
    }
  }

  function submitSignUp() {
    return [basicInfo11, basicInfo1, basicInfo2, basicInfo3];
  }

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitSignUp();
          }}
        >
          <label for="basic11">Where are you and where have you been?</label>
          <select
            id="basic11"
            placeholder="Where are you now?"
            onChange={(e) => setBasicInfo11(e.target.value)}
          >
            {basic1.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <fieldset>
            <legend>Where have you been?</legend>
            {basic1.map((item) => (
              <>
                <input
                  type="checkbox"
                  name="basic1"
                  value={item}
                  id={item}
                  onChange={(e) =>
                    handleCheckboxChange(item, basicInfo1, setBasicInfo1)
                  }
                />
                <label for={item}>{item}</label>
              </>
            ))}
          </fieldset>
          <div>
            <label for="basic2">
              Which courses do you want to know more about?
            </label>
            {basic2.map((item) => (
              <>
                <input
                  type="checkbox"
                  key={"basic2" + item}
                  value={item}
                  id={item}
                  onChange={(e) =>
                    handleCheckboxChange(item, basicInfo2, setBasicInfo2)
                  }
                />
                <label for={item}>{item}</label>
              </>
            ))}
          </div>
          <div>
            <label for="basic3">Anything else?</label>
            <select
              id="basic3"
              placeholder="Others"
              onChange={(e) => setBasicInfo3(e.target.value)}
            >
              {basic3.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label for="username">Tell us your name!</label>
            <input
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label for="password">Password </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              id="password"
              type="password"
              value={passwordCfm}
              placeholder="Type your password again"
              onChange={(e) => setPasswordCfm(e.target.value)}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignupScreen;
