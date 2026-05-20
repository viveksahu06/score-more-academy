export interface Batch {
  id: string;
  name: string;
  days: string;
  time: string;
  seatsStatus: 'Limited' | 'Open' | 'Full';
}

export const batches: Batch[] = [
  {
    id: 'morning',
    name: 'Morning Batch',
    days: 'Mon to Sat',
    time: '7:00 AM – 9:00 AM',
    seatsStatus: 'Limited',
  },
  {
    id: 'afternoon',
    name: 'Afternoon Batch',
    days: 'Mon to Sat',
    time: '2:00 PM – 4:00 PM',
    seatsStatus: 'Open',
  },
  {
    id: 'evening',
    name: 'Evening Batch',
    days: 'Mon to Sat',
    time: '5:00 PM – 7:00 PM',
    seatsStatus: 'Limited',
  },
  {
    id: 'weekend',
    name: 'Weekend Batch',
    days: 'Sat & Sun',
    time: '9:00 AM – 12:00 PM',
    seatsStatus: 'Open',
  },
];

export interface FeeStructure {
  courseId: string;
  courseName: string;
  monthly: number;
  quarterly: number;
  annual: number;
  includes: string[];
  popular?: boolean;
}

export const feeStructure: FeeStructure[] = [
  {
    courseId: 'commerce-11',
    courseName: 'Commerce Class 11th',
    monthly: 2500,
    quarterly: 7000,
    annual: 25000,
    includes: [
      'All 4 subjects',
      'Study material',
      'Weekly tests',
      'Doubt sessions',
      'Parent-teacher meets',
    ],
  },
  {
    courseId: 'commerce-12',
    courseName: 'Commerce Class 12th',
    monthly: 3000,
    quarterly: 8500,
    annual: 30000,
    includes: [
      'All 4 subjects',
      'Board-pattern material',
      'Daily practice tests',
      'One-on-one doubt clearing',
      'Pre-board mock exams',
      'Previous year papers',
    ],
    popular: true,
  },
  {
    courseId: 'crash-course',
    courseName: 'Board Exam Crash Course',
    monthly: 4000,
    quarterly: 11000,
    annual: 11000,
    includes: [
      'Complete syllabus revision',
      'Daily mock tests',
      'Intensive doubt sessions',
      'Exam strategy workshops',
      'Last 10 years solved papers',
    ],
  },
];
