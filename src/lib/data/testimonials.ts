export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  score?: number;
  year?: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Class 12th — 97% in Commerce',
    quote:
      'Score More Academy completely transformed my understanding of Accountancy. The teachers explain concepts so clearly that even the toughest chapters became easy. I scored 97% and it was all because of their guidance.',
    score: 97,
    year: 2025,
  },
  {
    id: 2,
    name: 'Rajesh Patel',
    role: 'Parent of Amit Patel',
    quote:
      'As a parent, I was worried about my son\'s Commerce preparation. But Score More Academy gave us complete confidence. Regular updates, personal attention, and excellent results. My son scored 92% in boards.',
    score: 92,
    year: 2025,
  },
  {
    id: 3,
    name: 'Kavita Jain',
    role: 'Class 12th — 88% in Commerce',
    quote:
      'The small batch size at Score More made all the difference. I could ask questions freely and the doubt clearing sessions before exams were incredibly helpful. Highly recommend to all Commerce students.',
    score: 88,
    year: 2024,
  },
  {
    id: 4,
    name: 'Suresh Verma',
    role: 'Parent of Rohan Verma',
    quote:
      'Score More Academy is the best coaching in Katni for Commerce. The faculty is experienced and they truly care about each student\'s success. Our son went from average marks to distinction.',
    score: 96,
    year: 2024,
  },
  {
    id: 5,
    name: 'Ananya Mishra',
    role: 'Class 12th — 94% in Commerce',
    quote:
      'I joined Score More in Class 11th and it was the best decision. The foundation they built helped me ace my 12th boards. The mock tests and previous year paper practice were game-changers.',
    score: 94,
    year: 2025,
  },
];
