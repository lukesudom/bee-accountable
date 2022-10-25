import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../components/features/goals/goalSlice'
import { FaBeer } from 'react-icons/fa';

function GoalForm() {
  const [text, setText] = useState('')
  const [days, setNumber] = useState('')


  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text, days }))
    setText('')
    setNumber('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>
           </label>
          <select value={text} className='select-btn' onChange={(e) => setText(e.target.value)}>
          <option value="">Select a habit from the list or create your own below! </option>
            <option value="Reading" className='habit-list'>Reading</option>
            <option value="Exercise">Exercise</option>
            <option value="Sleep">Sleep</option>
            <option value="Journal">Journal </option>
            <option value="Learning">Learning</option>
            <option value="University">University</option>
            <option value="Make Bed">Make Bed</option>
            <option value="Clean Room">Clean Room </option>
          </select>
          <input
            type='text'
            name='text'
            id='text'
            placeholder='Enter your own habit to track here!?'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
            <input 
            placeholder='Description'
            id='days'
            type='days'
            name='days'
            value={days} 
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Habit
          </button>
        </div>
      </form>
    </section>
    
  )
}

export default GoalForm