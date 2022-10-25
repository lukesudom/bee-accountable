import React from "react";
import { FaHeading } from "react-icons/fa";
// import "./styles.css";
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";

import { useState } from 'react'

let Logo = require('../imgs/bee.png')
let Logo2 = require('../imgs/bee2.png')
let Logo3 = require('../imgs/bee3.png')
let Logo4 = require('../imgs/bee4.png')
let Logo5 = require('../imgs/bee5.png')
let Logo6 = require('../imgs/bee6.png')
let Logo7 = require('../imgs/bee7.jpg')

export default function ProgressBar() {
  const step1Content = <img style={{ width:150, height: 130}} src={Logo} alt='bee'></img>
  const step2Content = <img style={{width:150, height: 130}} src={Logo2} alt='bee'></img>
  const step3Content = <img style={{ width:150, height: 130}} src={Logo3} alt='bee'></img>
  const step4Content = <img style={{width:150, height: 130}} src={Logo4} alt='bee'></img>
  const step5Content = <img style={{ width:150, height: 130}} src={Logo5} alt='bee'></img>
  const step6Content = <img style={{ width:150, height: 130}} src={Logo6} alt='bee'></img>
  const step7Content = <img style={{ width:150, height: 130}} src={Logo7} alt='bee'></img>

  const [currentStep, setCurrentStep] = useState(0);
  

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    return true;
  }



  return (
    
    <div className="day-next">
      <StepProgressBar
        startingStep={0}
        steps={[
          {
            // label: "Briefing",
            name: "Briefing",
            content: step1Content,
            subtitle:'test',
            heading:'Monday',
            activeStep: {currentStep}
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
            content: step4Content
          },
          {
            // label: "Finish",
            // name: "Finish",
            content: step5Content
          },
          {
            // label: "Finish",
            // name: "Finish",
            content: step6Content
          },
          {
            // label: "Finish",
            // name: "Finish",
            content: step7Content,
          },
        ]} 
      />
    </div>
  );
}

