import * as datalog from "@datalogui/datalog"

// Our main Todos table
export interface TodoInterface {
  id: string
  text: string
  isCompleted: boolean
}

export const Todos = datalog.newTable<TodoInterface>({
  id: datalog.StringType,
  text: datalog.StringType,
  isCompleted: datalog.BoolType,
})

export const People = datalog.newTable<{ id: number; name: string }>({
  id: datalog.NumberType,
  name: datalog.StringType,
})

// Add some data
People.assert({ id: 0, name: "Alice" })
People.assert({ id: 1, name: "Bob" })

type ID = number
export const Manages = datalog.newTable<{ manager: ID; managee: ID }>({
  manager: datalog.NumberType,
  managee: datalog.NumberType,
})

// Add some managers
Manages.assert({ manager: 0, managee: 1 })
