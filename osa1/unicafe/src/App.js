import React, { useState, Component } from 'react'

const Statistics = (props) => {
    if (props.all === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
    else {
        return (
            <table>
                <tbody>
                        <StaticsLine name='good' stat={props.good} />
                        <StaticsLine name='neutral' stat={props.neutral} />
                        <StaticsLine name='bad' stat={props.bad} />
                        <StaticsLine name='all' stat={props.all} />
                        <StaticsLine name='avg' stat={props.avg} />
                        <StaticsLine name='positive' stat={props.per} sign='%' />
                </tbody>
            </table>
        )
    }
}

const StaticsLine = ({ name, stat, sign }) => {
    return (
        <tr>
            <td> {name} </td>
            <td> {stat} {sign} </td>
        </tr>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [avg, setAvg] = useState(0)
    const [per, setPercentage] = useState(0)

    const goodFeedback = () => {
        const tempGood = good + 1
        setGood(tempGood)
        const tempAll = all + 1
        setAll(tempAll)
        setAvg((tempGood - bad) / tempAll)
        setPercentage(tempGood / tempAll * 100)
    }

    const neutralFeedback = () => {
        setNeutral(neutral + 1)
        const tempAll = all + 1
        setAll(tempAll)
        setAvg((good - bad) / tempAll)
        setPercentage(good / tempAll * 100)
    }

    const badFeedback = () => {
        const tempBad = bad + 1
        setBad(tempBad)
        const tempAll = all + 1
        setAll(tempAll)
        setAvg((good - tempBad) / tempAll)
        setPercentage(good / tempAll * 100)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={goodFeedback} text='good' />
            <Button handleClick={neutralFeedback} text='neutral' />
            <Button handleClick={badFeedback} text='bad' />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}
                all={all} avg={avg} per={per} />
        </div>
    )
}

export default App