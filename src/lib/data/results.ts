export interface StudentResult {
  id: number;
  name: string;
  score: number;
  subject: string;
  year: number;
  isTopper: boolean;
}

export const results: StudentResult[] = [
  { id: 1, name: 'Priya S.', score: 97, subject: 'Commerce', year: 2025, isTopper: true },
  { id: 2, name: 'Rahul K.', score: 95, subject: 'Accountancy', year: 2025, isTopper: true },
  { id: 3, name: 'Ananya M.', score: 94, subject: 'Commerce', year: 2025, isTopper: true },
  { id: 4, name: 'Vikram P.', score: 92, subject: 'Business Studies', year: 2025, isTopper: true },
  { id: 5, name: 'Sneha R.', score: 91, subject: 'Economics', year: 2025, isTopper: true },
  { id: 6, name: 'Amit D.', score: 89, subject: 'Commerce', year: 2025, isTopper: false },
  { id: 7, name: 'Kavita J.', score: 88, subject: 'Accountancy', year: 2024, isTopper: false },
  { id: 8, name: 'Rohan S.', score: 96, subject: 'Commerce', year: 2024, isTopper: true },
  { id: 9, name: 'Meena T.', score: 93, subject: 'Commerce', year: 2024, isTopper: true },
  { id: 10, name: 'Arjun V.', score: 90, subject: 'Business Studies', year: 2024, isTopper: true },
  { id: 11, name: 'Pooja G.', score: 87, subject: 'Economics', year: 2024, isTopper: false },
  { id: 12, name: 'Nikhil B.', score: 85, subject: 'Commerce', year: 2024, isTopper: false },
  { id: 13, name: 'Swati L.', score: 94, subject: 'Commerce', year: 2023, isTopper: true },
  { id: 14, name: 'Deepak N.', score: 91, subject: 'Accountancy', year: 2023, isTopper: true },
  { id: 15, name: 'Ritu C.', score: 89, subject: 'Commerce', year: 2023, isTopper: false },
  { id: 16, name: 'Karan M.', score: 86, subject: 'Business Studies', year: 2023, isTopper: false },
  { id: 17, name: 'Anjali S.', score: 93, subject: 'Commerce', year: 2022, isTopper: true },
  { id: 18, name: 'Vishal R.', score: 90, subject: 'Commerce', year: 2022, isTopper: true },
  { id: 19, name: 'Neha P.', score: 88, subject: 'Economics', year: 2022, isTopper: false },
  { id: 20, name: 'Saurabh K.', score: 85, subject: 'Commerce', year: 2022, isTopper: false },
];

export const aggregateStats = {
  averageScore: 91,
  totalDistinctions: 48,
  topScore: 97,
  topScorer: 'Priya S.',
  totalStudents: 150,
  yearsOfResults: 4,
};
