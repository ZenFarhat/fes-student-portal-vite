import { useQuery } from "@tanstack/react-query"
import { getStudents } from "../../api/students.api"

const useStudentsQuery = (enabled: boolean = true, name?: string) => {
  return useQuery({ queryFn: () => getStudents(name), queryKey: ["students"], enabled })
}

export default useStudentsQuery
