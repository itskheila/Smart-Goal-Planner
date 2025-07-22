# Smart Goal Planner

A React application for managing financial goals, tracking progress, and making deposits.

## Features

- Create, read, update, and delete financial goals
- Track progress for each goal with visual progress bars
- Make deposits to any goal
- View overview statistics of all goals
- Warning indicators for approaching deadlines and overdue goals

## Technologies Used

- React
- json-server for API simulation
- CSS for styling

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```
   cd Smart-Goal-Planner/Smart
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the Application Locally

1. Start the json-server (in one terminal):
   ```
   npm run server
   ```

2. Start the React application (in another terminal):
   ```
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

### Deployment

The application can be deployed to platforms like Vercel or Netlify:

1. Build the application:
   ```
   npm run build
   ```

2. Deploy the `dist` folder to your hosting platform

#### Notes for Deployment

- When deployed without a backend, the application will use mock data
- To connect to a real backend API, set the `VITE_API_URL` environment variable in your deployment platform

## Usage

- **Add a New Goal**: Fill out the form in the left panel with goal details and click "Add Goal"
- **Make a Deposit**: Select a goal from the dropdown, enter an amount, and click "Make Deposit"
- **Delete a Goal**: Click the "Delete Goal" button on any goal card
- **View Progress**: Each goal card shows a progress bar and details about the goal's status

## Project Structure

- `src/API/api.js`: API functions for interacting with json-server
- `src/functionality/`: Components for different features
  - `GoalCard.jsx`: Individual goal display with progress tracking
  - `GoalList.jsx`: List of all goals
  - `GoalForm.jsx`: Form for adding new goals
  - `DepositForm.jsx`: Form for making deposits
  - `OverviewPanel.jsx`: Summary statistics of all goals
- `src/App.jsx`: Main application component
- `src/index.css`: Styling for the application