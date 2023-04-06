import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InputField from "./components/InputField";

function App() {
  // deklarasi useState Hook
  // const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);
  const [qa, setQa] = useState({
    question: "",
    note: "",
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
    setQa({ ...qa, note: e.target.value });
  };

  const handleKeyDownQuestion = (e) => {
    if (e.key === "Enter" && qa.question != "") {
      e.preventDefault();
      setShowInputField(true);
    }
  };

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  useEffect(() => {
    if (qa.note) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  }, [qa.note]);

  const handleSubmit = (e) => {
    //alert(`Question: ${qa.question} \n Answer: ${qa.answer}`);
    e.preventDefault();
    axios
      .post("http://192.168.1.60:5000/api/create/note", qa)
      .then((res) => {
        console.log(res);
        //alert("Note berhasil disimpen nih bang");
        alert(res.data.message);
        //toast(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container m-4">
      <div className="row">
        <div className="col-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="card p-3 border border border-0">
              <h2 className="text-center px-3 pb-4">Ask & Answer</h2>
              <InputField
                //ref={inputRef}
                placeholder={"Type your question here ..."}
                onChange={handleInputQuestion}
                onKeyDown={handleKeyDownQuestion}
                style={{ maxHeight: "200px", resize: "none" }}
                className="form-control mb-3 p-3"
                rows="1"
                onLoad={handleLoad}
              />
              {showInputField ? (
                <InputField
                  placeholder={"Type your answer here ..."}
                  onChange={handleInputAnswer}
                  // onKeyDown={handleKeyDownAnswer}
                  style={{ maxHeight: "200px", resize: "none" }}
                  className="form-control mb-3 p-3"
                  rows="1"
                  // ref={inputRef}
                />
              ) : null}
              {showSubmit ? (
                <input
                  className="btn btn-success w-25 p-2"
                  type="submit"
                  value="Send"
                />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
