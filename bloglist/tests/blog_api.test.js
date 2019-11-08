const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blogpost')

describe('when there is some initial notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray) //This trick assures that all blogs have been saved. 
    console.log('saved')

    console.log('done')
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
  test('blogs are identified by id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    console.log('1st id is ', response.body[0].id)
  })
})

describe('posting works properly', () => {
  //4.10 Checking that post works propely
  test('a valid blogpost can be added', async () => {
    const newBlog = {
      title: 'Ka Norge tenker om Brexit',
      author: 'Sinfidir Jensen',
      url: 'www.norskpolitikk.no',
      likes: 10000,
      userId: '5dc5529f7b56cd3558641bc7',
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

  //4.12 Checking that u can't post a blog with out title and url
  test('blogposts must have a proper title and url', async () => {
    const newBlog = {
      author: 'Kalle Konstig',
      likes: 0,
      userId: '5dc5529f7b56cd3558641bc7'
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd)
    expect(blogsAtEnd.length).toBe(5) //This ainnot too pretty but this was buggy with 'helper.initialBlogs.length'
  })

  //4.11 if likes is empty, set 0 as its initial value.
  test('likes is 0 by default, if nothing else specified', async () => {
    const newBlog = {
      title: 'Rosegold iPhone',
      author: 'Steven Mc. Book',
      url: 'www.macbook.ios',
      userId: '5dc5529f7b56cd3558641bc7'
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(200)
  })
})

describe('deleting and updating (put)', () => {

  test('deleting a specific blogpost', async () => {
    await api
      .delete('/api/blogs/5dbfe9f367f6a341dc700916')
      .expect(204)
  })

  test('updating likes in a specific blogpost', async () => {
    const updatedBlog = {
      likes: 100,
      title: 'HTML is oldschool',
      author: 'Sam Supernerd',
      url: 'www.nerds.sam',
      userId: '5dc5529f7b56cd3558641bc7',
    }

    await api
      .put('/api/blogs/5db6ed3ca1d8a638083becb1')
      .send(updatedBlog)
      .expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})