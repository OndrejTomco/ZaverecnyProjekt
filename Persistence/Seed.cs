using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Workouts.Any())
            {
                var workouts = new List<Workout>
                {
                    new Workout
                    {
                        Description = "Workout 1",
                        Duration = TimeSpan.FromHours(1),
                        Rpe = 2
                    },

                    new Workout
                    {
                        Description = "Workout 2",
                        Duration = TimeSpan.FromHours(2),
                        Rpe = 3
                    },

                    new Workout
                    {
                        Description = "Workout 3",
                        Duration = TimeSpan.FromHours(3),
                        Rpe = 4
                    },
                };

                context.Workouts.AddRange(workouts);
                context.SaveChanges();
            }
        }
    }
}
