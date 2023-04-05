import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import InputField from "./components/InputField";

function App() {
  // deklarasi useState Hook
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showInputField, setShowInputField] = useState(false);

  const handleInputQuestion = (e) => {
    setQuestion(e.target.value);
    console.log(question);
  };

  const handleInputAnswer = (e) => {
    setAnswer(e.target.value);
    console.log(answer);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && question != "") {
      setShowInputField(!showInputField);
    }
  };

  return (
    <div className="container m-4">
      <div className="row">
        <div className="col-6 mx-auto">
          <form>
            <div className="card p-3 border border border-0">
              <h2 className="text-center px-3 pb-4">Ask & Answer</h2>
              <InputField
                placeholder={"type your question here ..."}
                value={question}
                onInput={handleInputQuestion}
                onKeyDown={handleKeyDown}
              />
              {showInputField ? (
                <InputField value={answer} onInput={handleInputAnswer} />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
