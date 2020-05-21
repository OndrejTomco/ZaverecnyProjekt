using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Workouts
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
           
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

                _context.Remove(workout);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem occured while deleting workout");
            }

        }
    }
}
