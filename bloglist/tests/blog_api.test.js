const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blogpost')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[3])
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

  expect(response.body.length).toBe(helper.initialBlogs.length)
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

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const blogTitles = blogsAtEnd.map(r => r.title)
  expect(blogTitles).toContain(
    'Ka Norge tenker om Brexit'
  )
})

//4.9 assure that the identifier field is called 'id', as by default it's '__id'.
//Use: toBeDefined. 
//toJSON is the place to define parameter 'id'.


//4.12 Checking that u can't post a blog with out title and url
test('blogposts must have a proper title and url', async () => {
  const newBlog = {
    author: 'Kalle Konstig',
    likes: 0
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

//4.11 if likes is empty, set 0 as its initial value.

afterAll(() => {
  mongoose.connection.close()
})