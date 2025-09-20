import { NextResponse } from 'next/server';
import { getUserFinancialData } from '@/utils/financialDataService';
import { generateFinancialInsights } from '@/utils/aiService';

export async function POST(req) {
  try {
    const { userEmail, question } = await req.json();

    if (!userEmail) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 });
    }

    // Get user's financial data
    const financialData = await getUserFinancialData(userEmail);

    // Generate AI response
    const aiResponse = await generateFinancialInsights(financialData, question);

    return NextResponse.json({
      success: true,
      response: aiResponse.response,
      financialSummary: {
        totalBudget: financialData.summary.totalBudget,
        totalSpent: financialData.summary.totalSpent,
        remainingBudget: financialData.summary.remainingBudget,
        utilizationPercentage: financialData.summary.budgetUtilizationPercentage,
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in AI chat:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process your question',
        details: error.message 
      },
      { status: 500 }
    );
  }
}