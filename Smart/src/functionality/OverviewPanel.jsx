import PropTypes from 'prop-types';

const OverviewPanel = ({ goals }) => {
  // Calculate total number of goals
  const totalGoals = goals.length;
  
  // Calculate total money saved across all goals
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  
  // Calculate number of completed goals
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  // Calculate number of goals with approaching deadlines (within 30 days)
  const today = new Date();
  const approachingDeadlines = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft > 0 && goal.savedAmount < goal.targetAmount;
  }).length;
  
  // Calculate number of overdue goals
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
};

OverviewPanel.propTypes = {
  goals: PropTypes.array.isRequired
};

export default OverviewPanel;