import React, { useContext } from 'react'
import WorkoutList from './WorkoutList';
import WorkoutDetails from '../details/WorkoutDetails';
import WorkoutForm from '../form/WorkoutForm';
import{ Grid } from 'semantic-ui-react';
import WorkoutStore from '../../../app/stores/workoutStore';
import {observer} from 'mobx-react-lite';


const WorkoutDashboard: React.FC = () => {
    const workoutStore = useContext(WorkoutStore);
    const {editMode, selectedWorkout} = workoutStore;
    return(
      <div>
           <Grid columns='equal'>
            <Grid.Row>
                <Grid.Column width={10}>
                <WorkoutList/>
                </Grid.Column>

                <Grid.Column >
                    {selectedWorkout && !editMode && 
                    <WorkoutDetails/>}

                    {editMode && <WorkoutForm key={selectedWorkout && selectedWorkout.id || 0}
                    workout={selectedWorkout!} />}
                </Grid.Column>
            </Grid.Row>
        </Grid>

      </div>
    );
};

export default observer(WorkoutDashboard)
    
