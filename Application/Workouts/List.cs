using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Workouts
{
    class List
    {
        public class Query : IRequest<List<Workout>> { }

        public class Handler : IRequestHandler<Query, List<Workout>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Workout>> Handle(Query request, CancellationToken cancellationToken)
            {
                var workouts = await _context.Workouts.ToListAsync();

                return workouts;
            }
        }
    }
}
