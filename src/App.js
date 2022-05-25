import { Link } from "react-router-dom";

function App() {
  return (
    <>
    Pages
    <nav>
        <Link to="/HomePage">HomePage</Link> |{" "}
        <Link to="/LogIn">LogIn</Link>
    </nav>
    </>
  );
}

export default App;
