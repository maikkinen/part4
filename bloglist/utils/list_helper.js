const dummy = (blogs) => {
    return (1)
}

/*
4.4
Määrittele funktio totalLikes joka saa parametrikseen taulukollisen blogeja.
Funktio palauttaa blogien yhteenlaskettujen tykkäysten eli likejen määrän.

const average = array => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

Määrittele funktiolle sopivat testit. 
Funktion testit kannattaa laittaa describe-lohkoon jolloin testien tulostus
ryhmittyy miellyttävästi.
*/

const totalLikes = (blogs) => {
    if(blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else {
        const reducer = (sum, item) => {
            return sum + item["likes"]
        }
        const total = blogs.reduce(reducer, 0)
        return (total)
    }
}

const favoriteBlog = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => {
        return (b.likes - a.likes)
    })
    console.log("top rated is ", sortedBlogs[0])
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