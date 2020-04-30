using System;
namespace Domain
{
	public class Workout
	{
		public Guid Id { get; set; }
		public string Description { get; set; }
		public TimeSpan Duration { get; set; }
		public int Rpe { get; set; }
		
	}
}


