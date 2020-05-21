using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace Application.Activities
{
   public class Edit
   {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string ActivityName { get; set; }
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
                var activities = await _context.Activities.FindAsync(request.Id);

                if (activities == null)
                    throw new Exception("activity not found");

                activities.ActivityName = request.ActivityName ?? activities.ActivityName;
            

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem occured while editing activity");
            }
        }
    }
}
