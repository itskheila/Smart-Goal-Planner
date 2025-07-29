function OverviewPanel({ goals }) {
  // Count total number of goals
  const totalGoals = goals.length;
  
  // Calculate total money saved across all goals
  const totalSaved = goals.reduce((total, goal) => total + goal.savedAmount, 0);
  
  // Count completed goals
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  // Count goals with deadlines approaching (within 30 days)
  const today = new Date();
  const approachingDeadlines = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft > 0 && goal.savedAmount < goal.targetAmount;
  }).length;
  
  // Count overdue goals
  const overdueGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    return deadlineDate < today && goal.savedAmount < goal.targetAmount;
  }).length;

  return (
    <div className="overview-panel">
      <h2>Your Goals Summary</h2>
      
      <div className="overview-stats">
        {/* Total goals */}
        <div className="stat-card">
          <h3>Total Goals</h3>
          <p className="stat-value">{totalGoals}</p>
        </div>
        
        {/* Total money saved */}
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p className="stat-value">Ksh {totalSaved.toLocaleString()}</p>
        </div>
        
        {/* Completed goals */}
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-value">{completedGoals}</p>
        </div>
        
        {/* Goals with approaching deadlines */}
        <div className="stat-card">
          <h3>Due Soon</h3>
          <p className="stat-value">{approachingDeadlines}</p>
        </div>
        
        {/* Overdue goals */}
        <div className="stat-card">
          <h3>Overdue</h3>
          <p className="stat-value">{overdueGoals}</p>
        </div>
      </div>
    </div>
  );
}

export default OverviewPanel;