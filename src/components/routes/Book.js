// import React, { Component } from 'react'
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
// THIS IS THE OLD DUSTY CLASS COMPONENT
// class Book extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       book: null,
//       deleted: false
//     }
//   }

//   componentDidMount () {
//     axios(`${apiUrl}/books/${this.props.match.params.id}`)
//       .then(res => this.setState({ book: res.data.book }))
//       .catch(console.error)
//   }

//   destroy = () => {
//     axios({
//       url: `${apiUrl}/books/${this.props.match.params.id}`,
//       method: 'DELETE'
//     })
//       .then(() => this.setState({ deleted: true }))
//       .catch(console.error)
//   }

//   render () {
//     const { book, deleted } = this.state

//     if (!book) {
//       return <p>Loading...</p>
//     }

//     if (deleted) {
//       return <Redirect to={
//         { pathname: '/', state: { msg: 'Book successfully deleted!' } }
//       } />
//     }

//     return (
//       <Layout>
//         <h4>{book.title}</h4>
//         <p>Written by: {book.author}</p>
//         <button onClick={this.destroy}>Delete Book</button>
//         <Link to={`/books/${this.props.match.params.id}/edit`}>
//           <button>Edit</button>
//         </Link>
//         <Link to="/books">Back to all books</Link>
//       </Layout>
//     )
//   }
// }

// export default Book

const Book = props => {
	// call useState to get the 'book' state and a setBook function to update it
	// when converting, we see that the initial book's value is null, so that's what we'll pass to useState
  const [book, setBook] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/books/${props.match.params.id}`)
      .then((res) => setBook(res.data.book))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/books/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

	if (!book) {
		return <p>Loading...</p>
	}

	if (deleted) {
		return (
			<Redirect
				to={{ pathname: '/', state: { msg: 'Book successfully deleted!' } }}
			/>
		)
	}

	return (
		<Layout>
			<h4>{book.title}</h4>
			<p>Written by: {book.author}</p>
			<button onClick={destroy}>Delete Book</button>
			<Link to={`/books/${props.match.params.id}/edit`}>
				<button>Edit</button>
			</Link>
			<Link to='/books'>Back to all books</Link>
		</Layout>
	)
}

export default Book