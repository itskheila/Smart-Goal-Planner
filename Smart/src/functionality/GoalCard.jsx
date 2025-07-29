import { useState } from 'react';

function GoalCard({ goal, onDelete, onDeposit }) {
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  let progressPercent = Math.round((goal.savedAmount / goal.targetAmount) * 100);
  if (progressPercent > 100) {
    progressPercent = 100;
  }
  
  const remainingAmount = goal.targetAmount - goal.savedAmount;

  const today = new Date();
  const deadlineDate = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  let isCompleted = false;
  let isOverdue = false;
  let isWarning = false;

  if (goal.savedAmount >= goal.targetAmount) {
    isCompleted = true;
  } else if (daysLeft < 0) {
    isOverdue = true;
  } else if (daysLeft <= 30) {
    isWarning = true;
  }

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (depositAmount && Number(depositAmount) > 0) {
      onDeposit(goal.id, Number(depositAmount));
      setDepositAmount('');
      setShowDepositForm(false);
    }
  };


  let cardClass = 'goal-card';
  if (isCompleted) {
    cardClass = 'goal-card completed';
  } else if (isOverdue) {
    cardClass = 'goal-card overdue';
  } else if (isWarning) {
    cardClass = 'goal-card warning';
  }

  let statusMessage = null;
  if (isCompleted) {
    statusMessage = <p className="status completed">Goal Completed! 🎉</p>;
  } else if (isOverdue) {
    statusMessage = <p className="status overdue">Overdue ⚠️</p>;
  } else if (isWarning) {
    statusMessage = <p className="status warning">Deadline approaching! ⏰</p>;
  }

 
  let daysLeftMessage = null;
  if (!isOverdue && !isCompleted) {
    daysLeftMessage = <p>Days left: {daysLeft}</p>;
  }

 
  let depositFormSection = null;
  if (showDepositForm) {
    depositFormSection = (
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
    );
  }

  return (
    <div className={cardClass}>
      <h3>{goal.name}</h3>
      
      <div className="goal-details">
        <p>Category: {goal.category}</p>
        <p>Target: Ksh {goal.targetAmount.toLocaleString()}</p>
        <p>Saved: Ksh {goal.savedAmount.toLocaleString()}</p>
        <p>Remaining: Ksh {remainingAmount.toLocaleString()}</p>
        <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
        
        {statusMessage}
        {daysLeftMessage}
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercent}%` }}
        ></div>
        <span className="progress-text">{progressPercent}%</span>
      </div>

      <div className="goal-actions">
        <button onClick={() => setShowDepositForm(!showDepositForm)}>
          {showDepositForm ? 'Cancel' : 'Add Money'}
        </button>
        <button onClick={() => onDelete(goal.id)}>Delete Goal</button>
      </div>

      {depositFormSection}
    </div>
  );
}

export default GoalCard;