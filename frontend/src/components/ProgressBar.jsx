import React from "react";
// import "./styles.css";
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";

export default function ProgressBar() {
  const step1Content = <h1></h1>;
  const step2Content = <h1></h1>;
  const step3Content = <h1></h1>;

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    return true;
  }

  function step3Validator() {
    // return a boolean
  }
  return (
    <div className="day-next">
      <StepProgressBar
        startingStep={0}
        steps={[
          {
            // label: "Briefing",
            // name: "Briefing",
            content: step1Content
          },
          {
            // label: "Image-Acquisition",
            // name: "Image-Acquisition",
            content: step2Content
          },
          {
            // label: "Image-processing",
            // name: "Image Processing",
            content: step3Content,
            validator: step2Validator
          },
          {
            // label: "Finish",
            // name: "Finish",
            content: step3Content
          },
          {
            // label: "Finish",
            // name: "Finish",
            content: step3Content
          },
          {
            // label: "Finish",
            // name: "Finish",
            content: step3Content
          },
          {
            // label: "Finish",
            // name: "Finish",
            content: step3Content
          },
        ]}
      />
    </div>
  );
}

