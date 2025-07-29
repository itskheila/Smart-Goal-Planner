function OverviewPanel({ goals }) {
  

  const totalGoals = goals.length;
  
  
  let totalSaved = 0;
  for (let i = 0; i < goals.length; i++) {
    totalSaved = totalSaved + goals[i].savedAmount;
  }
  
  
  let completedGoals = 0;
  for (let i = 0; i < goals.length; i++) {
    if (goals[i].savedAmount >= goals[i].targetAmount) {
      completedGoals = completedGoals + 1;
    }
  }
  
  
  let approachingDeadlines = 0;
  const today = new Date();
  
  for (let i = 0; i < goals.length; i++) {
    const goal = goals[i];
    const deadlineDate = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    //  To check if goal is approaching deadline
    if (daysLeft <= 30 && daysLeft > 0 && goal.savedAmount < goal.targetAmount) {
      approachingDeadlines = approachingDeadlines + 1;
    }
  }
  
  
  let overdueGoals = 0;
  for (let i = 0; i < goals.length; i++) {
    const goal = goals[i];
    const deadlineDate = new Date(goal.deadline);
    
    // Check if goal is overdue
    if (deadlineDate < today && goal.savedAmount < goal.targetAmount) {
      overdueGoals = overdueGoals + 1;
    }
  }

  return (
    <div className="overview-panel">
      <h2>Your Goals Summary</h2>
      
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
          <h3>Completed</h3>
          <p className="stat-value">{completedGoals}</p>
        </div>
        
        <div className="stat-card">
          <h3>Due Soon</h3>
          <p className="stat-value">{approachingDeadlines}</p>
        </div>
        
        <div className="stat-card">
          <h3>Overdue</h3>
          <p className="stat-value">{overdueGoals}</p>
        </div>
        
      </div>
    </div>
  );
}

export default OverviewPanel;