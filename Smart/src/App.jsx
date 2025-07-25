import React, { useState, useEffect } from 'react';
import './index.css';

// Simple API functions
const API_URL = 'https://my-json-server.typicode.com/itskheila/Smart-Goal-Planner';


// Mock data for when deployed without backend
const sampleGoals = [
  {
    id: "1",
    name: "Travel Fund - Japan",
    targetAmount: 5000,
    savedAmount: 10200,
    category: "Travel",
    deadline: "2025-12-31",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Emergency Fund",
    targetAmount: 10000,
    savedAmount: 8000,
    category: "Emergency",
    deadline: "2026-06-30",
    createdAt: "2023-05-01"
  },
  {
    id: "3",
    name: "New Laptop",
    targetAmount: 1500,
    savedAmount: 1500,
    category: "Electronics",
    deadline: "2024-07-20",
    createdAt: "2024-03-10"
  },
  {
    id: "4",
    name: "Down Payment - House",
    targetAmount: 50000,
    savedAmount: 12000,
    category: "Real Estate",
    deadline: "2027-12-31",
    createdAt: "2024-02-01"
  },
  {
    id: "5",
    name: "Car Maintenance",
    targetAmount: 800,
    savedAmount: 600,
    category: "Vehicle",
    deadline: "2025-09-15",
    createdAt: "2024-06-01"
  },
  {
    id: "6",
    name: "Education Fund",
    targetAmount: 20000,
    savedAmount: 5000,
    category: "Education",
    deadline: "2028-01-01",
    createdAt: "2024-04-20"
  },
  {
    id: "7",
    name: "Holiday Gifts",
    targetAmount: 1000,
    savedAmount: 200,
    category: "Shopping",
    deadline: "2024-08-10",
    createdAt: "2024-07-01"
  },
  {
    id: "8",
    name: "New Phone",
    targetAmount: 1200,
    savedAmount: 0,
    category: "Electronics",
    deadline: "2025-01-31",
    createdAt: "2024-07-10"
  },
  {
    id: "9",
    name: "Retirement Savings",
    targetAmount: 100000,
    savedAmount: 15000,
    category: "Retirement",
    deadline: "2035-01-01",
    createdAt: "2023-01-01"
  },
  {
    id: "10",
    name: "Home Renovation",
    targetAmount: 7500,
    savedAmount: 1000,
    category: "Home",
    deadline: "2025-03-31",
    createdAt: "2024-05-15"
  }
];

