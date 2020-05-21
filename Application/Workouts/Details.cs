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
    public class Details
    {
        public class Query : IRequest<Workout>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Workout>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Workout> Handle(Query request, CancellationToken cancellationToken)
            {
                var workout = await _context.Workouts.FindAsync(request.Id);

                return workout;
            }
        }
    }
}
