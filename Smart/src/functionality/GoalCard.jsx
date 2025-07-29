import { useState } from 'react';

function GoalCard({ goal, onDelete, onDeposit }) {
  
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  // Calculate progress percentage
  const progressPercent = Math.min(
    Math.round((goal.savedAmount / goal.targetAmount) * 100),
    100
  );
  
 
  const remainingAmount = goal.targetAmount - goal.savedAmount;

  // Calculate days left until deadline
  const today = new Date();
  const deadlineDate = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  // Check goal status
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isOverdue = daysLeft < 0 && !isCompleted;
  const isWarning = daysLeft <= 30 && daysLeft > 0 && !isCompleted;

  // Handle deposit form submission
  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (depositAmount && Number(depositAmount) > 0) {
      onDeposit(goal.id, Number(depositAmount));
      setDepositAmount('');
      setShowDepositForm(false);
    }
  };

  // Determine card styling based on status
  let cardClass = 'goal-card';
  if (isCompleted) cardClass += ' completed';
  if (isOverdue) cardClass += ' overdue';
  if (isWarning) cardClass += ' warning';

  return (
    <div className={cardClass}>
      {/* Goal title */}
      <h3>{goal.name}</h3>
      
      {/* Goal information */}
      <div className="goal-details">
        <p>Category: {goal.category}</p>
        <p>Target: Ksh {goal.targetAmount.toLocaleString()}</p>
        <p>Saved: Ksh {goal.savedAmount.toLocaleString()}</p>
        <p>Remaining: Ksh {remainingAmount.toLocaleString()}</p>
        <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
        
        {/* Status messages */}
        {isCompleted && <p className="status completed">Goal Completed! 🎉</p>}
        {isOverdue && <p className="status overdue">Overdue ⚠️</p>}
        {isWarning && <p className="status warning">Deadline approaching! ⏰</p>}
        
        {/* Show days left if not overdue or completed */}
        {!isOverdue && !isCompleted && (
          <p>Days left: {daysLeft}</p>
        )}
      </div>

      {/* Progress bar */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercent}%` }}
        ></div>
        <span className="progress-text">{progressPercent}%</span>
      </div>

      {/* Action buttons */}
      <div className="goal-actions">
        <button onClick={() => setShowDepositForm(!showDepositForm)}>
          {showDepositForm ? 'Cancel' : 'Add Money'}
        </button>
        <button onClick={() => onDelete(goal.id)}>Delete Goal</button>
      </div>

      {/* Deposit form (shows when button is clicked) */}
      {showDepositForm && (
        <form onSubmit={handleDepositSubmit} className="deposit-form">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
            required
          />
          <button type="submit">Add Money</button>
        </form>
      )}
    </div>
  );
}

export default GoalCard;