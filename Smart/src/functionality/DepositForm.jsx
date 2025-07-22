import { useState } from 'react';
import PropTypes from 'prop-types';

const DepositForm = ({ goals, onDeposit }) => {
  const [formData, setFormData] = useState({
    goalId: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'amount' ? (value ? Number(value) : '') : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.goalId && formData.amount > 0) {
      // Call the onDeposit function passed from parent
      onDeposit(formData.goalId, formData.amount);
      
      // Reset the form
      setFormData({
        goalId: '',
        amount: ''
      });
    }
  };

  return (
    <div className="deposit-form-container">
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit} className="deposit-form">
        <div className="form-group">
          <label htmlFor="goalId">Select Goal:</label>
          <select
            id="goalId"
            name="goalId"
            value={formData.goalId}
            onChange={handleChange}
            required
          >
            <option value="">Select a goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (Ksh {goal.savedAmount.toLocaleString()} / Ksh {goal.targetAmount.toLocaleString()})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (Ksh):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            step="any"
            placeholder="e.g., 100"
          />
        </div>

        <button type="submit" className="submit-btn">Make Deposit</button>
      </form>
    </div>
  );
};

DepositForm.propTypes = {
  goals: PropTypes.array.isRequired,
  onDeposit: PropTypes.func.isRequired
};

export default DepositForm;