const listHelper = require('../utils/list_helper')

const oneBlog = [
  {
    _id: 'sdgsdkaaaairepos2tiuyku6',
    title: 'Kaffe i Bergen',
    author: 'Inge Björg',
    url: 'www.kaffekvinnen.no',
    likes: 30,
    ___v: 0
  }
]
const blogs = [
  {
    _id: 'sdgsdklgmsglknlfmakfe6',
    title: 'Bästa getostar i mathallen',
    author: 'Lina Lund',
    url: 'www.linas-ostfabrik.se',
    likes: 10,
    ___v: 0
  },
  {
    _id: 'sdgsdkl222eeemakfe6',
    title: 'Bästa biffarna i mathallen',
    author: 'Lina Lund',
    url: 'www.linas-ostfabrik.se',
    likes: 100,
    ___v: 0
  },
  {
    _id: 'sdgsdksldfsd0oenlfmakfe6',
    title: 'Bästa vinerna i mathallen',
    author: 'Lina Lund',
    url: 'www.linas-ostfabrik.se',
    likes: 1000,
    ___v: 0
  },
  {
    _id: 'sdgsdksldfsd0oenlfmakfe6',
    title: 'Såhär kokar du världens bästa musslor',
    author: 'Mats Matman',
    url: 'www.matsmat.blog.se',
    likes: 200,
    ___v: 0
  },
]

describe('Total Likes', () => {
  test('of a larger list of blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(1310)
  })
  test('one blog which has 30 votes', () => {
    const result = listHelper.totalLikes(oneBlog)
    //console.log("here", blogs[0])
    expect(result).toBe(30)
  })
  test('an empty list', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('Favorite blog', () => {
  test('of a list of super smashy posts', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(
      {
        title: 'Bästa vinerna i mathallen',
        author: 'Lina Lund',
        likes: 1000
      }
    )
  })
  test('when just one blog is competing for the honor', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual(
      {
        title: 'Kaffe i Bergen',
        author: 'Inge Björg',
        likes: 30
      }
    )
  })
})
