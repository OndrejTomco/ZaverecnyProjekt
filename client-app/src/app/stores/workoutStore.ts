import { IWorkout } from './../models/workout';
import {observable, action, computed, configure, runInAction} from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';

configure({enforceActions: 'always'});

export class WorkoutStore {
    @observable workoutRegistry = new Map();
    @observable workouts: IWorkout[] = [];
    @observable selectedWorkout: IWorkout | undefined;
    @observable editMode = false;

    @computed get workoutsByDate() {
        return Array.from(this.workoutRegistry.values()).sort((a,b) => Date.parse(b.date)-Date.parse(a.date));
        // return this.workouts.sort((a,b) => Date.parse(b.date)-Date.parse(a.date))
    }

    @action loadWorkouts = async () => {
        try{
            const workouts = await agent.Workouts.list();
            runInAction(() => {
                workouts.forEach(workout => {
                workout.date = workout.date.split('.')[0];
                // this.workouts.push(workout);
                this.workoutRegistry.set(workout.id,workout);
                })
            })
            
        } catch(error) {
            console.log(error);
        }
    }

    @action loadWorkout = async (id:string) => {
        let workout = this.getWorkout(id);
        if(workout)
        {
            this.selectedWorkout = workout
        } else {
            try {
                workout = await agent.Workouts.details(id);
                runInAction( () => {
                    this.selectedWorkout = workout;
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    getWorkout = (id:string) => {
        return this.workoutRegistry.get(id);
    }

    @action createWorkout = async (workout: IWorkout) => {
        try {
            await agent.Workouts.create(workout);
            runInAction(() => {
                this.workoutRegistry.set(workout.id, workout);
                // this.workouts.push(workout);
                this.editMode = false;
            })

        } catch (error) {
            console.log(error);
        }
    }


    @action editWorkout = async (workout : IWorkout) => {
        try {
            await agent.Workouts.update(workout);
            runInAction(() => {
                // this.workouts = [...this.workouts.filter(w => w.id!== workout.id), workout]
                this.workoutRegistry.set(workout.id, workout);
                this.selectedWorkout = workout;
                this.editMode = false;
            })

        } catch (error) {
            
        }
    }

    @action deleteWorkout = async (id: string) => {
        try {
            // await agent.Workouts.delete(id);
            runInAction(() => {
                console.log([...this.workouts.filter(w => w.id !== id)]);
                this.workoutRegistry.delete(id);
                // this.workouts = [...this.workouts.filter(w => w.id !== id)]
                this.selectedWorkout = undefined;
            })
        } catch (error) {
            
        }
    }

    @action openEditForm = (id: string) => {
        this.selectedWorkout = this.workoutRegistry.get(id);
        this.editMode = true;
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedWorkout = undefined;
    }

    @action selectWorkout = (id:string) => {
        this.selectedWorkout = this.workoutRegistry.get(id);
        this.editMode = false;
    }

    @action cancelSelectedWorkout = () => {
        this.selectedWorkout = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }
}

export default createContext(new WorkoutStore())