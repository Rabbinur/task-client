import React, { useState } from "react";
import { Form } from "react-router-dom";

import "react-multiple-select-dropdown-lite/dist/index.css";

const Task = () => {
  const [users, setUsers] = useState({});

  const handleAddTasks = (event) => {
    event.preventDefault();
    console.log(users);

    fetch("https://task-server-rabbinur.vercel.app/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Task added Successfully"); //alert message
          event.target.reset();
        }
        console.log(data);
      });
  };

  const handleInputBlur = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    const newUser = { ...users };
    newUser[field] = value;
    setUsers(newUser);

    console.log(value, field);
  };

  return (
    <div>
      <div className=" my-10 grid  grid-cols-1  gap-20 md:grid-cols-2">
        <div className="text-center">
          <h2>
            Please enter your name and <br /> pick the Sectors you are currently
            involved in.
          </h2>
        </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 hover:shadow-violet-600 py-12">
          <Form onSubmit={handleAddTasks} className="card-body">
            <label className="label" htmlFor="">
              Name
            </label>
            <input
              type="text"
              onChange={handleInputBlur}
              name="name"
              placeholder="name"
              className="input input-bordered"
              required
            />
            <br />
            <label htmlFor="">selectors </label>
            <select
              type="sectors"
              onChange={handleInputBlur}
              name="sectors"
              placeholder="Current Job list"
              className="input input-bordered"
              required
            >
              <option disabled selected>
                please select your selectors
              </option>
              <option>Manufacturing</option>
              <option>Electronics and optics</option>

              <option>Food and Beverage</option>
              <option>Bakery & confectionary products</option>
            </select>

            <br />
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                name="check"
                onChange={handleInputBlur}
                className="checkbox checkbox-warning"
              />
              <span className="label-text"> Agree to terms</span>
            </label>
            <br />
            <input
              type="submit"
              value="Add Tasks"
              className="btn btn-primary"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Task;
