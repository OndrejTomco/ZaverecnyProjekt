using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace Application.Workouts
{
   public class Edit
   {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Description { get; set; }
            public string Duration { get; set; }
            public int Rpe { get; set; }
            public DateTime Date { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var workout = await _context.Workouts.FindAsync(request.Id);

                if (workout == null)
                    throw new Exception("workout not found");

                    workout.Description = request.Description ?? workout.Description;
                   // workout.Duration = request.Duration ?? workout.Duration;
                    //workout.Rpe =  workout.Rpe;
                   // workout.Date =  workout.Date;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem occured while editing workout");
            }
        }
    }
}
