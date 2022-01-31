import React, {FormEvent, useEffect, useState} from 'react'
import ScoreInput from './ScoreInput'
import styles from './ScoreForm.module.scss'

interface ScoreFormProps {
  onSubmit: (score: number) => void,
}

const ScoreForm = ({onSubmit}: ScoreFormProps) => {
  const [score, setScore] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
  }, [score])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (score !== null) {
      try {
        onSubmit(score)
        setScore(null)
      } catch (e: any) {
        setError(e.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Enter score:</h2>
      {error && <p className={styles.error}>{error}</p>}
      <ScoreInput value={score} onChange={setScore}/>
      <button type="submit" className={styles.submit}>Submit</button>
    </form>
  );
};

export default ScoreForm;
