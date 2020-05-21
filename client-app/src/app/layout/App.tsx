import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Header, Icon, List, Container, Divider, Grid, Image } from 'semantic-ui-react';
import NavBar from '../../features/nav/navbar';
import Calendar from '../../features/calendar/calendar';
import { IActivity } from '../models/activity';
import WorkoutDashboard from '../../features/workouts/dashboard/WorkoutDashboard';
import agent from '../api/agent';
import WorkoutStore from '../stores/workoutStore';
import {observer} from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import WorkoutForm from '../../features/workouts/form/WorkoutForm';
import WorkoutDetails from '../../features/workouts/details/WorkoutDetails';


const App = () => {
    const workoutStore = useContext(WorkoutStore);
    const [activities, setActivities] = useState<IActivity[]>([])

    useEffect(() => {
           workoutStore.loadWorkouts();
    }, [workoutStore]);

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities').then(response => {
            setActivities(response.data)
        });
    }, []);
  
return (
    <div className="App">
        <Grid columns='equal'>
            <Grid.Row>
                <Grid.Column>
                <NavBar/>
                </Grid.Column>
                    <Grid.Column width={14}>
                    <div className="midContent">
                    <Route exact path="/" component ={WorkoutDashboard} />
                    <Route exact path="/:id" component ={WorkoutDetails} />
                    <Route path="/createWorkout" component ={WorkoutForm} />
                    <Route path="/calendar" component ={Calendar} />


                    {/* <WorkoutDashboard /> */}
                    {/* <ActivityList activities={activities} /> */}
                    </div>
                    </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
    );
}

export default observer(App);
