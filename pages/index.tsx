import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { useState } from "react"
import { useQuery } from "@datalogui/react"
import { Todos, TodoInterface, People, Manages } from "./database"

const Home: NextPage = () => {
  const [newTodoText, setNewTodoText] = useState("")

  // Reactive query to get all todos
  const todos = useQuery(({ id, text }: TodoInterface) => {
    Todos({ id, text, isCompleted: false })
  })

  // Reactive query to get all managers
  type ManagmentFilter = {
    personID: number
    personName: string
    managerID: number
    managerName: string
  }

  const managers = useQuery(
    ({ personID, personName, managerID, managerName }: ManagmentFilter) => {
      const people = { id: personID, name: personName }
      const joinPeopleToManager = { managee: personID, manager: managerID }
      const joinManagersToMangee = { id: managerID, name: managerName }

      People(people) // Get all people -> return as { personID, personName }
      Manages(joinPeopleToManager) // Join on the Manages table -> return as { personID, managerID }. Since "personID" is used twice, it has "joined" the data
      People(joinManagersToMangee) // Now join on "managerID", and get the "managerName"

      /**
       * This is a bit like like:
       * {
       *   id: personID,
       *   name: personName,
       *   manager: {
       *     id: personID,
       *     name: managerName,
       *   }
       * }
       *
       */
    }
  )

  const randomId = () => Math.random().toString(36).substring(2, 15)

  function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("managers", managers)
    Todos.assert({ id: randomId(), text: newTodoText, isCompleted: false })
    setNewTodoText("")
  }

  function markCompleted(id: string) {
    console.log("id", id)
    console.log("Todos", todos)
    Todos.update({ id: id }, { isCompleted: true })
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
            <p key={todo.id}>
              {todo.text}{" "}
              <span
                onClick={() => markCompleted(todo.id)}
                style={{ cursor: "pointer" }}
              >
                ❌
              </span>
            </p>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
