// In-memory data for the demo
// This is the singleton pattern we spoke about :)

export interface Author {
  id: number;
  name: string;
  bio: string;
  birthYear: number;
  nationality: string;
  imageUrl: string;
}

export interface Publisher {
  id: number;
  name: string;
  country: string;
  foundedYear: number;
  website: string;
  description: string;
}

export interface Book {
  id: number;
  title: string;
  authorId: number;
  publisherId: number;
  publishedYear: number;
  genre: string;
  description: string;
  coverUrl: string;
  pages: number;
  isbn: string;
}

export const authors: Author[] = [
  {
    id: 1,
    name: "Jane Austen",
    bio: "Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century.",
    birthYear: 1775,
    nationality: "British",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  },
  {
    id: 2,
    name: "George Orwell",
    bio: "Eric Arthur Blair, known by his pen name George Orwell, was an English novelist, essayist, journalist and critic. His work is characterized by lucid prose, awareness of social injustice, and fierce opposition to totalitarianism.",
    birthYear: 1903,
    nationality: "British",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Agatha Christie",
    bio: "Dame Agatha Mary Clarissa Christie, Lady Mallowan, was an English writer known for her sixty-six detective novels and fourteen short story collections, particularly those revolving around fictional detectives Hercule Poirot and Miss Marple.",
    birthYear: 1890,
    nationality: "British",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Ernest Hemingway",
    bio: "Ernest Miller Hemingway was an American novelist, short-story writer, and journalist. His economical and understated style had a strong influence on 20th-century fiction.",
    birthYear: 1899,
    nationality: "American",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Virginia Woolf",
    bio: "Adeline Virginia Woolf was an English writer, considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness as a narrative device.",
    birthYear: 1882,
    nationality: "British",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
  },
];

export const publishers: Publisher[] = [
  {
    id: 1,
    name: "Penguin Classics",
    country: "United Kingdom",
    foundedYear: 1946,
    website: "https://www.penguin.co.uk",
    description:
      "Penguin Classics publishes accessible editions of enduring works from across world literature.",
  },
  {
    id: 2,
    name: "Secker & Warburg",
    country: "United Kingdom",
    foundedYear: 1935,
    website: "https://www.penguin.co.uk",
    description:
      "Secker & Warburg became known for publishing influential twentieth-century fiction and political writing.",
  },
  {
    id: 3,
    name: "Collins Crime Club",
    country: "United Kingdom",
    foundedYear: 1930,
    website: "https://harpercollins.co.uk",
    description:
      "Collins Crime Club specialized in detective fiction and helped define classic mystery publishing.",
  },
  {
    id: 4,
    name: "Charles Scribner's Sons",
    country: "United States",
    foundedYear: 1846,
    website: "https://www.simonandschuster.com",
    description:
      "Charles Scribner's Sons is associated with major American literary fiction from the nineteenth and twentieth centuries.",
  },
  {
    id: 5,
    name: "Hogarth Press",
    country: "United Kingdom",
    foundedYear: 1917,
    website: "https://www.penguinrandomhouse.com",
    description:
      "Hogarth Press published modernist literature and became closely connected with experimental fiction.",
  },
];

