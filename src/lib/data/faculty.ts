export interface Faculty {
  id: number;
  name: string;
  qualification: string;
  subject: string;
  experience: number;
  specialty: string;
  bio: string;
}

export const faculty: Faculty[] = [
  {
    id: 1,
    name: 'Prof. Rajendra Sahu',
    qualification: 'M.Com, B.Ed',
    subject: 'Accountancy',
    experience: 15,
    specialty: 'Financial Accounting & Company Accounts',
    bio: 'Founder of Score More Academy with 15+ years of teaching experience. Known for making Accountancy simple and scoring. Has coached 500+ students to score above 90% in Board exams.',
  },
  {
    id: 2,
    name: 'Mrs. Sunita Sharma',
    qualification: 'M.Com, NET Qualified',
    subject: 'Business Studies',
    experience: 10,
    specialty: 'Management Principles & Marketing',
    bio: 'Expert in Business Studies with a knack for connecting textbook concepts to real-world business scenarios. Her teaching makes BST the most interesting subject for students.',
  },
  {
    id: 3,
    name: 'Mr. Anil Kumar',
    qualification: 'M.A. Economics, B.Ed',
    subject: 'Economics',
    experience: 12,
    specialty: 'Macro Economics & Indian Economy',
    bio: 'Passionate Economics teacher who simplifies complex economic theories with practical examples. Specializes in graph-based questions and numerical problems.',
  },
  {
    id: 4,
    name: 'Mrs. Priya Dubey',
    qualification: 'M.A. English, CELTA',
    subject: 'English',
    experience: 8,
    specialty: 'Writing Skills & Grammar',
    bio: 'Dedicated English teacher focusing on board exam writing formats, comprehension strategies, and grammar mastery to help students score full marks in English.',
  },
];
