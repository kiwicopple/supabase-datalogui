import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import * as datalog from "@datalogui/datalog"
import { useState } from "react"
import { useQuery } from "@datalogui/react"

interface TodoInterface {
  id: string
  text: string
  isCompleted: boolean
}

// Our main Todos table
const Todos = datalog.newTable<TodoInterface>({
  id: datalog.StringType,
  text: datalog.StringType,
  isCompleted: datalog.BoolType,
})

const Home: NextPage = () => {
  const [newTodoText, setNewTodoText] = useState("")

  // Reactive query to get all todos
  const todos = useQuery(({ id, text }: TodoInterface) => {
    Todos({ id, text, isCompleted: false })
  })

  const randomId = () => Math.random().toString(36).substring(2, 15)

  function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    Todos.assert({ id: randomId(), text: newTodoText, isCompleted: false })
    setNewTodoText("")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Supabase Datalog UI</title>
        <meta name="description" content="Supabase Datalog UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Test</h1>
        <div>
          {/* Form to create a todo */}
          <form className={styles.form} onSubmit={handleForm}>
            <input
              type="text"
              placeholder="Add a todo"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
        <div>
          <h2>Your todos are:</h2>
          {todos.map((todo: TodoInterface) => (
            <p key={todo.id}>{todo.text}</p>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
