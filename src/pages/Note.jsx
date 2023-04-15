import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../components/InputField";
import "bootstrap-icons/font/bootstrap-icons.css";
// import ReactModal from "react-modal";

const Note = () => {
  // deklarasi useState Hook
  const [qa, setQa] = useState({
    question: "",
    note: "",
  });
  const [showInputField, setShowInputField] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [dataNote, setDataNote] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);
  // const [update, setUpdate] = useState({
  //   question: "",
  //   note: "",
  // });
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // deklarasi useNavigate hook
  const navigate = useNavigate();

  const handleInputQuestion = (e) => {
    setQa({ ...qa, question: e.target.value });
  };

  const handleInputAnswer = (e) => {
    setQa({ ...qa, note: e.target.value });
  };

  const handleKeyDownQuestion = (e) => {
    if (qa.question != "" && e.key === "Enter") {
      e.preventDefault();
      setShowInputField(true);
    } else if (qa.question == "" && e.key === "Enter") {
      e.preventDefault();
      setShowInputField(false);
      toast.warning("Please input your question!");
    }
  };

  const handleKeyDownAnswer = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleClick = (id) => {
    setClickedItemId(id);
    //setShowDelete(true);
  };

  // nge-delete data
  const handleDelete = (id) => {
    const confirmation = window.confirm("Do you really want to delete?");
    if (confirmation) {
      axios
        // .delete(`http://localhost:8080/notes/${id}`)
        .delete(`http://192.168.43.81:5000/api/noteApp/delete/note/${id}`)
        .then((res) => {
          console.log(res);
          toast.success("The data is successed to delete!");
          setDataNote(dataNote.filter((item) => item.idNote !== id));
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error("The data is filed to delete!");
        });
    }
  };

  // nge-get data dari sever
  useEffect(() => {
    document.title = "Question & Answer";
    axios
      .get("http://192.168.43.81:5000/api/noteApp/read/notes")
      // .get("http://localhost:8080/notes")
      .then((res) => {
        console.log(res);
        setDataNote(res.data.data);
        // setDataNote(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // nge-post data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://192.168.43.81:5000/api/noteApp/create/note", qa)
      // post("http://localhost:8080/notes", qa)
      .then((res) => {
        console.log(res);
        // setDataNote([...dataNote, res.data]);
        setDataNote([...dataNote, res.data.data]);
        toast.success("Note berhasil disimpen nih bang");
        //toast.success(res.data.message);
        setQa({ ...qa, question: "" });
        setShowInputField(false);
        setShowSubmit(false);
      })
      .catch((err) => console.log(err));
  };

  // handle submit button
  useEffect(() => {
    if (qa.note) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  }, [qa.note]);

  // handle edit
  // const handleUpdate = (id) => {
  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:8080/notes/${id}`)
  //       .then((res) => {
  //         console.log(res);
  //         setUpdate(res.data);
  //         setIsModalOpen(true);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }, [id]);
  // };

  // const handleUpdate = (id) => {
  //   axios
  //     .put(`http://localhost:8080/notes/${id}`, update)
  //     .than((res) => {
  //       console.log(res);
  //       toast.success("Data is successed to be update!");
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className="container">
      <div className="row m-5">
        <div className="col-5">
          <ToastContainer />
          <form onSubmit={handleSubmit} className="sticky-top">
            <div className="card p-3 border border border-0">
              <h2 className="text-center px-3 pb-4">Ask & Answer</h2>
              <InputField
                placeholder={"Type your question here ..."}
                onChange={handleInputQuestion}
                onKeyDown={handleKeyDownQuestion}
                style={{
                  resize: "none",
                  overflow: "hidden",
                }}
                className="form-control mb-3 p-3"
                rows="1"
                value={qa.question}
              />

              {showInputField ? (
                <InputField
                  placeholder={"Type your answer here ..."}
                  onChange={handleInputAnswer}
                  onKeyDown={handleKeyDownAnswer}
                  style={{ maxHeight: "200px", resize: "none" }}
                  className="form-control mb-3 p-3"
                  rows="1"
                />
              ) : null}
              {showSubmit ? (
                <input
                  className="btn btn-success w-25"
                  type="submit"
                  value="Send"
                />
              ) : null}
            </div>
          </form>
        </div>
        <div className="col-6 offset-1">
          <div className="card border border-0">
            {/* Jika dataNote kosong, nampil tulisan, jika dataNote tidak kosong, nampil datanya */}
            {dataNote.length > 0 ? (
              dataNote.map((qn, index) => (
                <div
                  className="card-body border rounded mb-3"
                  key={index}
                  onClick={() => handleClick(qn.idNote)}
                >
                  {clickedItemId === qn.idNote ? (
                    <div className="text-end">
                      <Link
                        className="btn mx-2"
                        // onclick={handleUpdate(qn.id)}
                        to={`/update/${qn.idNote}`}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => {
                          handleDelete(qn.idNote);
                          //handleButtonClick();
                        }}
                      ></button>
                    </div>
                  ) : null}
                  <div className="border rounded p-3 my-3">{qn.question}</div>
                  <div className="border rounded p-3 my-3">{qn.note}</div>
                </div>
              ))
            ) : (
              <div>
                <h2>Let started to write your note!</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
