import React, { useContext } from 'react'
import {Card, Image, Icon, Segment, Button} from 'semantic-ui-react'
import WorkoutStore from '../../../app/stores/workoutStore';
import { observer } from 'mobx-react-lite';


const WorkoutDetails: React.FC = () => {
  const workoutStore = useContext(WorkoutStore);
  const {selectedWorkout: selectedWorkout, openEditForm, cancelSelectedWorkout} = workoutStore;
    return(
        <Card>
            <Card.Content>
            <Card.Header>{selectedWorkout!.description}</Card.Header>
            <Card.Meta>
                <span className='date'>{selectedWorkout!.date}</span>
            </Card.Meta>
            <Card.Description>
               <div>Duration: {selectedWorkout!.duration}</div>
               <div>RPE: {selectedWorkout!.rpe}</div>

            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
            <Button onClick ={() => openEditForm(selectedWorkout!.id)} basic color='violet'>Edit Workout</Button>
            <Button onClick={() => cancelSelectedWorkout()} type='submit'>Cancel</Button>

            </a>
            </Card.Content>
        </Card>
    )
}

export default observer(WorkoutDetails)
    