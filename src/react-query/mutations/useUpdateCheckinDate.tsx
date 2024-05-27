import { useMutation } from "@tanstack/react-query"

import { updateCheckinDate } from "../../api/students.api"

const useUpdateCheckinDate = () => {
  return useMutation({ mutationFn: updateCheckinDate, mutationKey: ["updateCHeckin"] })
}

export default useUpdateCheckinDate
