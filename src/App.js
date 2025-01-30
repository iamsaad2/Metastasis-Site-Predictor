import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [formData, setFormData] = useState({
    age: 50,
    sex: "Male",
    race: "White",
    n_stage: "0",
    met_bone: "No",
    met_brain: "No",
    met_liver: "No",
    met_lung: "No",
  });

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  console.log(error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://metastasis-site-predictor-api-production.up.railway.app/predict",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResults(response.data);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching predictions.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        Predicting the location of primary in the setting of metastatic disease
      </h1>
      <div className="row">
        {/* Left Column: Form */}
        <div className="col-md-5">
          <form className="card p-4 shadow" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Sex:</label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sex"
                      value="Male"
                      checked={formData.sex === "Male"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sex"
                      value="Female"
                      checked={formData.sex === "Female"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Female</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Race:</label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="race"
                      value="Black"
                      checked={formData.race === "Black"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Black</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="race"
                      value="White"
                      checked={formData.race === "White"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">White</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="race"
                      value="Others"
                      checked={formData.race === "Others"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Others</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">N Stage:</label>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="n_stage"
                    value="0"
                    checked={formData.n_stage === "0"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">0</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="n_stage"
                    value="1"
                    checked={formData.n_stage === "1"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">1</label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Metastasis to Bone:</label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="met_bone"
                      value="Yes"
                      checked={formData.met_bone === "Yes"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="met_bone"
                      value="No"
                      checked={formData.met_bone === "No"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Metastasis to Brain:</label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="met_brain"
                      value="Yes"
                      checked={formData.met_brain === "Yes"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="met_brain"
                      value="No"
                      checked={formData.met_brain === "No"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Metastasis to Liver:</label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="met_liver"
                      value="Yes"
                      checked={formData.met_liver === "Yes"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="met_liver"
                      value="No"
                      checked={formData.met_liver === "No"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Metastasis to Lung:</label>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="met_lung"
                      value="Yes"
                      checked={formData.met_lung === "Yes"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="met_lung"
                      value="No"
                      checked={formData.met_lung === "No"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>

        {/* Right Column: Results */}
        <div className="col-md-7">
          <div className="card p-4 shadow">
            <h2>The predicted top 5 sites</h2>
            {results.length > 0 ? (
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Site Name</th>
                    <th>Predicted Chance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, index) => (
                    <tr key={index}>
                      <td>{row["site.name"] || "N/A"}</td>
                      <td>{row["predicted.chance"] || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No predictions yet. Fill out the form and click submit.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
