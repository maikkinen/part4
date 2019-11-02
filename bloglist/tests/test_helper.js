const Blog = require('../models/blogpost')

const initialBlogs = [
  {
    title: 'Bästa getostar i mathallen',
    author: 'Lina Lund',
    url: 'www.linas-ostfabrik.se',
    likes: 10,
  },
  {
    title: 'Bästa biffarna i mathallen',
    author: 'Lina Lund',
    url: 'www.linas-ostfabrik.se',
    likes: 100,
  },
  {
    title: 'Bästa vinerna i mathallen',
    author: 'Lina Lund',
    url: 'www.linas-ostfabrik.se',
    likes: 1000,
  },
  {
    title: 'Såhär kokar du världens bästa musslor',
    author: 'Mats Matman',
    url: 'www.matsmat.blog.se',
    likes: 200,
  }
]

const nonExistingId = async () => {
  const note = new Blog({ title: 'will remove this blog soon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}