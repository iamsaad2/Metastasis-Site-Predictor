// BodyDiagram.jsx
import React from "react";
import KidneySVG from "./organs/Kidney";
import LiverSVG from "./organs/Liver";
import BodySVG from "./organs/Body";
import ESSVG from "./organs/Esoph_Stomach";
import IntestineSVG from "./organs/Intestine";
import LungSVG from "./organs/Lung";
import RectumSVG from "./organs/Rectum";
import ThyroidSVG from "./organs/Thyroid";
import HeadSVG from "./organs/Head";

// Decide fill color based on whether organId is highlighted
function getFillColor(organId, highlightedOrgans) {
  return highlightedOrgans.includes(organId) ? "red" : "#eee";
}

export default function BodyDiagram({ highlightedOrgans = [], race }) {
  return (
    <svg
      width="350"
      height="700"
      viewBox="0 0 350 700"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
    >
      <title>Approximate Human Body Diagram</title>
      
      {/* Always render the body silhouette and pass along the race prop */}
      <BodySVG race={race} />

      {/* Conditionally render each organ based on highlightedOrgans */}
      {highlightedOrgans.includes("head-and-neck") && (
        <g
          id="head-and-neck"
          fill={getFillColor("head-and-neck", highlightedOrgans)}
          stroke="#000"
          transform="translate(136, 0)"
        >
          <HeadSVG width={100} height={100} />
        </g>
      )}

      {highlightedOrgans.includes("kidney-renal-pelvis-ureter") && (
        <g
          id="kidney-renal-pelvis-ureter"
          fill={getFillColor("kidney-renal-pelvis-ureter", highlightedOrgans)}
          stroke="#000"
          transform="translate(90, 200) scale(0.98)"
        >
          <KidneySVG width={200} height={200} />
        </g>
      )}

      {highlightedOrgans.includes("stomach") && (
        <g
          id="stomach"
          fill={getFillColor("stomach", highlightedOrgans)}
          stroke="#000"
          transform="translate(120, 100) scale(1.5)"
        >
          <ESSVG width={100} height={100} />
        </g>
      )}

      {highlightedOrgans.includes("lung") && (
        <g
          id="lung"
          fill={getFillColor("lung", highlightedOrgans)}
          stroke="#000"
          transform="translate(125, 120) scale(1.15)"
        >
          <LungSVG width={100} height={100} />
        </g>
      )}

      {highlightedOrgans.includes("liver-and-gall-bladder") && (
        <g
          id="liver-and-gall-bladder"
          fill={getFillColor("liver-and-gall-bladder", highlightedOrgans)}
          stroke="#000"
          transform="translate(130, 200)"
        >
          <LiverSVG width={100} height={100} />
        </g>
      )}

      {highlightedOrgans.includes("intestine") && (
        <g
          id="intestine"
          fill={getFillColor("intestine", highlightedOrgans)}
          stroke="#000"
          transform="translate(130, 230)"
        >
          <IntestineSVG width={100} height={100} />
        </g>
      )}

      {highlightedOrgans.includes("rectum") && (
        <g
          id="rectum"
          fill={getFillColor("rectum", highlightedOrgans)}
          stroke="#000"
          transform="translate(125, 230) scale(1.2)"
        >
          <RectumSVG width={100} height={100} />
        </g>
      )}

      {highlightedOrgans.includes("thyroid") && (
        <g
          id="thyroid"
          fill={getFillColor("thyroid", highlightedOrgans)}
          stroke="#000"
          transform="translate(160, 90) scale(0.5)"
        >
          <ThyroidSVG width={100} height={100} />
        </g>
      )}
      
      {/* Add additional organs similarly if needed */}
      
    </svg>
  );
}
