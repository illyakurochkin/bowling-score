import React, {FormEvent, useState} from 'react';
import ScoreInput from './ScoreInput';
import styles from './ScoreForm.module.scss'

interface ScoreFormProps {
  onSubmit: (score: number) => void,
}

const ScoreForm = ({onSubmit}: ScoreFormProps) => {
  const [score, setScore] = useState<number | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (score !== null) {
      onSubmit(score)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Enter score:</h2>
      <ScoreInput value={score} onChange={setScore}/>
      <button type="submit" className={styles.submit}>Submit</button>
    </form>
  );
};

export default ScoreForm;
