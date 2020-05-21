using Domain;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Workouts
{
    public class Create
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
                var workout = new Workout
                {
                    Id = request.Id,
                    Description = request.Description,
                    Duration = request.Duration,
                    Rpe = request.Rpe,
                    Date = request.Date
                };

                await _context.Workouts.AddAsync(workout);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem occured while saving workout");
            }
        }

    }
}
