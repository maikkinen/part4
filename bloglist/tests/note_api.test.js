const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
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
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are quite a few blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('the first blog is about goat cheese', async () => {
  const response = await api.get('/api/blogs')
  const resTitle = response.body.map(r => r.title)

  expect(resTitle).toContain('Bästa getostar i mathallen')

})

afterAll(() => {
  mongoose.connection.close()
})