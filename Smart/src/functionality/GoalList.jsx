import GoalCard from './GoalCard';

function GoalList({ goals, onDeleteGoal, onDepositToGoal }) {
  
  
  if (goals.length === 0) {
    return (
      <div className="no-goals">
        <p>No goals yet! Add your first goal to get started.</p>
      </div>
    );
  }

  
  let goalCards = [];
  for (let i = 0; i < goals.length; i++) {
    const goal = goals[i];
    goalCards.push(
      <GoalCard 
        key={goal.id} 
        goal={goal} 
        onDelete={onDeleteGoal}
        onDeposit={onDepositToGoal}
      />
    );
  }

  return (
    <div className="goal-list">
      {goalCards}
    </div>
  );
}

export default GoalList;