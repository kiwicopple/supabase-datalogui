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
