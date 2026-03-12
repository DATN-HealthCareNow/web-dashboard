// Mock data for healthcare system

export interface HealthReport {
  id: string;
  month: string;
  year: number;
  status: 'Stable' | 'Review Needed';
  updatedDate: string;
  metrics: {
    bloodPressure: string;
    heartRate: number;
    bmi: number;
    weight: number;
  };
}

export interface Article {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  author: {
    name: string;
    avatar: string;
  };
  status: 'Published' | 'Draft' | 'Scheduled';
  views: number;
  lastModified: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Doctor' | 'Admin' | 'Staff';
  avatar: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  doctorAvatar: string;
  date: string;
  time: string;
  type: 'Consultation' | 'Lab Work' | 'Checkup';
}

export interface RevenueMetric {
  label: string;
  value: string;
  change: string;
  icon: string;
}

export interface Transaction {
  id: string;
  user: string;
  plan: string;
  date: string;
  amount: string;
  status: 'Success' | 'Pending';
}

// Health Reports Data
export const healthReports: HealthReport[] = [
  {
    id: '1',
    month: 'October',
    year: 2023,
    status: 'Stable',
    updatedDate: 'Oct 31',
    metrics: {
      bloodPressure: '120/80',
      heartRate: 72,
      bmi: 22.4,
      weight: 70,
    },
  },
  {
    id: '2',
    month: 'September',
    year: 2023,
    status: 'Review Needed',
    updatedDate: 'Sep 30',
    metrics: {
      bloodPressure: '125/82',
      heartRate: 75,
      bmi: 22.6,
      weight: 71,
    },
  },
  {
    id: '3',
    month: 'August',
    year: 2023,
    status: 'Stable',
    updatedDate: 'Aug 31',
    metrics: {
      bloodPressure: '118/78',
      heartRate: 70,
      bmi: 22.0,
      weight: 69,
    },
  },
];

// Articles Data
export const articles: Article[] = [
  {
    id: '1',
    title: '10 Tips for Heart Health',
    category: 'Cardiology',
    categoryColor: 'text-blue-600',
    author: {
      name: 'Dr. S. Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
    status: 'Published',
    views: 1240,
    lastModified: 'Oct 24, 2023',
  },
  {
    id: '2',
    title: 'Understanding Anxiety in Teens',
    category: 'Mental Health',
    categoryColor: 'text-purple-600',
    author: {
      name: 'Dr. A. Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    },
    status: 'Draft',
    views: 0,
    lastModified: 'Just now',
  },
  {
    id: '3',
    title: 'Summer Nutrition Guide 2024',
    category: 'Nutrition',
    categoryColor: 'text-green-600',
    author: {
      name: 'Dr. E. White',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    },
    status: 'Scheduled',
    views: 0,
    lastModified: 'Oct 20, 2023',
  },
  {
    id: '4',
    title: 'Post-Surgery Recovery Tips',
    category: 'Surgery',
    categoryColor: 'text-orange-600',
    author: {
      name: 'Dr. M. Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    },
    status: 'Published',
    views: 854,
    lastModified: 'Sep 15, 2023',
  },
  {
    id: '5',
    title: 'Diabetes Management 101',
    category: 'Endocrinology',
    categoryColor: 'text-blue-700',
    author: {
      name: 'Dr. S. Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    },
    status: 'Published',
    views: 3102,
    lastModified: 'Aug 22, 2023',
  },
];

// Users Data
export const users: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Jenkins',
    email: 's.jenkins@hospital.com',
    role: 'Doctor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jenkins',
    status: 'Active',
    lastLogin: 'Oct 24, 2023 09:15 AM',
  },
  {
    id: '2',
    name: 'Michael K. Chen',
    email: 'm.chen@hospital.com',
    role: 'Admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen',
    status: 'Active',
    lastLogin: 'Oct 23, 2023 04:30 PM',
  },
  {
    id: '3',
    name: 'Emily Watson',
    email: 'e.watson@hospital.com',
    role: 'Staff',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=watson',
    status: 'Inactive',
    lastLogin: 'Sep 12, 2023 11:00 AM',
  },
  {
    id: '4',
    name: 'James Doe',
    email: 'j.doe@hospital.com',
    role: 'Staff',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doe',
    status: 'Suspended',
    lastLogin: 'Oct 20, 2023 02:15 PM',
  },
  {
    id: '5',
    name: 'Dr. Linda Ray',
    email: 'l.ray@hospital.com',
    role: 'Doctor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ray',
    status: 'Active',
    lastLogin: 'Oct 24, 2023 08:00 AM',
  },
];

// Appointments Data
export const appointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jenkins',
    date: 'TODAY, OCT 5',
    time: '10:00 AM - 10:30 AM',
    type: 'Consultation',
  },
  {
    id: '2',
    doctorName: 'Blood Work',
    specialty: 'Main Laboratory',
    doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lab',
    date: 'TODAY, OCT 5',
    time: '02:00 PM - 02:30 PM',
    type: 'Lab Work',
  },
  {
    id: '3',
    doctorName: 'Dr. Mike Ross',
    specialty: 'General Practitioner',
    doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ross',
    date: 'WED, OCT 10',
    time: '09:00 AM - 09:30 AM',
    type: 'Checkup',
  },
];

// Revenue Data
export const revenueMetrics: RevenueMetric[] = [
  { label: 'Total Revenue', value: '$420,500', change: '12%', icon: '💰' },
  { label: 'Active Premium Users', value: '12,450', change: '5%', icon: '👥' },
  { label: 'Churn Rate', value: '2.1%', change: '0.5%', icon: '📊' },
  { label: 'ARPU', value: '$34.00', change: '1.2%', icon: '💵' },
];

// Transactions Data
export const transactions: Transaction[] = [
  {
    id: 'TRX-9821',
    user: 'Alice Freeman',
    plan: 'Premium Monthly',
    date: 'Oct 24, 2023',
    amount: '$34.00',
    status: 'Success',
  },
  {
    id: 'TRX-9820',
    user: 'Robert Williams',
    plan: 'Annual',
    date: 'Oct 24, 2023',
    amount: '$340.00',
    status: 'Pending',
  },
];

// Dashboard Stats
export const dashboardStats = {
  totalActiveUsers: 12450,
  newRegistrations: 342,
  criticalAlerts: 5,
};
