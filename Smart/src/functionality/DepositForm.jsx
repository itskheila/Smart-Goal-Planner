import { useState } from 'react';

function DepositForm({ goals, onDeposit }) {
  
  const [selectedGoal, setSelectedGoal] = useState('');
  const [amount, setAmount] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (selectedGoal && amount > 0) {
      
      onDeposit(selectedGoal, Number(amount));
      
      setSelectedGoal('');
      setAmount('');
    }
  };

  return (
    <div className="deposit-form-container">
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Goal selection dropdown */}
        <div className="form-group">
          <label>Select Goal:</label>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            required
          >
            <option value="">Choose a goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (Ksh {goal.savedAmount} / Ksh {goal.targetAmount})
              </option>
            ))}
          </select>
        </div>

        {/* Amount input */}
        <div className="form-group">
          <label>Amount (Ksh):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Make Deposit</button>
      </form>
    </div>
  );
}

export default DepositForm;