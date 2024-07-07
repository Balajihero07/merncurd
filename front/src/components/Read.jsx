import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  async function handleDelete(id) {
    const response = await fetch(`http://localhost:8000/${id}`, {
      method: "DELETE",
    });
    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }
  async function getData() {
    const response = await fetch("http://localhost:8000");
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setData(result);
      setError("");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (

    <section className="vh-100" style={{ backgroundImage:"url('https://wallpaperaccess.com/full/1489346.jpg')",backgroundSize:"100%"  }}>
      <div>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-9 col-xl-7">
          <div class="card rounded-3">
            <div class="card-body p-4">
            <table class="table mb-4">
			{error && <div class="alert alert-danger"> {error} </div>}
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Todo item</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
			  {data?.map((ele) => (
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>{ele.name}</td>
                  <td>{ele.sta}</td>
                  <td>
                    <button type="submit" class="btn btn-danger" onClick={() => handleDelete(ele._id)}>Delete</button>
                    <button type="submit" class="btn btn-success ms-1"><Link to={`/${ele._id}`}><div style={{color:"White",Decoration:"none"}}>Edit</div></Link></button>
                  </td>
                </tr>
              </tbody>
			      ))}
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
  );
};
export default Read;