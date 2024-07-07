import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [sta, setSta] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name,sta };
    console.log(addUser);
    const response = await fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setName("");
      setSta("");
      setError("");
      navigate("/read");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/list-icon-notebook-with-completed-todo-list-3d-render_471402-428.jpg')",backgroundSize: "cover" }}>
      <div>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>
                {error && <div className="alert alert-danger"> {error} </div>}
                <form
                  className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                  onSubmit={handleSubmit}
                >
                  <div className="col-12">
                    <div className="form-outline">
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form1">
                        Enter a task here
                      </label>
                    </div>
                    <div className="form-outline">
                      <input
                        type="text"
                        className="form-control"
                        value={sta}
                        onChange={(e) => setSta(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form1">
                        Enter a Status
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>

                  <div className="col-12">
                    <button type="submit" >
                      <a href="./read" className="btn btn-warning">GetTask</a>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Create;
 