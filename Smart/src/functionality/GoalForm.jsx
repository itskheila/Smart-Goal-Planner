import { useState } from 'react';

function GoalForm({ onAddGoal }) {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (goalName === '') {
      alert('Please enter a goal name');
      return;
    }
    
    if (targetAmount === '' || Number(targetAmount) <= 0) {
      alert('Please enter a valid target amount');
      return;
    }
    
    if (category === '') {
      alert('Please select a category');
      return;
    }
    
    if (deadline === '') {
      alert('Please select a deadline');
      return;
    }
    
    const newGoal = {
      name: goalName,
      targetAmount: Number(targetAmount),
      category: category,
      deadline: deadline
    };
    
    
    onAddGoal(newGoal);
    
    
    setGoalName('');
    setTargetAmount('');
    setCategory('');
    setDeadline('');
  };

 
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  
  const categories = [
    'Travel',
    'Emergency', 
    'Electronics',
    'Real Estate',
    'Vehicle',
    'Education',
    'Shopping',
    'Retirement',
    'Home',
    'Other'
  ];

 
  let categoryOptions = [];
  categoryOptions.push(
    <option key="default" value="">Choose category</option>
  );
  
  for (let i = 0; i < categories.length; i++) {
    categoryOptions.push(
      <option key={categories[i]} value={categories[i]}>
        {categories[i]}
      </option>
    );
  }

  return (
    <div className="goal-form-container">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        
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

        <div className="form-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categoryOptions}
          </select>
        </div>

        <div className="form-group">
          <label>Deadline:</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={todayString}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;