import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BookForm from '../shared/BookForm'
import Layout from '../shared/Layout'

const BookEdit = props => {
  // constructor (props) {
  //   super(props)

  //   this.state = {
  //     book: {
  //       title: '',
  //       author: ''
  //     },
  //     updated: false
  //   }
  // }
  // The destructuring syntax in this case is pulling two things from the useState hook
  // First, a piece of state as defined by whatever you pass to useState, {title: '', author: ''}
  // second, a function that will set that piece of state(which always takes the place of setState)
  const [book, setBook] = useState({ title: '', author: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/books/${props.match.params.id}`)
      .then(res => setBook(res.data.book))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()

    setBook(prevBook => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedBook = Object.assign({}, prevBook, updatedField)

      return editedBook
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/books/${props.match.params.id}`,
      method: 'PATCH',
      data: { book }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }
  if (updated) {
    return <Redirect to={`/books/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <BookForm
        book={book}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/books/${props.match.params.id}`}
      />
    </Layout>
  )
}

export default BookEdit
