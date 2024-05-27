import { useMutation } from "@tanstack/react-query"
import { updateStudent } from "../../api/students.api"

const useUpdateStudentMutation = () => {
  return useMutation({ mutationFn: updateStudent, mutationKey: ["update-student"] })
}

export default useUpdateStudentMutation
