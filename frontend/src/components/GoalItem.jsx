import { useDispatch } from 'react-redux'
import { deleteGoal } from '../components/features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>Habit: {goal.text}</h2>
      <h2>{goal.days} Days</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        {/* Placeholder for green tick */} X
      </button>
    </div>
  )
}

export default GoalItem