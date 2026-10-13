import { useState } from 'react'
import './App.css'

const questions = [
  {
    category: 'HTTP & APIs',
    prompt: 'Which HTTP status code is most appropriate after successfully creating a resource?',
    options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently'],
    correctIndex: 1,
    explanation: '201 Created indicates that the request succeeded and a new resource was created.',
  },
  {
    category: 'REACT',
    prompt: 'What happens when a component updates state with the useState setter?',
    options: ['The component re-renders', 'The page reloads', 'The state becomes global', 'The component unmounts'],
    correctIndex: 0,
    explanation: 'Updating state schedules a render so React can update the UI with the new value.',
  },
  {
    category: 'DATABASES',
    prompt: 'What is the best defense against SQL injection when querying with user input?',
    options: ['Escape HTML characters', 'Use parameterized queries', 'Hide database errors', 'Rename the database tables'],
    correctIndex: 1,
    explanation: 'Parameterized queries keep user-provided values separate from executable SQL.',
  },
  {
    category: 'CSS LAYOUT',
    prompt: 'Which CSS layout system is designed to handle rows and columns together?',
    options: ['Flexbox', 'CSS Grid', 'Float', 'Inline block'],
    correctIndex: 1,
    explanation: 'CSS Grid is a two-dimensional layout system for arranging content in rows and columns.',
  },
  {
    category: 'WEB SECURITY',
    prompt: 'Where should a server-side API key be stored in a deployed application?',
    options: ['In frontend source code', 'In a public repository', 'In a server-side environment variable', 'In a URL query string'],
    correctIndex: 2,
    explanation: 'Keep secrets on the server and provide them through protected environment configuration.',
  },
  {
    category: 'BACKEND',
    prompt: 'Which HTTP method is conventionally used to retrieve a resource without changing it?',
    options: ['POST', 'PATCH', 'DELETE', 'GET'],
    correctIndex: 3,
    explanation: 'GET requests retrieve a representation of a resource and should not modify server state.',
  },
]

