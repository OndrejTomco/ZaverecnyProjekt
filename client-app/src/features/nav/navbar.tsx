import React, { useContext } from 'react'
import {Menu} from 'semantic-ui-react';
import {Icon} from 'semantic-ui-react';
import WorkoutStore from '../../app/stores/workoutStore'
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';


const NavBar:React.FC = () => {
  const workoutStore = useContext(WorkoutStore);
    return(
        <Menu icon='labeled' vertical verticalAlign='top'>

        <Menu.Item header as={NavLink} exact to="/" name='home'>
          <Icon name='home' />
          Home
        </Menu.Item>

        <Menu.Item as={NavLink} to="/createWorkout" name='plus'>
          <Icon name='plus' />
          Add Workout
        </Menu.Item>

        <Menu.Item as={NavLink} to="/calendar" name='calendar'>
          <Icon name='calendar' />
          Calendar
        </Menu.Item>

        <Menu.Item name='activities'>
          <Icon name='bicycle' />
            My Activities
        </Menu.Item>

        <Menu.Item name='stats'>
          <Icon name='chart bar' />
          Stats
        </Menu.Item>

        <Menu.Item name='user'>
          <Icon name='user' />
          User
        </Menu.Item>
      </Menu>

    )
}

export default observer(NavBar)
    