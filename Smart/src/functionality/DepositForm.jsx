import { useState } from 'react';

function DepositForm({ goals, onDeposit }) {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (selectedGoal === '') {
      alert('Please select a goal');
      return;
    }
    
    if (amount === '' || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
   
    onDeposit(selectedGoal, Number(amount));
    
    
    setSelectedGoal('');
    setAmount('');
  };

  
  let goalOptions = [];
  if (goals.length === 0) {
    goalOptions.push(
      <option key="no-goals" value="">No goals available</option>
    );
  } else {
    goalOptions.push(
      <option key="default" value="">Choose a goal</option>
    );
    
    for (let i = 0; i < goals.length; i++) {
      const goal = goals[i];
      goalOptions.push(
        <option key={goal.id} value={goal.id}>
          {goal.name} (Ksh {goal.savedAmount} / Ksh {goal.targetAmount})
        </option>
      );
    }
  }

  
  let isFormDisabled = false;
  if (goals.length === 0) {
    isFormDisabled = true;
  }

  return (
    <div className="deposit-form-container">
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Select Goal:</label>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            disabled={isFormDisabled}
            required
          >
            {goalOptions}
          </select>
        </div>

        <div className="form-group">
          <label>Amount (Ksh):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
            disabled={isFormDisabled}
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isFormDisabled}
        >
          Make Deposit
        </button>
      </form>
    </div>
  );
}

export default DepositForm;