import React from 'react'
import Course from './components/Course'

const App = () => {
    const course = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 7,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 5,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 12,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 15,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 8,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 5,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>Web development curriculum</h1>
            <Course course={course} />
        </div>
    )
}

export default App