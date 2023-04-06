import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useRef, useState } from "react";
import InputField from "./components/InputField";

function App() {
  // deklarasi useState Hook
  // const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");
  const [qa, setQa] = useState({
    question: "",
    answer: "",
  });
  const [showInputField, setShowInputField] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  //const inputRef = useRef(null);

  const handleInputQuestion = (e) => {
    // setQuestion(e.target.value);
    setQa({ ...qa, question: e.target.value });
  };

  const handleInputAnswer = (e) => {
    //setAnswer(e.target.value);
    setQa({ ...qa, answer: e.target.value });
  };

  const handleKeyDownQuestion = (e) => {
    if (e.key === "Enter" && qa.question != "") {
      setShowInputField(true);
    }
  };

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  useEffect(() => {
    if (qa.answer != "") {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  }, [qa.answer]);

  const handleClick = () => {
    alert(`Question: ${qa.question} \n Answer: ${qa.answer}`);
    // axios
    //   .post("Localhost/api/create/note", qa)
    //   .then((res) => {
    //     console.log(res);
    //     alert(res.message);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="container m-4">
      <div className="row">
        <div className="col-6 mx-auto">
          <form>
            <div className="card p-3 border border border-0">
              <h2 className="text-center px-3 pb-4">Ask & Answer</h2>
              <InputField
                // ref={inputRef}
                placeholder={"Type your question here ..."}
                onInput={handleInputQuestion}
                onKeyDown={handleKeyDownQuestion}
              />
              {showInputField ? (
                <InputField
                  placeholder={"Type your answer here ..."}
                  onInput={handleInputAnswer}
                  // onKeyDown={handleKeyDownAnswer}
                />
              ) : null}
              {showSubmit ? (
                <button className="btn btn-success w-25" onClick={handleClick}>
                  Send
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
