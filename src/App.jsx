import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    place: "",
    name: "",
    age: "",
  });

  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (
      !formData.place.trim() ||
      !formData.name.trim() ||
      !formData.age.trim()
    ) {
      return;
    }

    setTableData((prev) => [
      ...prev,
      {
        id: Date.now(),
        place: formData.place.trim(),
        name: formData.name.trim(),
        age: formData.age.trim(),
      },
    ]);

    setFormData({
      place: "",
      name: "",
      age: "",
    });
  };

  const handleClear = () => {
    setFormData({
      place: "",
      name: "",
      age: "",
    });
  };

  const handleRemove = (idToRemove) => {
    setTableData((prev) => prev.filter((row) => row.id !== idToRemove));
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="title">Add People to Table</h1>
        <p className="subtitle">Enter Place, Name, and Age, then click Add.</p>

        <form onSubmit={handleAdd} className="form-container">
          <div className="inputs-row">
            <div className="input-group">
              <label htmlFor="place">Place</label>
              <input
                type="text"
                id="place"
                name="place"
                placeholder="e.g. Mumbai"
                value={formData.place}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Akash"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                placeholder="e.g. 24"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-add">
              Add
            </button>
            <button
              type="button"
              className="btn btn-clear"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>

        <div className="table-wrapper">
          {tableData.length === 0 ? (
            <div className="empty-state">
              No entries yet. Add your first row!
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.place}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td className="action-cell">
                      <button
                        type="button"
                        className="btn btn-remove"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
