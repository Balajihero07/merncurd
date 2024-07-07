import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [sta, setSta] = useState("");
  const [error, setError] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/${id}`);
      const result = await response.json();
      if (response.ok) {
        setName(result.name);
        setSta(result.sta);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, sta };
    try {
      const response = await fetch(`http://localhost:8000/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const result = await response.json();
      if (response.ok) {
        navigate("/read");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/list-icon-notebook-with-completed-todo-list-3d-render_471402-428.jpg')",backgroundSize:"80%" }}>
    <div>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-lg-9 col-xl-7">
          <div className="card rounded-3">
            <div className="card-body p-4">
              <h4 className="text-center my-3 pb-3">Edit Task</h4>
              {error && <div className="alert alert-danger"> {error} </div>}
              <form
                className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                onSubmit={handleUpdate}
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
                    Update
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

export default Update;
