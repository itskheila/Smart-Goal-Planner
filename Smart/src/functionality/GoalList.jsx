import PropTypes from 'prop-types';
import GoalCard from './GoalCard';

const GoalList = ({ goals, onDeleteGoal, onDepositToGoal }) => {
  if (goals.length === 0) {
    return <p className="no-goals">No goals found. Add a new goal to get started!</p>;
  }

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
};

GoalList.propTypes = {
  goals: PropTypes.array.isRequired,
  onDeleteGoal: PropTypes.func.isRequired,
  onDepositToGoal: PropTypes.func.isRequired
};

export default GoalList;