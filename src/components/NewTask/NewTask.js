import React from "react";
import { v4 as uuid } from "uuid";
import { Formik } from "formik";

import taskSchema from "./task-schema";

import "./NewTask.scss";
import "../Checkbox/Checkbox.scss";

function addDetailsNewTask(data) {
  return {
    id: uuid(),
    ...data,
    isEditing: false,
  };
}

function NewTask({ saveNewTask }) {
  return (
    <>
      <Formik
        initialValues={{
          title: "",
          isCompleted: false,
        }}
        validationSchema={taskSchema}
        onSubmit={(values, onSubmitProps) => {
          onSubmitProps.resetForm({});
          const newTask = addDetailsNewTask(values);
          saveNewTask(newTask);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          values,
          touched,
        }) => (
          <form
            className="d-flex flex-row align-items-center form-wrapper"
            onSubmit={handleSubmit}
          >
            <div className="d-flex justify-content-center align-items-center isCompleted-wrapper">
              <div className="round-checkbox check-new-task">
                <input
                  id="isCompleted"
                  name="isCompleted"
                  type="checkbox"
                  value={values.isCompleted}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="d-none"
                />
                {/* eslint-disable-next-line */}
                <label htmlFor="isCompleted" />
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center text-input-wrapper">
              <input
                className="text-input"
                id="title"
                name="title"
                type="text"
                placeholder="Insert a new task ..."
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.title && errors.title && (
                <p className="text-input-failed">{errors.title}</p>
              )}
              <button
                className="d-flex justify-content-center align-items-center submit-new-task"
                type="submit"
              >
                {touched.title && errors.title ? (
                  <img
                    className="icon-submit"
                    src="./img/fail.png"
                    alt="Fail"
                  />
                ) : (
                  <img
                    className="icon-submit"
                    src="./img/enter.png"
                    alt="Correct"
                  />
                )}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default NewTask;