export const books: Book[] = [
  {
    id: 1,
    title: "Pride and Prejudice",
    authorId: 1,
    publisherId: 1,
    publishedYear: 1813,
    genre: "Romance",
    description:
      "Pride and Prejudice is a romantic novel that follows the character development of Elizabeth Bennet, the dynamic protagonist who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    pages: 432,
    isbn: "978-0141439518",
  },
  {
    id: 2,
    title: "Emma",
    authorId: 1,
    publisherId: 1,
    publishedYear: 1815,
    genre: "Romance",
    description:
      "Emma is a novel about youthful hubris and romantic misunderstandings. It is set in the fictional country village of Highbury and the surrounding estates of Hartfield, Randalls and Donwell Abbey, and involves the relationships among people from a small number of families.",
    coverUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    pages: 474,
    isbn: "978-0141439587",
  },
  {
    id: 3,
    title: "1984",
    authorId: 2,
    publisherId: 2,
    publishedYear: 1949,
    genre: "Dystopian Fiction",
    description:
      "1984 is a dystopian social science fiction novel that follows the life of Winston Smith, a low ranking member of 'the Party', who is frustrated by the omnipresent eyes of the party, and its ominous ruler Big Brother.",
    coverUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    pages: 328,
    isbn: "978-0452284234",
  },
  {
    id: 4,
    title: "Animal Farm",
    authorId: 2,
    publisherId: 2,
    publishedYear: 1945,
    genre: "Political Satire",
    description:
      "Animal Farm is an allegorical novella about a group of farm animals who rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy.",
    coverUrl:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
    pages: 112,
    isbn: "978-0452284244",
  },
  {
    id: 5,
    title: "Murder on the Orient Express",
    authorId: 3,
    publisherId: 3,
    publishedYear: 1934,
    genre: "Mystery",
    description:
      "Murder on the Orient Express is a detective novel featuring the Belgian detective Hercule Poirot. It is set on the famous Orient Express train and involves the murder of an American business tycoon.",
    coverUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    pages: 256,
    isbn: "978-0062693662",
  },
  {
    id: 6,
    title: "And Then There Were None",
    authorId: 3,
    publisherId: 3,
    publishedYear: 1939,
    genre: "Mystery",
    description:
      "The world's bestselling mystery novel. Ten strangers are lured to an isolated island mansion off the Devon coast by a mysterious host who accuses each of his guests of murder.",
    coverUrl:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop",
    pages: 272,
    isbn: "978-0062073488",
  },
  {
    id: 7,
    title: "The Old Man and the Sea",
    authorId: 4,
    publisherId: 4,
    publishedYear: 1952,
    genre: "Literary Fiction",
    description:
      "The Old Man and the Sea is one of Hemingway's most enduring works. It tells the story of an aging Cuban fisherman who struggles with a giant marlin far out in the Gulf Stream.",
    coverUrl:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=600&fit=crop",
    pages: 127,
    isbn: "978-0684801223",
  },
  {
    id: 8,
    title: "A Farewell to Arms",
    authorId: 4,
    publisherId: 4,
    publishedYear: 1929,
    genre: "War Novel",
    description:
      "A Farewell to Arms is a novel about an American ambulance driver in Italy during World War I and his romance with an English nurse.",
    coverUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    pages: 332,
    isbn: "978-0684801469",
  },
  {
    id: 9,
    title: "Mrs Dalloway",
    authorId: 5,
    publisherId: 5,
    publishedYear: 1925,
    genre: "Modernist Literature",
    description:
      "Mrs Dalloway chronicles a day in the life of Clarissa Dalloway, a fictional upper-class woman in post-First World War England. It is one of Woolf's best-known novels.",
    coverUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    pages: 194,
    isbn: "978-0156628709",
  },
  {
    id: 10,
    title: "To the Lighthouse",
    authorId: 5,
    publisherId: 5,
    publishedYear: 1927,
    genre: "Modernist Literature",
    description:
      "To the Lighthouse is a landmark novel of high modernism. Set in the Hebrides on the Isle of Skye, it centers on the Ramsay family and their visits to the lighthouse.",
    coverUrl:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop",
    pages: 209,
    isbn: "978-0156907392",
  },
];

// Helper functions
export function getAuthorById(id: number): Author | undefined {
  return authors.find((author) => author.id === id);
}

export function getBookById(id: number): Book | undefined {
  return books.find((book) => book.id === id);
}

export function getPublisherById(id: number): Publisher | undefined {
  return publishers.find((publisher) => publisher.id === id);
}

export function getBooksByAuthorId(authorId: number): Book[] {
  return books.filter((book) => book.authorId === authorId);
}

export function getBooksByPublisherId(publisherId: number): Book[] {
  return books.filter((book) => book.publisherId === publisherId);
}

export function getAllAuthors(): Author[] {
  return authors;
}

export function getAllBooks(): Book[] {
  return books;
}

export function getAllPublishers(): Publisher[] {
  return publishers;
}
