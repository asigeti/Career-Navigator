// src/services/emailService.ts
type EmailTemplate = 'welcome' | 'task_reminder' | 'progress_update' | 'upgrade_offer';

interface EmailData {
  to: string;
  subject: string;
  body: string;
  templateData?: Record<string, any>;
}

export const sendEmail = async (template: EmailTemplate, data: EmailData): Promise<boolean> => {
  // In a real application, this would connect to an email service like SendGrid, Mailchimp, etc.
  // For now, we'll just log the email that would be sent
  console.log(`Sending ${template} email to ${data.to}`);
  console.log(`Subject: ${data.subject}`);
  console.log(`Body: ${data.body}`);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return success
  return true;
};

export const getEmailTemplate = (template: EmailTemplate, data: Record<string, any>): string => {
  switch (template) {
    case 'welcome':
      return `
        <h1>Welcome to AI Career Navigator!</h1>
        <p>Hi ${data.name || 'there'},</p>
        <p>Thank you for investing in your future with AI Career Navigator. Your personalized career roadmap is now ready for you.</p>
        <p><a href="${data.dashboardUrl}">View Your Implementation Dashboard</a></p>
        <p>We're excited to help you navigate the changing landscape of work in the AI era.</p>
        <p>Best regards,<br>The AI Career Navigator Team</p>
      `;
    
    case 'task_reminder':
      return `
        <h1>Task Reminder: ${data.taskTitle}</h1>
        <p>Hi ${data.name || 'there'},</p>
        <p>This is a friendly reminder that your task "${data.taskTitle}" is due on ${data.dueDate}.</p>
        <p><a href="${data.dashboardUrl}">View Your Dashboard</a></p>
        <p>Staying on track with your career transition plan is key to success.</p>
        <p>Best regards,<br>The AI Career Navigator Team</p>
      `;
    
    case 'progress_update':
      return `
        <h1>Your Career Transition Progress</h1>
        <p>Hi ${data.name || 'there'},</p>
        <p>You've made great progress on your career transition plan!</p>
        <ul>
          <li>Tasks Completed: ${data.completedTasks} of ${data.totalTasks}</li>
          <li>Overall Progress: ${data.progressPercentage}%</li>
          ${data.skillsImproved ? `<li>Skills Improved: ${data.skillsImproved.join(', ')}</li>` : ''}
        </ul>
        <p><a href="${data.dashboardUrl}">View Your Full Progress</a></p>
        <p>Keep up the good work!</p>
        <p>Best regards,<br>The AI Career Navigator Team</p>
      `;
    
    case 'upgrade_offer':
      return `
        <h1>Special Upgrade Offer Just For You</h1>
        <p>Hi ${data.name || 'there'},</p>
        <p>We've noticed you're making great progress with your career transition plan. To help you stay ahead of AI developments, we'd like to offer you a special upgrade to our Annual Plan.</p>
        <p><strong>Special Offer: $399</strong> (Regular price: $489)</p>
        <p>Your $89 payment will be applied as credit!</p>
        <p><a href="${data.upgradeUrl}">Upgrade Now</a></p>
        <p>This offer expires in ${data.daysRemaining} days.</p>
        <p>Best regards,<br>The AI Career Navigator Team</p>
      `;
    
    default:
      return '';
  }
};