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

//Checking format
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

//4.10 Checking that post works propely
test('a valid blogpost can be added', async () => {
  const newBlog = {
    title: 'Ka Norge tenker om Brexit',
    author: 'Sinfidir Jensen',
    url: 'www.norskpolitikk.no',
    likes: 10000,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blogTitles = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(blogTitles).toContain(
    'Ka Norge tenker om Brexit'
  )
})

//4.9 assure that the identifier field is called 'id', as by default it's '__id'.
//Use: toBeDefined. 
//toJSON is the place to define parameter 'id'.


//Checking that u can't post a blog with only an url
test('blogposts must have a proper title', async () => {
  const newBlog = {
    author: 'Kalle Konstig',
    url: 'konstigt.blog.no',
    likes: 0
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(400)

  // const response = await api.get('/api/blogs')

  //Sexpect(response.body.length).toBe(initialBlogs.length)
})

//4.11 if likes is empty, set 0 as its initial value.

//4.12 if trying to make a blogpost without title and url, respond with '400 Bad request'

afterAll(() => {
  mongoose.connection.close()
})