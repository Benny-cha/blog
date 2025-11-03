import express from 'express';
import bodyParser from "body-parser";
import methodOverride from 'method-override';

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

//public file...> middleware
app.use(express.static("public"));

// Set EJS as templating engine
app.set("view engine", "ejs");

app.use((req, res, next) => {
  if (req.path.substr(-1) === '/' && req.path.length > 1) {
    const newPath = req.path.slice(0, -1);
    return res.redirect(newPath);
  }
  next();
});
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use(methodOverride('_method'));

import crypto from "crypto";

function generateId() {
  return crypto.randomBytes(8).toString("hex"); // 16-char random string
}

app.locals.books = [
    {
      id: "1",
      coverUrl: "https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg",
      title: "Atomic Habits",
      author: "James Clear",
      rating: 5,
      quote: "Small habits make a big difference.",
      article: `<p>Atomic Habits by James Clear is a transformative book that delves into the power of small, consistent changes in behavior. Clear presents a comprehensive framework for understanding how habits are formed and how they can be modified to achieve personal and professional success. The book emphasizes the importance of focusing on systems rather than goals, advocating for the idea that by improving our daily routines, we can create lasting change. With practical strategies and real-life examples, Atomic Habits provides readers with actionable insights to break bad habits, cultivate good ones, and ultimately transform their lives. It's a must-read for anyone looking to make meaningful improvements in their habits and overall well-being.
      </p>`
    },
    {
      id: "2",
      coverUrl: "https://m.media-amazon.com/images/I/81qEgMaVljL._AC_UY218_.jpg",
      title: "Can't Hurt Me",
      author: "David Goggins",
      rating: 4,
      quote: "The only way to grow is to suffer.",
      article: `<p>Can't Hurt Me by David Goggins is a gripping memoir that chronicles the author's journey from a challenging childhood to becoming one of the world's toughest endurance athletes. Goggins shares his philosophy of embracing pain and adversity as a means of personal growth, pushing the limits of human potential. The book is filled with raw and honest accounts of Goggins' experiences, from his time in the military to his record-breaking athletic feats. Through his story, Goggins inspires readers to confront their own limitations, develop mental toughness, and pursue greatness in all aspects of life. Can't Hurt Me is a powerful testament to the resilience of the human spirit and the transformative power of perseverance.</p>`
    },
    {
      id: "3",
      coverUrl: "https://m.media-amazon.com/images/I/81ngZpLkktL._AC_UY218_.jpg",
      title: "Deep Work",
      author: "Cal Newport",
      rating: 5,
      quote: "Focus is the new superpower of the 21st century.",
      article: `<p>Deep Work by Cal Newport is a compelling exploration of the concept of focused, uninterrupted work in an age of constant distractions. Newport argues that the ability to perform deep work is becoming increasingly rare and valuable in today's knowledge economy. The book provides practical strategies for cultivating deep work habits, such as minimizing distractions, embracing boredom, and scheduling dedicated time for focused tasks. Newport also discusses the benefits of deep work, including increased productivity, creativity, and job satisfaction. With its insightful analysis and actionable advice, Deep Work is a must-read for anyone looking to enhance their cognitive abilities and achieve meaningful results in their professional and personal lives.</p>`
    },   
    {
      id: "4",
      coverUrl: "https://m.media-amazon.com/images/I/61CXvkfdXlL._AC_UY218_.jpg",
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      rating: 4,
      quote: "A revolutionary perspective on evolution and natural selection.",
      article: `<p>The Selfish Gene by Richard Dawkins is a groundbreaking work that revolutionized our understanding of evolution and natural selection. Dawkins presents the idea that genes are the primary units of selection, driving the behavior and characteristics of organisms in their quest for survival and reproduction. The book explores complex concepts such as altruism, cooperation, and the evolution of social behaviors through the lens of gene-centric evolution. Dawkins' engaging writing style and thought-provoking ideas make The Selfish Gene accessible to both scientists and general readers alike. This seminal work continues to influence the fields of biology, genetics, and evolutionary theory, challenging traditional views and inspiring new avenues of research.</p>`
    },
    {
      id: "5",
      coverUrl: "https://m.media-amazon.com/images/I/71-1WBgjGoL._AC_UY218_.jpg",
      title: "Dune",
      author: "Frank Herbert",
      rating: 5,
      quote: "Epic saga of politics, ecology, and power on a desert planet.",
      article: `<p>Dune by Frank Herbert is a monumental science fiction novel that transports readers to the desert planet of Arrakis, where political intrigue, ecological challenges, and the struggle for control over the valuable spice melange unfold. The story follows Paul Atreides, a young nobleman who becomes embroiled in a complex web of power struggles, betrayal, and destiny. Herbert's richly detailed world-building, intricate plot, and exploration of themes such as religion, ecology, and human nature make Dune a timeless classic. The novel's influence extends beyond literature, inspiring adaptations in film, television, and other media. Dune remains a must-read for science fiction enthusiasts and anyone interested in thought-provoking storytelling.</p>`
    },
    {
      id: "6",
      coverUrl: "https://m.media-amazon.com/images/I/612itdWJWQL._AC_UY218_.jpg",
      title: "1984",
      author: "George Orwell",
      rating: 5,
      quote: "A chilling dystopian novel about totalitarianism and surveillance.",
      article: `<p>1984 by George Orwell is a seminal dystopian novel that paints a bleak picture of a totalitarian society under constant surveillance. Set in the fictional superstate of Oceania, the story follows Winston Smith, a low-ranking member of the ruling Party, as he navigates a world where independent thought is suppressed, history is manipulated, and individuality is crushed. Orwell's portrayal of a society dominated by propaganda, censorship, and the omnipresent Big Brother serves as a powerful warning about the dangers of authoritarianism and the erosion of personal freedoms. 1984 remains a relevant and thought-provoking work that continues to resonate with readers in an era marked by concerns about privacy, government overreach, and the manipulation of truth.  For more check out 
            <a href="https://www.youtube.com/watch?v=GedPu8XetAo"> here</a> </p>`
    },
    {
      id: "7",
      coverUrl: "https://m.media-amazon.com/images/I/71TElSETZML._AC_UY218_.jpg",
      title: "The War of the Worlds",
      author: "H.G. Wells",
      rating: 5,
      quote: "A thrilling tale of alien invasion and human resilience.",
      article: `<P>The War of the Worlds by H.G. Wells is a classic science fiction novel that tells the gripping story of an alien invasion of Earth by Martians. The narrative follows an unnamed protagonist as he witnesses the devastating impact of the Martian attack on London and its inhabitants. Wells' vivid descriptions of the Martian technology, their ruthless tactics, and the ensuing chaos create a sense of urgency and suspense throughout the novel. The War of the Worlds explores themes of survival, human resilience, and the fragility of civilization in the face of overwhelming external threats. This timeless work has inspired numerous adaptations in film, radio, and other media, cementing its place as a cornerstone of science fiction literature. Readers are left to ponder humanity's place in the universe and the potential consequences of encountering extraterrestrial life. Reading such a book reminds me of  
            <a href="https://www.youtube.com/watch?v=aNrxrgDE0-8">this series.</a>
            </P>`
    },
    {
      id: "8",
      coverUrl: "https://m.media-amazon.com/images/I/81dcKoS58yL._AC_UY218_.jpg",
      title: "Neuromancer",
      author: "William Gibson",
      rating: 5,
      quote: "A groundbreaking cyberpunk novel that explores AI and virtual reality.",
      article: `<P>Neuromancer by William Gibson is a seminal work in the cyberpunk genre that delves into a dystopian future dominated by advanced technology, artificial intelligence, and virtual reality. The novel follows Case, a washed-up computer hacker who is hired for a high-stakes mission that takes him deep into the digital underworld. Gibson's visionary portrayal of cyberspace, corporate power, and the blurred lines between human and machine challenges readers to consider the implications of technological advancements on society and identity. Neuromancer's innovative narrative style, complex characters, and thought-provoking themes have made it a cornerstone of science fiction literature, influencing countless works in the genre and shaping popular culture's understanding of the digital age.
      </P>`
    },

    {
      id: "9",
      coverUrl: "https://m.media-amazon.com/images/I/71z-LGHBzgL._AC_UY218_.jpg",
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      rating: 3,
      quote: "A poignant and powerful account of a ww2",
      article: `<p>The Diary of a  Young Girl by Anne Frank is a deeply moving and poignant account of a young Jewish girl's life during World War II. Written while hiding from the Nazi regime, Anne's diary offers a unique and intimate perspective on the challenges, fears, and hopes of a teenager living in constant danger. Through her candid reflections, Anne captures the complexities of adolescence, the impact of war on daily life, and the enduring human spirit. The diary serves as a powerful reminder of the atrocities of the Holocaust and the importance of tolerance, empathy, and resilience. Anne Frank's words continue to inspire readers around the world, making The Diary of a young Girl a timeless and essential read.
      </p>`
    },
    {
      id: "10",
      coverUrl: "https://m.media-amazon.com/images/I/91G00NOgKYL._AC_UY218_.jpg",
      title: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
      author: "Ashlee Vance",
      rating: 5,
      quote: "An in-depth look at the life and achievements of Elon Musk.",
      article: `<p>
          Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future by Ashlee Vance is a comprehensive biography that delves into the life and accomplishments of one of the most visionary entrepreneurs of our time. Vance provides an in-depth look at Musk's journey from his early days in South Africa to his rise as the CEO of groundbreaking companies like Tesla and SpaceX. The book explores Musk's relentless drive, innovative thinking, and ambitious goals to revolutionize transportation, space exploration, and sustainable energy. Through interviews with Musk and those close to him, Vance paints a nuanced portrait of a complex individual whose work continues to shape the future. This biography is a must-read for anyone interested in technology, entrepreneurship, and the pursuit of <a href="https://www.youtube.com/shorts/fis6w7xx-50">bold ideas</a>.
      </p>`
    },
    {
      id: "11",
      coverUrl: "https://m.media-amazon.com/images/I/71+eijKKPYL._AC_UY218_.jpg",
      title: "Steve Jobs",
      author: "Walter Isaacson",
      rating: 4,
      quote: "A comprehensive biography of the visionary co-founder of Apple.",
      article: `<p>Steve Jobs by Walter Isaacson is a definitive biography that offers an in-depth look at the life and career of the iconic co-founder of Apple Inc. Based on extensive interviews with Jobs himself, as well as those close to him, Isaacson provides a nuanced portrayal of a complex and often controversial figure. The book chronicles Jobs' journey from his early days as a college dropout to his rise as a tech visionary who revolutionized multiple industries, including personal computing, music, and mobile technology. Isaacson explores Jobs' relentless pursuit of perfection, his innovative thinking, and his ability to inspire and lead teams to create groundbreaking products. This biography offers valuable insights into the mind of one of the most influential figures in modern technology and is a must-read for anyone interested in entrepreneurship, innovation, and the history of Silicon Valley.</p>`
    },
    {
      id: "12",
      coverUrl: "https://m.media-amazon.com/images/I/81EsoeOhkiS._AC_UY218_.jpg",
      title: "No Domain: The John McAfee Tapes",
      author: "John McAfee",
      rating: 5,
      quote: "A gripping memoir of the controversial tech entrepreneur's life and adventures.",
      article: `<p>No Domain: The John McAfee Tapes by John McAfee is a captivating memoir that offers an unfiltered look into the life and adventures of the enigmatic tech entrepreneur. Known for founding the McAfee antivirus software company, McAfee's life has been marked by controversy, innovation, and a relentless pursuit of freedom. In this book, he shares his experiences, from his early days in the tech industry to his escapades around the world, including brushes with the law and his outspoken views on privacy and government surveillance. McAfee's candid storytelling provides readers with a unique perspective on the challenges and  triumphs of a maverick in the tech world. No Domain is a must-read for those interested in technology, entrepreneurship, and the unconventional life of one of the industry's most colorful figures.</p>`
    }
  ];