function App() {
  // State to store all goals
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load goals when app starts
  useEffect(() => {
    loadGoals();
  }, []);

  // Function to load goals from server or use sample data
  const loadGoals = async () => {
    try {
      setLoading(true);
      // Try to fetch from server, if it fails use sample data
      const response = await fetch(`${API_URL}/goals`);
      if (response.ok) {
        const data = await response.json();
        setGoals(data);
      } else {
        // Use sample data if server is not available
        setGoals(sampleGoals);
      }
    } catch (err) {
      // Use sample data if there's an error
      setGoals(sampleGoals);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new goal
  const addNewGoal = async (newGoal) => {
    try {
      const goalWithId = {
        ...newGoal,
        id: String(Date.now()),
        savedAmount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };

      // Try to save to server
      const response = await fetch(`${API_URL}/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalWithId)
      });

      if (response.ok) {
        const savedGoal = await response.json();
        setGoals([...goals, savedGoal]);
      } else {
        // If server fails, just add to local state
        setGoals([...goals, goalWithId]);
      }
    } catch (err) {
      // If server fails, just add to local state
      const goalWithId = {
        ...newGoal,
        id: String(Date.now()),
        savedAmount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setGoals([...goals, goalWithId]);
    }
  };

  // Function to delete a goal
  const deleteGoal = async (goalId) => {
    try {
      // Try to delete from server
      await fetch(`${API_URL}/goals/${goalId}`, { method: 'DELETE' });
    } catch (err) {
      // Continue even if server fails
    }
    // Remove from local state
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  // Function to add money to a goal
  const addMoneyToGoal = async (goalId, amount) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      const newAmount = goal.savedAmount + Number(amount);

      // Try to update on server
      const response = await fetch(`${API_URL}/goals/${goalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedAmount: newAmount })
      });

      // Update local state regardless of server response
      setGoals(goals.map(g => 
        g.id === goalId ? { ...g, savedAmount: newAmount } : g
      ));
    } catch (err) {
      // Update local state even if server fails
      setGoals(goals.map(g => 
        g.id === goalId ? { ...g, savedAmount: g.savedAmount + Number(amount) } : g
      ));
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>Smart Goal Planner</h1>
        <p>Track and manage your financial goals</p>
      </header>

      {/* Show error if any */}
      {error && <div className="error-message">{error}</div>}

      {/* Main content */}
      <main className="app-content">
        {/* Left side - Forms */}
        <div className="left-panel">
          <AddGoalForm onAddGoal={addNewGoal} />
          <DepositForm goals={goals} onDeposit={addMoneyToGoal} />
        </div>

        {/* Right side - Goals display */}
        <div className="right-panel">
          <OverviewStats goals={goals} />
          
          {loading ? (
            <div className="loading">Loading goals...</div>
          ) : (
            <GoalsList goals={goals} onDelete={deleteGoal} onDeposit={addMoneyToGoal} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Smart Goal Planner &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

// Component to add new goals
function AddGoalForm({ onAddGoal }) {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new goal object
    const newGoal = {
      name: goalName,
      targetAmount: Number(targetAmount),
      category: category,
      deadline: deadline
    };
    
    // Send to parent component
    onAddGoal(newGoal);
    
    // Clear form
    setGoalName('');
    setTargetAmount('');
    setCategory('');
    setDeadline('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="goal-form-container">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label>Goal Name:</label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="e.g., Travel Fund, Emergency Fund"
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

// Component to make deposits
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
      <form onSubmit={handleSubmit} className="deposit-form">
        <div className="form-group">
          <label>Select Goal:</label>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
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
          <label>Amount (Ksh):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 100"
            min="1"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Make Deposit</button>
      </form>
    </div>
  );
}

// Component to show overview statistics
function OverviewStats({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  const today = new Date();
  const approachingDeadlines = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft > 0 && goal.savedAmount < goal.targetAmount;
  }).length;
  
  const overdueGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    return deadlineDate < today && goal.savedAmount < goal.targetAmount;
  }).length;

  return (
    <div className="overview-panel">
      <h2>Goals Overview</h2>
      <div className="overview-stats">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <p className="stat-value">{totalGoals}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p className="stat-value">Ksh {totalSaved.toLocaleString()}</p>
        </div>
        
        <div className="stat-card">
          <h3>Completed Goals</h3>
          <p className="stat-value">{completedGoals}</p>
        </div>
        
        <div className="stat-card">
          <h3>Approaching Deadlines</h3>
          <p className="stat-value">{approachingDeadlines}</p>
        </div>
        
        <div className="stat-card">
          <h3>Overdue Goals</h3>
          <p className="stat-value">{overdueGoals}</p>
        </div>
      </div>
    </div>
  );
}

// Component to display all goals
function GoalsList({ goals, onDelete, onDeposit }) {
  if (goals.length === 0) {
    return <p className="no-goals">No goals found. Add a new goal to get started!</p>;
  }

  return (
    <div className="goal-list">
      {goals.map(goal => (
        <GoalCard 
          key={goal.id} 
          goal={goal} 
          onDelete={onDelete}
          onDeposit={onDeposit}
        />
      ))}
    </div>
  );
}

// Component for individual goal card
function GoalCard({ goal, onDelete, onDeposit }) {
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  // Calculate progress
  const progressPercentage = Math.min(
    Math.round((goal.savedAmount / goal.targetAmount) * 100),
    100
  );
  const remainingAmount = goal.targetAmount - goal.savedAmount;

  // Calculate days left
  const today = new Date();
  const deadlineDate = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  // Determine status
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isOverdue = daysLeft < 0 && !isCompleted;
  const isWarning = daysLeft <= 30 && daysLeft > 0 && !isCompleted;

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (depositAmount && Number(depositAmount) > 0) {
      onDeposit(goal.id, Number(depositAmount));
      setDepositAmount('');
      setShowDepositForm(false);
    }
  };

  let cardClass = 'goal-card';
  if (isCompleted) cardClass += ' completed';
  if (isOverdue) cardClass += ' overdue';
  if (isWarning) cardClass += ' warning';

  return (
    <div className={cardClass}>
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

      {/* Progress bar */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <span className="progress-text">{progressPercentage}%</span>
      </div>

      {/* Action buttons */}
      <div className="goal-actions">
        <button onClick={() => setShowDepositForm(!showDepositForm)}>
          {showDepositForm ? 'Cancel' : 'Make Deposit'}
        </button>
        <button onClick={() => onDelete(goal.id)}>Delete Goal</button>
      </div>

      {/* Deposit form */}
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
          <button type="submit">Deposit</button>
        </form>
      )}
    </div>
  );
}

export default App;