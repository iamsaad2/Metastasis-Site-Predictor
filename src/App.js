// App.js
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import BodyDiagram from "./BodyDiagram"; // our updated BodyDiagram

function App() {
  // Initial form state: set everything to an empty string so nothing is selected by default
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    race: "",
    n_stage: "",
    met_bone: "",
    met_brain: "",
    met_liver: "",
    met_lung: "",
  });

  // API response and error state
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Organ name map:
   *  The keys must match the "site.name" from your CSV (Top_1_Name, etc.)
   *  The values must match the 'id' attributes used in BodyDiagram.jsx
   */
  const organMap = {
    "soft-tissue": "soft-tissue",
    other: "other",
    orbit: "orbit",
    testis: "testis",
    lung: "lung",
    lung_nsclc: "lung",
    lung_sclc: "lung",
    "kidney-renal-pelvis-ureter": "kidney-renal-pelvis-ureter",
    "melanoma-of-the-skin": "melanoma-of-the-skin",
    pancreas: "pancreas",
    "head-and-neck": "head-and-neck",
    ovary: "ovary",
    thyroid: "thyroid",
    stomach: "stomach",
    intestine: "intestine",
    breast: "breast",
    "vulva-vagina": "vulva-vagina",
    esophagus: "stomach",
    rectum: "rectum",
    cervix: "cervix",
    "liver-and-gall-bladder": "liver-and-gall-bladder",
    uterus: "uterus",
    prostate: "prostate",
    vulva: "vulva",
    bladder: "kidney-renal-pelvis-ureter",
    lymphoma: "lymphoma",
    anus: "anus",
  };

  const siteDisplayNames = {
    lung_NSCLC: "lung (non-small cell lung cancer)",
    lung_SCLC: "lung (small cell lung cancer)",
  };

  // Limit to top 5 predictions
  const topFiveResults = results.slice(0, 5);

  // Determine which organs should be highlighted (i.e. rendered on the body)
  const highlightedOrgans = topFiveResults
    .map((item) => {
      const siteName = item["site.name"]
        ?.trim()
        .toLowerCase()
        .replace(/[,]+/g, "")
        .replace(/\s+/g, "-");
      console.log("Original site name:", item["site.name"]);
      console.log("Normalized site name:", siteName);
      console.log("Mapped organ ID:", organMap[siteName]);
      return organMap[siteName] || null;
    })
    .filter(Boolean);

  // Check if every form field has a value (i.e. the form is complete)
  const isFormComplete = Object.values(formData).every((value) => value !== "");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (calls your API)
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
      console.log("API Response:", response.data);
      setResults(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching predictions.");
    }
  };

  return (
    <div className="container mt-5">
      <h1
        className="text-center mb-4 display-4"
        style={{
          fontFamily: "'Roboto', sans-serif",

          fontSize: "2rem",
          fontWeight: 600,
          color: "black",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        Predicting the Location of Primary in the Setting of Metastatic Disease
      </h1>

      <div className="row">
        {/* Left Column: Form */}
        <div className="col-md-4">
          <form className="card p-4 shadow" onSubmit={handleSubmit}>
            {/* Age */}
            <div className="mb-3">
              <label className="form-label">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter age"
              />
            </div>
            {/* Sex & Race */}
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
            {/* N Stage */}
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
            {/* Metastasis: Bone / Brain / Liver / Lung */}
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
            {/* Submit Button: disable until the form is completely filled out */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!isFormComplete}
            >
              Submit
            </button>
          </form>
        </div>
        {/* Middle Column: Results */}
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h2>Top 5 Predicted Sites</h2>
            {results.length > 0 ? (
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Site Name</th>
                    <th>Predicted Chance</th>
                  </tr>
                </thead>
                <tbody>
                  {topFiveResults.map((row, index) => (
                    <tr key={index}>
                      <td>
                        {siteDisplayNames[row["site.name"]] ||
                          row["site.name"] ||
                          "N/A"}
                      </td>
                      <td>{row["predicted.chance"] || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No predictions yet. Please fill out the form and submit.</p>
            )}
          </div>
        </div>
        {/* Right Column: Body Diagram */}
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <BodyDiagram
              highlightedOrgans={highlightedOrgans}
              race={formData.race}
            />
          </div>
        </div>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Footer with predictor description */}
      <footer className="mt-5 p-3 bg-light text-center">
        <p>
          This tool is designed to help identify the most likely site of primary
          cancer in the presence of newly diagnosed metastatic disease. The tool
          is meant to be used for patients who have been diagnosed with
          metastatic cancer on imaging but have no biopsy or labs to aid in
          forming a differential diagnosis. The user inputs the patient's age,
          sex, race, involvement of lymph nodes, and presence of metastases to
          different organs (e.g., bone, brain, liver, or lungs). The app runs a
          gradient forest machine learning model that predicts the top five most
          likely primary cancer sites, along with their predicted probability.
        </p>
      </footer>
    </div>
  );
}

export default App;
