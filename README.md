# MediCare - Healthcare Management System

A comprehensive healthcare administration and patient portal built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Features patient health records, appointment scheduling, medical article management, user administration, and revenue analytics.

## 🎯 System Features

### 1. **Dashboard Overview**
- Real-time metrics: Total Active Users (12,450), New Registrations (342), Critical Alerts (5)
- User distribution map showing geographic data
- System activity logs with status tracking
- Responsive metrics cards with trend indicators

### 2. **Health Reports Archive**
- Patient health report history from Jan 2023 to Oct 2023
- Vital signs tracking: Blood Pressure, Heart Rate, BMI, Weight
- Date range filtering
- Doctor's notes section with clinical notes
- Status indicators (Stable/Review Needed)
- PDF export functionality

### 3. **Article Management CMS**
- Manage medical content and health tips
- Article categorization (Cardiology, Mental Health, Nutrition, Surgery, etc.)
- Status tracking (Published, Draft, Scheduled)
- Author attribution with avatars
- View counts and publication dates
- Search and filter capabilities

### 4. **User Management**
- Role-based access control (Doctor, Admin, Staff)
- User status tracking (Active, Inactive, Suspended)
- Last login monitoring
- User search and filtering by role
- Pagination for large user lists

### 5. **Appointments Calendar**
- Interactive monthly calendar view
- Upcoming appointments display
- Doctor specialty information
- Appointment timing and type tracking
- Quick booking interface

### 6. **Revenue Analytics**
- Financial metrics: Total Revenue ($420,500), ARPU ($34.00), Churn Rate (2.1%)
- Monthly revenue trends chart
- Subscription tier distribution
- Active premium users tracking
- Recent transaction history
- Top performing plans analysis

## 🏗️ Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Dashboard home
│   ├── reports/
│   │   └── page.tsx               # Health reports page
│   ├── articles/
│   │   └── page.tsx               # Article management page
│   ├── users/
│   │   └── page.tsx               # User management page
│   ├── appointments/
│   │   └── page.tsx               # Appointments calendar page
│   ├── analytics/
│   │   └── page.tsx               # Revenue analytics page
│   └── globals.css                # Global styles
├── components/
│   ├── sidebar.tsx                # Navigation sidebar
│   ├── dashboard/
│   │   ├── dashboard-stats.tsx     # Metrics cards
│   │   ├── user-distribution-map.tsx # Geographic map
│   │   └── activity-logs.tsx       # System logs table
│   ├── reports/
│   │   ├── health-reports-list.tsx # Reports with metrics
│   │   └── doctors-notes.tsx       # Clinical notes
│   ├── articles/
│   │   └── articles-table.tsx      # Articles management table
│   ├── users/
│   │   └── users-table.tsx         # Users management table
│   ├── appointments/
│   │   ├── calendar.tsx            # Calendar component
│   │   └── upcoming-appointments.tsx # Upcoming list
│   ├── analytics/
│   │   ├── revenue-cards.tsx       # Metric cards
│   │   ├── revenue-chart.tsx       # Line chart
│   │   ├── subscription-tiers.tsx  # Pie chart
│   │   ├── recent-transactions.tsx # Transactions table
│   │   └── top-performing-plans.tsx # Plans ranking
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── mock-data.ts               # Mock data and interfaces
│   └── utils.ts                   # Utility functions
└── public/                        # Static assets
```

## 🚀 Getting Started

### Installation
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Pages & Routes
- `/` - Dashboard Overview
- `/reports` - Health Reports Archive
- `/articles` - Article Management CMS
- `/users` - User Management
- `/appointments` - Appointments Calendar
- `/analytics` - Revenue Analytics

## 💻 Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 4.2
- **Components**: shadcn/ui
- **Charts**: Recharts 2.15
- **Icons**: Lucide React 0.564

## 📊 Mock Data

All data is mock/static and defined in `lib/mock-data.ts`. Key data types:

- **HealthReport**: Monthly health metrics with vitals
- **Article**: Medical content with metadata
- **User**: Staff with roles and status
- **Appointment**: Schedule entries with doctor info
- **Transaction**: Payment records

## 🎨 Design Features

- **Professional Blue Theme**: Trust-inspiring color palette for healthcare
- **Clean Layout**: Sidebar navigation with main content area
- **Responsive Design**: Mobile-friendly with flexbox grid layouts
- **Data Visualization**: Charts, graphs, and metrics cards
- **Accessibility**: Semantic HTML and ARIA attributes
- **Interactive Elements**: Hover states, transitions, and status badges

## 📝 Key Components

### Sidebar Navigation
- Fixed left sidebar with 6 main navigation items
- Active page highlighting
- Sign out button in footer

### Data Tables
- Search functionality
- Filtering by category/role
- Pagination
- Status badges with color coding
- Avatar displays for users

### Metrics & Cards
- Key performance indicators
- Trend indicators with percentages
- Color-coded status indicators
- Icon representations

### Charts
- Line charts for revenue trends
- Pie charts for subscription distribution
- Responsive containers for mobile
- Interactive tooltips

## 🔄 Next Steps for Customization

1. **Database Integration**: Replace mock data with real database (Supabase, etc.)
2. **Authentication**: Implement user login and session management
3. **API Routes**: Create Next.js API routes for data operations
4. **Real-time Updates**: Add WebSocket for live notifications
5. **PDF Export**: Implement server-side PDF generation
6. **Email Notifications**: Set up transactional email service
7. **User Permissions**: Implement role-based access control

## 📄 License

Built with v0 - Vercel's AI-powered code generator
