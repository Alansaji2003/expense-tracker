import { generateFinancialInsights, generateQuickTips } from '../../utils/aiService'
import OpenAI from 'openai'

// Mock OpenAI
jest.mock('openai')

// Mock the OpenAI module properly
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn()
      }
    }
  }))
})

describe('AI Service', () => {
  let mockOpenAI

  beforeEach(() => {
    // Get the mocked OpenAI constructor
    const OpenAIConstructor = require('openai')
    mockOpenAI = new OpenAIConstructor()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('generateFinancialInsights', () => {
    const mockFinancialData = {
      budgets: [
        { 
          name: 'Food', 
          amount: 500, 
          totalSpend: 450,
          category: 'Food',
          utilizationPercentage: 90
        }
      ],
      recentTransactions: [
        { 
          name: 'Grocery Store', 
          amount: 85, 
          category: 'Food',
          createdAt: new Date().toISOString()
        }
      ],
      summary: {
        totalBudget: 1000,
        totalSpent: 450,
        remainingBudget: 550,
        budgetUtilizationPercentage: 45,
        totalTransactions: 1,
        averageTransactionAmount: 85
      },
      categorySpending: [
        { category: 'Food', totalAmount: 450, transactionCount: 1 }
      ],
      monthlySpending: [
        { month: 'January 2024', totalAmount: 450 }
      ]
    }

    it('should generate financial insights successfully', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'Your finances look good overall. You are managing your budget well.'
          }
        }],
        usage: { total_tokens: 100 }
      }
      mockOpenAI.chat.completions.create.mockResolvedValue(mockResponse)

      const result = await generateFinancialInsights(mockFinancialData)

      expect(result.success).toBe(true)
      expect(result.response).toBe('Your finances look good overall. You are managing your budget well.')
      expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith({
        model: 'gpt-3.5-turbo',
        messages: expect.arrayContaining([
          expect.objectContaining({
            role: 'system',
            content: expect.stringContaining('financial advisor')
          })
        ]),
        max_tokens: 800,
        temperature: 0.7
      })
    })

    it('should handle OpenAI API errors', async () => {
      const error = new Error('API rate limit exceeded')
      mockOpenAI.chat.completions.create.mockRejectedValue(error)

      const result = await generateFinancialInsights(mockFinancialData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('API rate limit exceeded')
    })

    it('should handle new users with no data', async () => {
      const emptyData = {
        budgets: [],
        recentTransactions: [],
        summary: { totalBudget: 0, totalSpent: 0, remainingBudget: 0, budgetUtilizationPercentage: 0, totalTransactions: 0, averageTransactionAmount: 0 },
        categorySpending: [],
        monthlySpending: []
      }

      const mockResponse = {
        choices: [{
          message: {
            content: 'Welcome! Let me help you get started with budgeting.'
          }
        }],
        usage: { total_tokens: 50 }
      }
      mockOpenAI.chat.completions.create.mockResolvedValue(mockResponse)

      const result = await generateFinancialInsights(emptyData)

      expect(result.success).toBe(true)
      expect(result.response).toContain('Welcome')
    })
  })

  describe('generateQuickTips', () => {
    const mockFinancialData = {
      summary: {
        budgetUtilizationPercentage: 75,
        remainingBudget: 250
      },
      categorySpending: [
        { category: 'Food', totalAmount: 450 },
        { category: 'Entertainment', totalAmount: 200 }
      ],
      budgets: [
        { utilizationPercentage: 90 },
        { utilizationPercentage: 120 }
      ]
    }

    it('should generate quick tips successfully', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: '• Track your spending daily\n• Set up automatic savings\n• Review budgets monthly'
          }
        }]
      }
      mockOpenAI.chat.completions.create.mockResolvedValue(mockResponse)

      const result = await generateQuickTips(mockFinancialData)

      expect(result.success).toBe(true)
      expect(result.tips).toHaveLength(3)
      expect(result.tips[0]).toBe('Track your spending daily')
    })

    it('should provide fallback tips on error', async () => {
      const error = new Error('API error')
      mockOpenAI.chat.completions.create.mockRejectedValue(error)

      const result = await generateQuickTips(mockFinancialData)

      expect(result.success).toBe(false)
      expect(result.tips).toHaveLength(3)
      expect(result.tips[0]).toContain('Track your spending')
    })
  })
})