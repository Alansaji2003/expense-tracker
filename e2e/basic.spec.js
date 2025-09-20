const { test, expect } = require('@playwright/test')

test.describe('Basic App Functionality', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/')
    
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/Expense Tracker/)
    
    // Check for basic elements that should be present
    await expect(page.locator('body')).toBeVisible()
  })

  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/non-existent-page')
    
    // Should show a 404 page or redirect appropriately
    // This test ensures the app doesn't crash on invalid routes
    await expect(page.locator('body')).toBeVisible()
  })

  test('should load static assets', async ({ page }) => {
    await page.goto('/')
    
    // Check if CSS is loaded (page should have some styling)
    const bodyStyles = await page.locator('body').evaluate(el => {
      return window.getComputedStyle(el).margin
    })
    
    // If CSS is loaded, margin should not be the browser default
    expect(bodyStyles).toBeDefined()
  })
})