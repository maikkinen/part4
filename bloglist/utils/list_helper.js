const dummy = (blogs) => {
  return (1)
}

const totalLikes = (blogs) => {
  if(blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    const reducer = (sum, item) => {
      return sum + item['likes']
    }
    const total = blogs.reduce(reducer, 0)
    return (total)
  }
}

const favoriteBlog = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) => {
    return (b.likes - a.likes)
  })
  console.log('top rated is ', sortedBlogs[0])
  return (
    {
      title: sortedBlogs[0].title,
      author: sortedBlogs[0].author,
      likes: sortedBlogs[0].likes
    }
  )
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}