app.get("/", (req, res) => {
  res.render("index", { books: app.locals.books});
});

app.get("/books", (req, res) => {

  res.render("books", { books: app.locals.books });
});

app.get('/books/:id', (req, res) => {

  const books = app.locals.books;
  const bookId = req.params.id;
  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.render('articles', { book });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post('/contact', (req, res) => {
  const { name, email, book, message } = req.body;
  console.log(`📩 New message from ${name} (${email}) about "${book || 'No book specified'}": ${message}`);
  
  // TODO: send email / store in database / show success
  res.send(`<h2>Thanks ${name}! Your message has been received.</h2>`);
});

app.get("/add-book", (req, res) => {
  res.render("add-book");
});
  
app.post("/books", (req, res) => {
  const newBook = {
    id: generateId(),  // auto-generate unique ID
    title: req.body.title,
    author: req.body.author,
    coverUrl: req.body.coverUrl || "/images/default-cover.jpg",
    rating: parseInt(req.body.rating),
    quote: req.body.quote,
    article: req.body.article
    , userAdded: true  // mark as user-added
  };
  
  app.locals.books.push(newBook);
  console.log("✅ New book added:", newBook);
  res.redirect("/books");
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  req.app.locals.books = req.app.locals.books.filter(
    book => !(book.id === id && book.userAdded)
  );
  res.redirect("/books");
});   

app.use((req, res) => {
  res.status(404).send("Page not found!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});