import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../components/features/goals/goalSlice'

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
          <label htmlFor='text'>Create a Habit you would like to track</label>
          <input
            type='text'
            name='text'
            id='text'
            placeholder='What habit would you like to track?'
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