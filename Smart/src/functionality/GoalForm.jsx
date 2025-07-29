import { useState } from 'react';

function GoalForm({ onAddGoal }) {
  // Simple state for each form field
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new goal object
    const newGoal = {
      name: goalName,
      targetAmount: Number(targetAmount),
      category: category,
      deadline: deadline
    };
    
    // Send to parent component
    onAddGoal(newGoal);
    
    // Clear all form fields
    setGoalName('');
    setTargetAmount('');
    setCategory('');
    setDeadline('');
  };

  // Get today's date for minimum deadline
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="goal-form-container">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Goal name input */}
        <div className="form-group">
          <label>Goal Name:</label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="e.g., Travel Fund"
            required
          />
        </div>

        {/* Target amount input */}
        <div className="form-group">
          <label>Target Amount (Ksh):</label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="e.g., 5000"
            min="1"
            required
          />
        </div>

        {/* Category selection */}
        <div className="form-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Choose category</option>
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

        {/* Deadline input */}
        <div className="form-group">
          <label>Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={today}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;