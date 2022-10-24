import { useDispatch } from 'react-redux'
import { deleteGoal } from '../components/features/goals/goalSlice'
import CalendarComp from './Timer'
import DateRangePickerComp from './DateRangePickerComp'
import Timer from './Timer'
import DaySelector from './DaySelector'
import ProgressBar from './ProgressBar'


function GoalItem({ goal }) {
  const dispatch = useDispatch()


  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <div></div>
      <h2>Habit: {goal.text}</h2>
      <h2>{goal.days} Days</h2>
      <div className='App'>
              <h4>Calendar Selection</h4>
              <DateRangePickerComp />
              <Timer/>
              {/* <DaySelector/> */}
              {/* <ProgressBar/> */}
            </div>
      <div className='App'>
        <ProgressBar/>
      </div>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        {/* Placeholder for green tick */} X
   
      </button>
    </div>
  )
}


export default GoalItem