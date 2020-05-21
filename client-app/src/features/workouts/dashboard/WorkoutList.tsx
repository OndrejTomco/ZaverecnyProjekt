import React, { useContext } from 'react'
import { Item, Image, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import WorkoutStore from '../../../app/stores/workoutStore'
import { Link } from 'react-router-dom';


const WorkoutList: React.FC = () => {
  const workoutStore = useContext(WorkoutStore);
  const {workoutsByDate, selectWorkout, deleteWorkout} = workoutStore;
    return(
      <div>
        <Item.Group divided>
        {workoutsByDate.map( workout => (
          <Item key={workout.id}>
          <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
          <Item.Content>
              <Item.Header as='a'>{workout.description}</Item.Header>
              <Item.Meta>{workout.duration}</Item.Meta>
              <Item.Description>
                  <div>{workout.date}</div>
              </Item.Description>
              <Button as={Link} to={`/${workout.id}`}>Additional Details</Button>
              <Button onClick={() => deleteWorkout(workout.id)}>Delete</Button>

          </Item.Content>
          </Item>
        ))}
          
        </Item.Group>
      </div>
    )
}

export default observer(WorkoutList)
    