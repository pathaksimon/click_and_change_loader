import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {isLoading: true, blogsData: []}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: formattedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        <div className="profile-photo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/profile-img.png"
            className="photo"
            alt="profile"
          />
          <h1>Wade Warren</h1>
          <p>Software Developer in U.k</p>
        </div>
        <div>
          {isLoading ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
          )}
        </div>
      </div>
    )
  }
}

export default BlogsList
