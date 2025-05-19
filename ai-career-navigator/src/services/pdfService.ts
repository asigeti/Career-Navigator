// src/services/pdfService.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId: string, filename: string): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }
    
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const generateStructuredPDF = (reportData: any, userData: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const pdf = new jsPDF();
      
      // Add header with logo
      // pdf.addImage(logoBase64, 'PNG', 10, 10, 30, 30);
      
      // Add title
      pdf.setFontSize(22);
      pdf.setTextColor(33, 33, 33);
      pdf.text('AI Career Navigator', 105, 20, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.text('Career Transition Report', 105, 30, { align: 'center' });
      
      // Add user info
      pdf.setFontSize(12);
      pdf.text(`Prepared for: ${userData.email}`, 20, 40);
      pdf.text(`Job Title: ${userData.job_title}`, 20, 48);
      pdf.text(`Industry: ${userData.industry}`, 20, 56);
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 64);
      
      // Add risk assessment
      pdf.setFillColor(240, 240, 240);
      pdf.rect(20, 74, 170, 40, 'F');
      
      pdf.setFontSize(14);
      pdf.setTextColor(33, 33, 33);
      pdf.text('AI Risk Assessment', 30, 84);
      
      pdf.setFontSize(12);
      pdf.text(`Risk Score: ${reportData.riskScore}%`, 30, 92);
      pdf.text(`Timeframe: ${reportData.timeframe}`, 30, 100);
      
      // Add insights
      pdf.setFontSize(14);
      pdf.text('Key Insights:', 20, 124);
      
      pdf.setFontSize(11);
      reportData.insights.forEach((insight: string, index: number) => {
        pdf.text(`• ${insight}`, 25, 134 + (index * 8));
      });
      
      const insightsEndY = 134 + (reportData.insights.length * 8) + 10;
      
      // Add recommendations
      pdf.setFontSize(14);
      pdf.text('Strategic Recommendations:', 20, insightsEndY);
      
      pdf.setFontSize(11);
      reportData.recommendations.forEach((recommendation: string, index: number) => {
        pdf.text(`• ${recommendation}`, 25, insightsEndY + 10 + (index * 8));
      });
      
      const recommendationsEndY = insightsEndY + 10 + (reportData.recommendations.length * 8) + 10;
      
      // Check if we need a new page
      if (recommendationsEndY > 270) {
        pdf.addPage();
      }
      
      // Add footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`AI Career Navigator - Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
      }
      
      // Convert to base64
      const pdfBase64 = pdf.output('datauristring');
      resolve(pdfBase64);
    } catch (error) {
      console.error('Error generating structured PDF:', error);
      reject(error);
    }
  });
};