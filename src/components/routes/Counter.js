// hooks come from the react library
// we import just like we would anything else from react
// the two hooks we'll be using are useState and useEffect
import React, { useState, useEffect } from 'react'
import Layout from '../shared/Layout'

// Counter will have a button, that can be clicked to increase the count
// There will also be a button to reset the count
// Counter, as you can see, is a function component, this means we'll use hooks
const Counter = () => {
  // to access state in a function component, we call useState
  // useState requires two things, an initial value, and an updater function
  // our piece of state will be count, which means we'll call our updater function setCount
  // we pass the initial value of the count to the useState function
  const [count, setCount] = useState(0)
  const [donut, setDonut] = useState('chocolate')
  // we used these to look at our hook for a second
  // console.log('this is count', count)
  // console.log('this is setCount', setCount)

  const increaseCount = () => {
    // this is fine for setting state(count) to a predetermined value
    // but it's not what increaseCount is supposed to do
    // setCount(1)
    // for an actual counter, we will want to use the initial value and increase that by one
    // you might think we do that like this:
    // setCount(count + 1)
    // according to the react lifecycle, this doesn't work the best because it doesn't set state immediately
    // this is fine for something simple like this, but breaks down for more complex thing, for instance, if I wanted to increase by two using this syntax:
    // setCount(count + 1)
    // setCount(count + 1)
    // the above syntax is going to run both calls based on the state when we called increaseCount
    // so it's saying, 'if the count is zero, make the count 1' and runs that logic twice, making the count 1 both times. that's because of the way this updater function works.
    // best practice, is to make your count increase based on the previous count, and that syntax looks like this:
    setCount(previousCount => previousCount + 1)
    // using this syntax allows multiple state setting functions to run effectively one after the other.
    // it's important to remember, these updater functions do not merge state, they replace the current state with the passed value.
  }

  const resetCount = () => {
    // when we want to set the count to a value that doesn't depend on the previous value, we can just pass a value to setCount
    setCount(0)
  }
  // console.log('useEffect', useEffect)
  // USE EFFECT --> Takes the place of componentDidMount, componentDidUpdate, componentDidUnmount
  // the effect hook (useEffect) requires two things, a callback function and a dependency array(dep array not always required)
  // the dependecy array is what the hook is dependent on, aka, what will trigger it to run
  // the below hook will recreate componentDidMount
  // runs on the first render
  useEffect(() => {
    console.log('first render only')
  }, [])
  // this effect hook takes the place of componentDidMount AND componentDidUpdate
  // runs on first render, and any time the count changes
  // this is because count is inside the dependency array, which triggers the useEffect hook
  useEffect(() => {
    console.log('first render and count change\n count: ', count)
  }, [count])
  // an effect hook with NO dependency array will be called after every render
  useEffect(() => {
    console.log('every render')
  })

  useEffect(() => {
    console.log('the donut has sprinkles')
  }, [donut])

  useEffect(() => {
    console.log('something was updated, either count or donut')
  }, [count, donut])

  // this effectHook will act like componentDidUnmount
  // the way to do this is to return a 'cleanup' function
  useEffect(() => {
    console.log('some effect XYZ')
    // an effect can return a cleanup function
    // cleanup functions run two different times
    // 1. when the component is unmounted
    // 2. before the second and following state updates/renders
    // adding an empty dependency array makes it so the cleanup function only runs whe the component is unmounted,
    // this is because it doesn't depend on any piece of state that could cause it to be reapplied
    return () => {
      console.log('cleaning up XYZ')
    }
  }, [])

  const addSprinkles = () => {
    setDonut(prevDonut => prevDonut + ' with sprinkles')
  }

  return (
    <Layout>
      <h1>Counter</h1>
      <h2>Count: {count}</h2>
      <button onClick={increaseCount}>increase count</button>
      <button onClick={resetCount}>reset count</button>
      <h5>Donut is: {donut}</h5>
      <button onClick={addSprinkles}>Add Sprinkles</button>
    </Layout>
  )
}

export default Counter
