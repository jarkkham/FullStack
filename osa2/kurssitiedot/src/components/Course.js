import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            {course.map(course =>
                <div key={course.id} >
                    <Header name={course.name} />
                    <Content course={course} />
                    <Total parts={course.parts} />
                </div>
            )}
        </div>
    )
}

const Header = ({ name }) => {
    return (
        <h2>
            {name}
        </h2>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({ parts }) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const exercisesArray = parts.map(part => {
        return part.exercises
    })
    return (
        <div>
            <b>total of {exercisesArray.reduce(reducer)} exercises</b>
        </div>
    )
}

export default Course