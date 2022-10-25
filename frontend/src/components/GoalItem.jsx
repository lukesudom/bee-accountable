import { useDispatch } from 'react-redux'
import { deleteGoal } from '../components/features/goals/goalSlice'
import CalendarComp from './Timer'
import DateRangePickerComp from './DateRangePickerComp'
import Timer from './Timer'
import DaySelector from './DaySelector'
import ProgressSteps from './ProgressBar'
import { useState } from 'react'


function GoalItem({ goal }) {
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(0);


  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-AU')}</div>
      <div></div>
      <h2> {goal.text}</h2>
      <h2 class='goal-desc'>{goal.days}</h2>
      <div className='App'>
              {/* <h4>Calendar Selection</h4> */}
              {/* <DateRangePickerComp /> */}
              <Timer/>
              {/* <DaySelector/> */}
              {/* <ProgressBar/> */}
            </div>
      <div className='App'>
        <h1> Weekly Completion: </h1>
        <ProgressSteps
        marginBottom={0}
        topOffset={10}
        progressBarColor="#ecf0f1"
        disabledStepIconColor="#ecf0f1"
        activeStepIconBorderColor="#2ecc71"
        completedStepIconColor="#2ecc71"
        completedProgressBarColor="#2ecc71"
        activeStep={currentStep} 
        onSubmit={() => {
          // Reset
           setCurrentStep(0);
         }}
      />
          
      </div>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        {/* Placeholder for green tick */} X
   
      </button>
    </div>
  )
}


export default GoalItem