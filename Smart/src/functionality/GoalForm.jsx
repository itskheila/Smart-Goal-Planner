import { useState } from 'react';
import PropTypes from 'prop-types';

const GoalForm = ({ onAddGoal }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'targetAmount' ? (value ? Number(value) : '') : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new goal object
    const newGoal = {
      ...formData,
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Call the onAddGoal function passed from parent
    onAddGoal(newGoal);
    
    // Reset the form
    setFormData({
      name: '',
      targetAmount: '',
      category: '',
      deadline: ''
    });
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="goal-form-container">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label htmlFor="name">Goal Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Travel Fund, Emergency Fund"
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetAmount">Target Amount (Ksh):</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            required
            min="1"
            step="any"
            placeholder="e.g., 5000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Electronics">Electronics</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Education">Education</option>
            <option value="Shopping">Shopping</option>
            <option value="Retirement">Retirement</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            min={today}
          />
        </div>

        <button type="submit" className="submit-btn">Add Goal</button>
      </form>
    </div>
  );
};

GoalForm.propTypes = {
  onAddGoal: PropTypes.func.isRequired
};

export default GoalForm;