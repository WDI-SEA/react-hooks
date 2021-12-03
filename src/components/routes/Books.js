import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Books = props => {
  console.log('these are the props\n', props)
  // constructor (props) {
  //   super(props)

  //   this.state = {
  //     books: []
  //   }
  // }
  const [books, setBooks] = useState([])

  // componentDidMount () {
  //   axios(`${apiUrl}/books`)
  //     .then(res => this.setState({ books: res.data.books }))
  //     .catch(console.error)
  // }
  useEffect(() => {
    axios(`${apiUrl}/books`)
      .then(res => setBooks(res.data.books))
      .catch(console.error)
	}, [])

  const booksList = books.map(book => (
    <li key={book._id}>
      <Link to={`/books/${book._id}`}>{book.title}</Link>
    </li>
  ))

  return (
    <Layout>
      <h4>Books</h4>
      <ul>
        {booksList}
      </ul>
    </Layout>
  )
}

export default Books
