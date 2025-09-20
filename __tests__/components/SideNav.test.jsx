import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import SideNav from '../../app/(routes)/dashboard/_components/SideNav'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }) {
    return <img src={src} alt={alt} {...props} />
  }
})

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }) {
    return <a href={href}>{children}</a>
  }
})

describe('SideNav Component', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/dashboard')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders navigation menu items', () => {
    render(<SideNav />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Budgets')).toBeInTheDocument()
    expect(screen.getByText('Transactions')).toBeInTheDocument()
    expect(screen.getByText('AI Advisor')).toBeInTheDocument()
    expect(screen.getByText('Buy me a Coffee')).toBeInTheDocument()
  })

  it('highlights active menu item', () => {
    usePathname.mockReturnValue('/dashboard/budgets')
    render(<SideNav />)

    const budgetsItem = screen.getByText('Budgets').closest('h2')
    expect(budgetsItem).toHaveClass('text-primary', 'bg-rose-100')
  })

  it('navigates to correct routes', () => {
    render(<SideNav />)

    const dashboardLink = screen.getByText('Dashboard').closest('a')
    const budgetsLink = screen.getByText('Budgets').closest('a')
    const transactionsLink = screen.getByText('Transactions').closest('a')

    expect(dashboardLink).toHaveAttribute('href', '/dashboard')
    expect(budgetsLink).toHaveAttribute('href', '/dashboard/budgets')
    expect(transactionsLink).toHaveAttribute('href', '/dashboard/transactions')
  })

  it('displays app branding', () => {
    render(<SideNav />)

    expect(screen.getByText('Bixpense')).toBeInTheDocument()
    expect(screen.getByAltText('logo')).toBeInTheDocument()
  })

  it('displays user profile section', () => {
    render(<SideNav />)

    expect(screen.getByText('Profile')).toBeInTheDocument()
    // UserButton is mocked to render "User Button" text
    expect(screen.getByText('User Button')).toBeInTheDocument()
  })

  it('shows reminders menu for admin users', () => {
    // Mock admin user
    const mockUser = {
      primaryEmailAddress: {
        emailAddress: 'mailalantest@gmail.com'
      }
    }
    
    // Mock useUser for this test
    const { useUser } = require('@clerk/nextjs')
    useUser.mockReturnValue({ user: mockUser })
    
    render(<SideNav />)

    expect(screen.getByText('Reminders')).toBeInTheDocument()
  })

  it('hides reminders menu for non-admin users', () => {
    // Mock non-admin user
    const mockUser = {
      primaryEmailAddress: {
        emailAddress: 'regular@example.com'
      }
    }
    
    // Mock useUser for this test
    const { useUser } = require('@clerk/nextjs')
    useUser.mockReturnValue({ user: mockUser })
    
    render(<SideNav />)

    expect(screen.queryByText('Reminders')).not.toBeInTheDocument()
  })
})