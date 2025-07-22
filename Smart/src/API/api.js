// API endpoints for interacting with json-server
const BASE_URL = 'http://localhost:3000';

// Fetch all goals
export const fetchGoals = async () => {
  try {
    const response = await fetch(`${BASE_URL}/goals`);
    if (!response.ok) {
      throw new Error('Failed to fetch goals');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

// Add a new goal
export const addGoal = async (goalData) => {
  try {
    const response = await fetch(`${BASE_URL}/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goalData),
    });
    if (!response.ok) {
      throw new Error('Failed to add goal');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding goal:', error);
    throw error;
  }
};

// Update a goal
export const updateGoal = async (id, goalData) => {
  try {
    const response = await fetch(`${BASE_URL}/goals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goalData),
    });
    if (!response.ok) {
      throw new Error('Failed to update goal');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

// Delete a goal
export const deleteGoal = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/goals/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete goal');
    }
    return true;
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw error;
  }
};

// Make a deposit to a goal
export const makeDeposit = async (id, amount) => {
  try {
    // First, get the current goal to get the current savedAmount
    const goalResponse = await fetch(`${BASE_URL}/goals/${id}`);
    if (!goalResponse.ok) {
      throw new Error('Failed to fetch goal for deposit');
    }
    
    const goal = await goalResponse.json();
    const newSavedAmount = goal.savedAmount + Number(amount);
    
    // Update the goal with the new savedAmount
    const response = await fetch(`${BASE_URL}/goals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ savedAmount: newSavedAmount }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to make deposit');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error making deposit:', error);
    throw error;
  }
};