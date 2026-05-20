export interface Course {
  id: string;
  title: string;
  class: string;
  subjects: string[];
  duration: string;
  batchType: string;
  description: string;
  highlights: string[];
  icon: string;
  popular?: boolean;
}

export const courses: Course[] = [
  {
    id: 'commerce-11',
    title: 'Commerce Class 11th',
    class: '11th',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'English'],
    duration: 'Full Year',
    batchType: 'Regular / Weekend',
    description:
      'Build a rock-solid foundation in Commerce with our comprehensive Class 11th program. NCERT-focused curriculum with board pattern practice.',
    highlights: [
      'NCERT-focused curriculum',
      'Regular mock tests',
      'Doubt clearing sessions',
      'Chapter-wise assignments',
      'Board pattern practice',
    ],
    icon: '📚',
  },
  {
    id: 'commerce-12',
    title: 'Commerce Class 12th',
    class: '12th',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'English'],
    duration: 'Full Year',
    batchType: 'Regular / Weekend',
    description:
      'Excel in your Board exams with our proven Class 12th Commerce coaching. Focused on maximizing marks with strategic preparation.',
    highlights: [
      'Board exam focused',
      'Previous year paper practice',
      'Personal attention',
      'Performance tracking',
      'Pre-board mock exams',
    ],
    icon: '🎯',
    popular: true,
  },
  {
    id: 'crash-course',
    title: 'Board Exam Crash Course',
    class: '12th',
    subjects: ['All Commerce Subjects'],
    duration: '3 Months',
    batchType: 'Intensive',
    description:
      'Intensive 3-month crash course designed to boost your scores right before the Board exams. Fast-paced revision and practice.',
    highlights: [
      'Complete revision in 90 days',
      'Daily mock tests',
      'One-on-one doubt sessions',
      'Exam strategy workshops',
      'Previous 10 years solved papers',
    ],
    icon: '⚡',
  },
];

export const subjects = [
  {
    name: 'Accountancy',
    icon: '📊',
    description:
      'Master financial accounting, partnership accounts, and company accounts with practical problem-solving approach.',
    chapters11: [
      'Introduction to Accounting',
      'Theory Base of Accounting',
      'Recording of Transactions',
      'Ledger',
      'Trial Balance & Rectification',
      'Bank Reconciliation Statement',
      'Depreciation',
      'Bills of Exchange',
      'Financial Statements',
    ],
    chapters12: [
      'Accounting for Partnership',
      'Change in Profit Sharing Ratio',
      'Admission of Partner',
      'Retirement/Death of Partner',
      'Dissolution of Partnership',
      'Accounting for Share Capital',
      'Issue of Debentures',
      'Financial Statements of Company',
      'Cash Flow Statement',
    ],
  },
  {
    name: 'Business Studies',
    icon: '💼',
    description:
      'Understand business environment, management principles, and marketing concepts with real-world case studies.',
    chapters11: [
      'Nature and Purpose of Business',
      'Forms of Business Organisation',
      'Public, Private & Global Enterprises',
      'Business Services',
      'Emerging Modes of Business',
      'Social Responsibility of Business',
      'Formation of a Company',
      'Sources of Business Finance',
      'Small Business',
      'Internal Trade & International Trade',
    ],
    chapters12: [
      'Nature of Management',
      'Principles of Management',
      'Business Environment',
      'Planning',
      'Organising',
      'Staffing',
      'Directing',
      'Controlling',
      'Financial Management',
      'Financial Markets',
      'Marketing Management',
      'Consumer Protection',
    ],
  },
  {
    name: 'Economics',
    icon: '📈',
    description:
      'Learn micro and macro economics with data interpretation, graphs, and numerical problem-solving skills.',
    chapters11: [
      'Introduction to Economics',
      'Collection of Data',
      'Organisation of Data',
      'Presentation of Data',
      'Measures of Central Tendency',
      'Measures of Dispersion',
      'Correlation',
      'Index Numbers',
      'Indian Economy on Eve of Independence',
      'Economic Reforms since 1991',
    ],
    chapters12: [
      'National Income and Related Aggregates',
      'Money and Banking',
      'Determination of Income & Employment',
      'Government Budget and the Economy',
      'Balance of Payments',
      'Consumer Equilibrium',
      'Theory of Demand',
      'Theory of Supply',
      'Forms of Market',
      'Producer Equilibrium',
    ],
  },
];