function App() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const question = questions[questionIndex]
  const score = answers.reduce(
    (total, answer, index) => total + (answer === questions[index].correctIndex ? 1 : 0),
    0,
  )
  const progress = showResults ? 100 : (questionIndex / questions.length) * 100

  function checkAnswer() {
    if (selectedOption === null) return
    setAnswers((currentAnswers) => [...currentAnswers, selectedOption])
    setIsSubmitted(true)
  }

  function continueQuiz() {
    if (questionIndex === questions.length - 1) {
      setShowResults(true)
      return
    }
    setQuestionIndex((currentIndex) => currentIndex + 1)
    setSelectedOption(null)
    setIsSubmitted(false)
  }

  function restartQuiz() {
    setQuestionIndex(0)
    setSelectedOption(null)
    setAnswers([])
    setIsSubmitted(false)
    setShowResults(false)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Brightside home">
          <span className="wordmark-mark" aria-hidden="true">b.</span>
          <span>brightside</span>
        </a>
        <span className="topbar-note">A small quiz for a curious mind</span>
        <span className="edition">VOL. 01 <span aria-hidden="true">/</span> 2026</span>
      </header>

      <section className="intro" id="top">
        <div className="intro-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> SIX QUESTIONS, NO TIMER</p>
          <h1>Full stack,<br /><span>one question at a time.</span></h1>
          <p className="intro-description">A quick check-in on frontend, backend, APIs, and databases. Trust your instincts and learn something new.</p>
        </div>
        <div className="intro-aside" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit orbit-three" />
          <span className="orbit-center">?</span>
          <span className="orbit-caption">CURIOSITY<br />LOOKS GOOD ON YOU</span>
        </div>
      </section>

      <div className="quiz-layout">
        <section className="quiz-panel" aria-live="polite">
          {!showResults ? (
            <>
              <div className="question-meta">
                <span className="question-category">{question.category}</span>
                <span className="question-count">QUESTION <strong>{String(questionIndex + 1).padStart(2, '0')}</strong> <span className="count-divider">/</span> {String(questions.length).padStart(2, '0')}</span>
              </div>
              <div className="progress-track" aria-label={`Question ${questionIndex + 1} of ${questions.length}`}>
                <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
              </div>
              <h2 className="question-prompt">{question.prompt}</h2>
              <div className="option-list" role="group" aria-label="Answer choices">
                {question.options.map((option, index) => {
                  const isSelected = selectedOption === index
                  const isCorrect = question.correctIndex === index
                  let optionState = ''
                  if (isSubmitted && isCorrect) optionState = ' is-correct'
                  else if (isSubmitted && isSelected) optionState = ' is-incorrect'
                  else if (isSelected) optionState = ' is-selected'

                  return (
                    <button
                      className={`option${optionState}`}
                      type="button"
                      key={option}
                      onClick={() => !isSubmitted && setSelectedOption(index)}
                      aria-pressed={isSelected}
                      disabled={isSubmitted}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{option}</span>
                      <span className="option-indicator" aria-hidden="true">
                        {isSubmitted && isCorrect ? '✓' : isSubmitted && isSelected ? '×' : ''}
                      </span>
                    </button>
                  )
                })}
              </div>
              {isSubmitted && (
                <div className={`answer-feedback${selectedOption === question.correctIndex ? ' feedback-correct' : ' feedback-incorrect'}`}>
                  <strong>{selectedOption === question.correctIndex ? 'That is right.' : 'Not quite.'}</strong>
                  <span>{question.explanation}</span>
                </div>
              )}
              <div className="quiz-controls">
                <span className="keyboard-hint">{isSubmitted ? 'ANSWER RECORDED' : 'SELECT ONE ANSWER'}</span>
                {isSubmitted ? (
                  <button className="primary-button" type="button" onClick={continueQuiz}>
                    {questionIndex === questions.length - 1 ? 'See your results' : 'Next question'}
                    <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <button className="primary-button" type="button" onClick={checkAnswer} disabled={selectedOption === null}>
                    Check answer <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="results-view">
              <p className="question-category">YOUR QUIZ, WRAPPED UP</p>
              <div className="result-score"><span>{score}</span><span className="score-divider">/</span><span>{questions.length}</span></div>
              <h2>{score === questions.length ? 'A perfect little run.' : score >= 4 ? 'Well, look at you.' : score >= 2 ? 'Curiosity pays off.' : 'Good things to learn.'}</h2>
              <p className="result-summary">You got {score} {score === 1 ? 'answer' : 'answers'} right. Every question is a chance to pick up something new.</p>
              <div className="review-list">
                {questions.map((item, index) => {
                  const wasCorrect = answers[index] === item.correctIndex
                  return (
                    <div className="review-row" key={item.prompt}>
                      <span className={`review-mark${wasCorrect ? ' mark-correct' : ' mark-incorrect'}`} aria-label={wasCorrect ? 'Correct' : 'Incorrect'}>{wasCorrect ? '✓' : '×'}</span>
                      <span className="review-question">{item.prompt}</span>
                      <span className="review-answer">{item.options[item.correctIndex]}</span>
                    </div>
                  )
                })}
              </div>
              <button className="primary-button restart-button" type="button" onClick={restartQuiz}>
                Take it again <span aria-hidden="true">↻</span>
              </button>
            </div>
          )}
        </section>

        <aside className="score-panel" aria-label="Quiz status">
          <div className="score-panel-heading">
            <span className="status-dot" />
            <span>{showResults ? 'QUIZ COMPLETE' : 'YOUR SESSION'}</span>
          </div>
          <div className="score-block">
            <span className="score-label">CURRENT SCORE</span>
            <div className="score-number"><span>{score}</span><span className="score-total">/ {questions.length}</span></div>
            <span className="score-caption">{showResults ? 'FINAL SCORE' : 'correct answers'}</span>
          </div>
          <div className="side-progress">
            <div className="side-progress-label"><span>YOUR PROGRESS</span><span>{showResults ? '100%' : `${Math.round(progress)}%`}</span></div>
            <div className="side-progress-track"><span style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="score-note">
            <span className="note-star" aria-hidden="true">✳</span>
            <p>{showResults ? 'Thanks for playing. Keep following your curiosity.' : 'No rush. Take a moment and go with what feels right.'}</p>
          </div>
          <span className="side-index">BRIGHTSIDE QUIZ <span>NO. 001</span></span>
        </aside>
      </div>

      <footer className="page-footer">
        <span>MADE FOR THE JOY OF KNOWING</span>
        <span>TAKE A BREATH. TAKE A GUESS.</span>
      </footer>
    </main>
  )
}

export default App
