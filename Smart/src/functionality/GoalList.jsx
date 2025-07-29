import GoalCard from './GoalCard';

function GoalList({ goals, onDeleteGoal, onDepositToGoal }) {
  // If no goals exist, show a message
  if (goals.length === 0) {
    return (
      <div className="no-goals">
        <p>No goals yet! Add your first goal to get started.</p>
      </div>
    );
  }

  // Show all goals as cards
  return (
    <div className="goal-list">
      {goals.map(goal => (
        <GoalCard 
          key={goal.id} 
          goal={goal} 
          onDelete={onDeleteGoal}
          onDeposit={onDepositToGoal}
        />
      ))}
    </div>
  );
}

export default GoalList;