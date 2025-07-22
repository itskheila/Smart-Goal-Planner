import { useState, useEffect } from 'react';
import { fetchGoals, addGoal, updateGoal, deleteGoal, makeDeposit } from './API/api';
import GoalList from './functionality/GoalList';
import GoalForm from './functionality/GoalForm';
import DepositForm from './functionality/DepositForm';
import OverviewPanel from './functionality/OverviewPanel';
import './index.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch goals on component mount
  useEffect(() => {
    const getGoals = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGoals();
        setGoals(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch goals. Please make sure json-server is running.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getGoals();
  }, []);

  // Handle adding a new goal
  const handleAddGoal = async (newGoalData) => {
    try {
      setIsLoading(true);
      const addedGoal = await addGoal(newGoalData);
      setGoals(prevGoals => [...prevGoals, addedGoal]);
    } catch (err) {
      setError('Failed to add goal');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a goal
  const handleDeleteGoal = async (goalId) => {
    try {
      setIsLoading(true);
      await deleteGoal(goalId);
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
    } catch (err) {
      setError('Failed to delete goal');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle making a deposit to a goal
  const handleDeposit = async (goalId, amount) => {
    try {
      setIsLoading(true);
      const updatedGoal = await makeDeposit(goalId, amount);
      setGoals(prevGoals => 
        prevGoals.map(goal => 
          goal.id === goalId ? updatedGoal : goal
        )
      );
    } catch (err) {
      setError('Failed to make deposit');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Smart Goal Planner</h1>
        <p>Track and manage your financial goals</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="app-content">
        <div className="left-panel">
          <GoalForm onAddGoal={handleAddGoal} />
          <DepositForm goals={goals} onDeposit={handleDeposit} />
        </div>

        <div className="right-panel">
          <OverviewPanel goals={goals} />
          
          {isLoading ? (
            <div className="loading">Loading goals...</div>
          ) : (
            <GoalList 
              goals={goals} 
              onDeleteGoal={handleDeleteGoal} 
              onDepositToGoal={handleDeposit} 
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Smart Goal Planner &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;