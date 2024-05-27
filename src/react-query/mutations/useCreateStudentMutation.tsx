import { useMutation } from "@tanstack/react-query"

import { createStudent } from "../../api/students.api"

const useCreateStudentMutation = () => {
  return useMutation({ mutationFn: createStudent, mutationKey: ["update-student"] })
}

export default useCreateStudentMutation
