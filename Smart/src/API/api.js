// API endpoints for interacting with json-server
// Use environment variable for API URL or fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// For deployment without a backend, use this mock data
const mockGoals = [
  {
    "id": "1",
    "name": "Travel Fund - Japan",
    "targetAmount": 5000,
    "savedAmount": 10200,
    "category": "Travel",
    "deadline": "2025-12-31",
    "createdAt": "2024-01-15"
  },
  {
    "id": "2",
    "name": "Emergency Fund",
    "targetAmount": 10000,
    "savedAmount": 8000,
    "category": "Emergency",
    "deadline": "2026-06-30",
    "createdAt": "2023-05-01"
  },
  {
    "id": "3",
    "name": "New Laptop",
    "targetAmount": 1500,
    "savedAmount": 1500,
    "category": "Electronics",
    "deadline": "2024-07-20",
    "createdAt": "2024-03-10"
  },
  {
    "id": "4",
    "name": "Down Payment - House",
    "targetAmount": 50000,
    "savedAmount": 12000,
    "category": "Real Estate",
    "deadline": "2027-12-31",
    "createdAt": "2024-02-01"
  },
  {
    "id": "5",
    "name": "Car Maintenance",
    "targetAmount": 800,
    "savedAmount": 600,
    "category": "Vehicle",
    "deadline": "2025-09-15",
    "createdAt": "2024-06-01"
  },
  {
    "id": "6",
    "name": "Education Fund",
    "targetAmount": 20000,
    "savedAmount": 5000,
    "category": "Education",
    "deadline": "2028-01-01",
    "createdAt": "2024-04-20"
  },
  {
    "id": "7",
    "name": "Holiday Gifts",
    "targetAmount": 1000,
    "savedAmount": 200,
    "category": "Shopping",
    "deadline": "2024-08-10",
    "createdAt": "2024-07-01"
  },
  {
    "id": "8",
    "name": "New Phone",
    "targetAmount": 1200,
    "savedAmount": 0,
    "category": "Electronics",
    "deadline": "2025-01-31",
    "createdAt": "2024-07-10"
  },
  {
    "id": "9",
    "name": "Retirement Savings",
    "targetAmount": 100000,
    "savedAmount": 15000,
    "category": "Retirement",
    "deadline": "2035-01-01",
    "createdAt": "2023-01-01"
  },
  {
    "id": "10",
    "name": "Home Renovation",
    "targetAmount": 7500,
    "savedAmount": 1000,
    "category": "Home",
    "deadline": "2025-03-31",
    "createdAt": "2024-05-15"
  }
];

// Check if we're in a deployed environment without a backend
const isDeployedWithoutBackend = !import.meta.env.DEV && !import.meta.env.VITE_API_URL;

// Fetch all goals
export const fetchGoals = async () => {
  // Use mock data if deployed without backend
  if (isDeployedWithoutBackend) {
    console.log('Using mock data for goals');
    return Promise.resolve([...mockGoals]);
  }
  
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
  // Use mock data if deployed without backend
  if (isDeployedWithoutBackend) {
    console.log('Adding mock goal');
    const newGoal = {
      ...goalData,
      id: String(Date.now())
    };
    mockGoals.push(newGoal);
    return Promise.resolve(newGoal);
  }
  
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
  // Use mock data if deployed without backend
  if (isDeployedWithoutBackend) {
    console.log('Updating mock goal');
    const index = mockGoals.findIndex(goal => goal.id === id);
    if (index !== -1) {
      mockGoals[index] = { ...mockGoals[index], ...goalData };
      return Promise.resolve(mockGoals[index]);
    }
    return Promise.reject(new Error('Goal not found'));
  }
  
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
  // Use mock data if deployed without backend
  if (isDeployedWithoutBackend) {
    console.log('Deleting mock goal');
    const index = mockGoals.findIndex(goal => goal.id === id);
    if (index !== -1) {
      mockGoals.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(true);
  }
  
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
  // Use mock data if deployed without backend
  if (isDeployedWithoutBackend) {
    console.log('Making mock deposit');
    const index = mockGoals.findIndex(goal => goal.id === id);
    if (index !== -1) {
      mockGoals[index].savedAmount += Number(amount);
      return Promise.resolve({...mockGoals[index]});
    }
    return Promise.reject(new Error('Goal not found'));
  }
  
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