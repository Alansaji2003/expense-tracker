# 💰 Expense Tracker - AI-Powered Financial Management

A modern, full-featured expense tracking application built with Next.js, featuring intelligent budget management, transaction tracking, and AI-powered financial insights.

🌐 **Live Demo**: [https://expense-tracker-alan-saji.vercel.app/](https://expense-tracker-alan-saji.vercel.app/)

## ✨ Features

### 🎯 Core Features
- **Smart Budget Management**: Create and manage multiple budgets with categories and spending limits
- **Transaction Tracking**: Add, edit, and categorize income/expense transactions with ease
- **Visual Analytics**: Interactive charts and graphs for comprehensive spending insights
- **AI Financial Advisor**: Get personalized financial advice powered by multiple AI providers
- **Email Reminders**: Automated budget alerts and weekly spending summaries
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### 🤖 AI-Powered Insights
- **Multi-Provider AI Support**: OpenAI, Groq, xAI (Grok), Ollama, Hugging Face, and Mock providers
- **Intelligent Chat Interface**: Interactive financial advisor with contextual responses
- **Personalized Recommendations**: AI analyzes your spending patterns and provides tailored advice
- **Smart Fallback System**: Automatic fallback to ensure AI features always work

### 📊 Advanced Analytics
- **Spending Trends**: Track expenses over time with detailed visualizations
- **Category Breakdown**: Understand where your money goes with category-wise analysis
- **Budget Utilization**: Monitor budget performance with real-time progress indicators
- **Monthly/Yearly Reports**: Comprehensive financial reports and insights

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk (Social login, Email/Password)
- **AI Integration**: Multi-provider support (OpenAI, Groq, xAI, Ollama, etc.)
- **Email Service**: Nodemailer with Gmail SMTP
- **Testing**: Jest, Playwright E2E
- **Deployment**: Vercel, Docker support
- **Monitoring**: Built-in health checks and error handling

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (or use Neon, Supabase, etc.)
- Clerk account for authentication

### 1. Clone & Install
```bash
git clone https://github.com/Alansaji2003/expense-tracker.git
cd expense-tracker
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Configure your `.env` file:
```env
# Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database (Required)
NEXT_PUBLIC_DATABASE_URL=your_postgresql_connection_string

# AI Configuration (Choose one)
AI_PROVIDER=groq  # Options: openai, groq, xai, ollama, huggingface, mock
GROQ_API_KEY=your_groq_api_key  # Free option

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_gmail_address
SMTP_PASS=your_gmail_app_password
```

### 3. Database Setup
```bash
npm run db:push
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start using the app!

## 🤖 AI Provider Setup

### Free Options (Recommended)
1. **Groq** (Free, Fast): Get API key at [console.groq.com](https://console.groq.com/)
2. **Ollama** (Local, Private): Install from [ollama.ai](https://ollama.ai/)
3. **Mock** (Development): No setup required, works out of the box

### Paid Options
- **OpenAI**: Premium AI with GPT models
- **xAI (Grok)**: Elon Musk's AI platform

See [AI_SETUP_GUIDE.md](AI_SETUP_GUIDE.md) for detailed setup instructions.

## 📱 Key Features Walkthrough

### Dashboard Overview
- Real-time budget summaries and spending analytics
- Quick action buttons for adding transactions
- Visual spending trends and category breakdowns

### Budget Management
- Create unlimited budgets with custom categories
- Set spending limits and track utilization
- Visual progress bars and alerts for overspending

### AI Financial Advisor
- Interactive chat interface with your personal AI advisor
- Context-aware responses based on your actual financial data
- Quick question buttons for common financial queries
- Smart recommendations for saving and budgeting

### Transaction Management
- Easy transaction entry with category auto-suggestions
- Bulk import/export capabilities
- Advanced filtering and search
- Recurring transaction support

### Analytics & Reports
- Interactive charts powered by Chart.js
- Monthly and yearly spending trends
- Category-wise expense analysis
- Budget performance metrics

## 🐳 Docker Deployment

### Development
```bash
docker-compose up --build
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up --build
```

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# AI setup script
npm run setup:ai
```

## 📊 Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk authentication | ✅ | - |
| `CLERK_SECRET_KEY` | Clerk server key | ✅ | - |
| `NEXT_PUBLIC_DATABASE_URL` | PostgreSQL connection | ✅ | - |
| `AI_PROVIDER` | AI service provider | ❌ | `mock` |
| `GROQ_API_KEY` | Groq AI API key | ❌ | - |
| `OPENAI_API_KEY` | OpenAI API key | ❌ | - |
| `XAI_API_KEY` | xAI (Grok) API key | ❌ | - |
| `SMTP_HOST` | Email server host | ❌ | - |
| `SMTP_USER` | Email username | ❌ | - |
| `SMTP_PASS` | Email password | ❌ | - |

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy with one click

### Self-hosted
Use Docker compose files for easy self-hosting on any VPS.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for seamless authentication
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Groq](https://groq.com/) for fast and free AI inference

## 📞 Support & Contact

- 📧 **Email**: [rockstaralansaji@gmail.com](mailto:rockstaralansaji@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/Alansaji2003/expense-tracker/issues)
- 🌐 **Live Demo**: [https://expense-tracker-alan-saji.vercel.app/](https://expense-tracker-alan-saji.vercel.app/)

---

**Made with ❤️ by Alan Saji**

⭐ Star this repository if you find it helpful!