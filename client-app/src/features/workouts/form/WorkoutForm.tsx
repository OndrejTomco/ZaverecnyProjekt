import React, { ChangeEvent, FormEvent, useContext } from 'react'
import { Form, Button} from 'semantic-ui-react';
import { IWorkout } from '../../../app/models/workout';
import { useState } from 'react';
import ActivityList from '../../activities/ActivityList';
import {v4 as uuid} from 'uuid';
import WorkoutStore from '../../../app/stores/workoutStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  workout: IWorkout;
}
const WorkoutForm: React.FC<IProps> = ({ workout: initialFormState }) => {
  const workoutStore = useContext(WorkoutStore);
  const {createWorkout, editWorkout, cancelFormOpen} = workoutStore;
  const initializeForm = () => {
    if(initialFormState){
      return initialFormState;
    } else{
      return{
        id: '',
        description:'',
        duration: '',
        date: '',
        rpe: 1,
      }
    }
  }

  const [workout, setWorkout] = useState<IWorkout>(initializeForm);

  const handleSubmit = () => {
    if(workout.id.length === 0)
    {
      let newWorkout = {
        ...workout,
        id: uuid()
    }
      createWorkout(newWorkout);

    } else {
      editWorkout(workout);
    }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.currentTarget;
    setWorkout({...workout, [name]: value})
  }
    return(
      <div className="workoutForm"> 
        <Form onSubmit={handleSubmit}>
            <Form.Input onChange={handleInputChange} name="description" placeholder = 'Description' value={workout.description}/>
            <Form.Input onChange={handleInputChange} name="duration" placeholder = 'duration' value={workout.duration}/>
            <Form.Input onChange={handleInputChange} name="rpe" placeholder = 'rpe' value={workout.rpe}/>
            <Form.Input onChange={handleInputChange} name="date" type='datetime-local' placeholder = 'Description' value={workout.date}/>
            <Button type='submit'>Submit</Button>
            <Button onClick={() => cancelFormOpen()}>Cancel</Button>

        </Form>          
      </div>
    )
}

export default observer(WorkoutForm)
    