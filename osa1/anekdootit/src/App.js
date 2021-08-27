import React, { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState([])
    const [mostVotes, setMostVotes] = useState(0)

    const nextAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length))
    }

    const voteAnecdote = () => {
        const pointsCopy = [...points]
        pointsCopy[selected]++
        if (pointsCopy[selected] > pointsCopy[mostVotes]) {
            setMostVotes(selected)
        }
        setPoints(pointsCopy)
    }

    const checkVotes = () => {
        if (points.length < anecdotes.length) {
            const pointsCopy = new Array(anecdotes.length).fill(0)
            setPoints(pointsCopy)
            return (0)
        }
        else {
            return (points[selected])
        }
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p> has {checkVotes()} points </p>
            <button onClick={voteAnecdote}> vote </button>
            <button onClick={nextAnecdote}> next anecdote </button>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[mostVotes]}</p>
            <p>has {points[mostVotes]} votes</p>
        </div>
    )
}

export default App