export const currentlyReading = [
  {
    title: 'Psycho-Cybernetics',
    author: 'Dr. Maxwell Maltz',
    isbn: '9780399176135',
  },
  {
    title: 'The Art of War',
    author: 'Sun Tzu',
    isbn: '9781599869773',
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    isbn: '9781451673319',
  },
];

export const wantToRead = [
  {
    title: 'Amusing Ourselves to Death: Public Discourse in the Age of Show Business',
    author: 'Neil Postman',
    isbn: '9780143036531',
  },
  {
    title: 'Letting Go: The Pathway of Surrender',
    author: 'David R. Hawkins',
    isbn: '9781401945015',
  },
  {
    title: 'Influence: The Psychology of Persuasion',
    author: 'Dr. Robert Cialdini',
    isbn: '9780062937650',
  },
];

export const readAndTalkAbout = [
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    isbn: '9780060850524',
  },
  {
    title: 'The Metamorphosis',
    author: 'Franz Kafka',
    isbn: '9780553213690',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '9780061122415',
  },
  {
    title: 'Life of Pi',
    author: 'Yann Martel',
    isbn: '9780156027328',
  },
  {
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupery',
    isbn: '9780156012195',
  },
  {
    title: 'The Autobiography of Malcolm X',
    author: 'Malcolm X and Alex Haley',
    isbn: '9780345350688',
  },
  {
    title: 'Flowers for Algernon',
    author: 'Daniel Keyes',
    isbn: '9780156030083',
  },
  
];

export const getBookCoverUrl = (isbn) => (
  `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
);
