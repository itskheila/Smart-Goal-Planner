import { useState } from 'react';
import PropTypes from 'prop-types';

const GoalCard = ({ goal, onDelete, onDeposit }) => {
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  // Calculate progress percentage
  const progressPercentage = Math.min(
    Math.round((goal.savedAmount / goal.targetAmount) * 100),
    100
  );

  // Calculate remaining amount
  const remainingAmount = goal.targetAmount - goal.savedAmount;

  // Calculate days left until deadline
  const today = new Date();
  const deadlineDate = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  // Determine goal status
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isOverdue = daysLeft < 0 && !isCompleted;
  const isWarning = daysLeft <= 30 && daysLeft > 0 && !isCompleted;

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (depositAmount && !isNaN(depositAmount) && Number(depositAmount) > 0) {
      onDeposit(goal.id, Number(depositAmount));
      setDepositAmount('');
      setShowDepositForm(false);
    }
  };

  return (
    <div className={`goal-card ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} ${isWarning ? 'warning' : ''}`}>
      <h3>{goal.name}</h3>
      <div className="goal-details">
        <p>Category: {goal.category}</p>
        <p>Target: Ksh {goal.targetAmount.toLocaleString()}</p>
        <p>Saved: Ksh {goal.savedAmount.toLocaleString()}</p>
        <p>Remaining: Ksh {remainingAmount.toLocaleString()}</p>
        <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
        
        {isCompleted && <p className="status completed">Completed!</p>}
        {isOverdue && <p className="status overdue">Overdue</p>}
        {isWarning && <p className="status warning">Deadline approaching!</p>}
        
        {!isOverdue && !isCompleted && (
          <p>Time left: {daysLeft} days</p>
        )}
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <span className="progress-text">{progressPercentage}%</span>
      </div>

      <div className="goal-actions">
        <button onClick={() => setShowDepositForm(!showDepositForm)}>
          {showDepositForm ? 'Cancel' : 'Make Deposit'}
        </button>
        <button onClick={() => onDelete(goal.id)}>Delete Goal</button>
      </div>

      {showDepositForm && (
        <form onSubmit={handleDepositSubmit} className="deposit-form">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
            step="any"
            required
          />
          <button type="submit">Deposit</button>
        </form>
      )}
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    targetAmount: PropTypes.number.isRequired,
    savedAmount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onDeposit: PropTypes.func.isRequired
};

export default GoalCard;