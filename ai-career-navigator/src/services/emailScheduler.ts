// src/services/emailScheduler.ts
import { sendEmail, getEmailTemplate } from './emailService';

// This would typically be managed by a backend service
// For demonstration purposes, we'll implement a simple version here
export const scheduleTaskReminders = async (
  userEmail: string, 
  userName: string,
  dashboardUrl: string,
  tasks: Array<{
    id: string;
    title: string;
    dueDate?: string;
    completed: boolean;
  }>
): Promise<void> => {
  // Get upcoming tasks (due within the next 3 days but not completed)
  const now = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(now.getDate() + 3);
  
  const upcomingTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    
    const dueDate = new Date(task.dueDate);
    return dueDate >= now && dueDate <= threeDaysFromNow;
  });
  
  // Schedule reminder emails for each upcoming task
  for (const task of upcomingTasks) {
    if (!task.dueDate) continue;
    
    const dueDate = new Date(task.dueDate);
    const formattedDueDate = dueDate.toLocaleDateString();
    
    // In a real application, this would create a scheduled job
    // For demonstration, we'll just log it
    console.log(`Scheduled reminder for task "${task.title}" due on ${formattedDueDate}`);
    
    // Simulate sending the email (would be triggered by a scheduler in production)
    await sendEmail('task_reminder', {
      to: userEmail,
      subject: `Reminder: Task "${task.title}" due on ${formattedDueDate}`,
      body: getEmailTemplate('task_reminder', {
        name: userName,
        taskTitle: task.title,
        dueDate: formattedDueDate,
        dashboardUrl
      })
    });
  }
};

export const scheduleProgressUpdates = async (
  userEmail: string,
  userName: string,
  dashboardUrl: string,
  progressData: {
    completedTasks: number;
    totalTasks: number;
    progressPercentage: number;
    skillsImproved?: string[];
  }
): Promise<void> => {
  // In a real application, this would create a weekly scheduled job
  // For demonstration, we'll just log it
  console.log(`Scheduled weekly progress update for ${userEmail}`);
  
  // Simulate sending the email (would be triggered by a scheduler in production)
  await sendEmail('progress_update', {
    to: userEmail,
    subject: 'Your Career Transition Progress Update',
    body: getEmailTemplate('progress_update', {
      name: userName,
      dashboardUrl,
      ...progressData
    })
  });
};

export const scheduleUpgradeOffer = async (
  userEmail: string,
  userName: string,
  upgradeUrl: string,
  daysRemaining: number
): Promise<void> => {
  // In a real application, this would be triggered based on user engagement
  // For demonstration, we'll just log it
  console.log(`Scheduled upgrade offer for ${userEmail} (expires in ${daysRemaining} days)`);
  
  // Simulate sending the email
  await sendEmail('upgrade_offer', {
    to: userEmail,
    subject: 'Special Upgrade Offer - Limited Time Only',
    body: getEmailTemplate('upgrade_offer', {
      name: userName,
      upgradeUrl,
      daysRemaining
    })
  });
};