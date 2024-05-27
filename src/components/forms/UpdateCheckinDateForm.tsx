import { useForm, SubmitHandler } from "react-hook-form"
import FormDateField from "../form_fields/FormDateField"
import useUpdateCheckinDate from "../../react-query/mutations/useUpdateCheckinDate"
import useStudentsQuery from "../../react-query/queries/useStudentsQuery"
import useUpcomingSessionsQuery from "../../react-query/queries/useUpcomingSessionsQuery"
import useSidePanelStore from "../../store/sidepanel.store"

const UpdateCheckinDateForm = ({ studentId }: { studentId?: string }) => {
  const { mutate: mutateDate } = useUpdateCheckinDate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ checkinDate: string }>()

  const { refetch } = useStudentsQuery(false)
  const { refetch: refetchUpcomingSessions } = useUpcomingSessionsQuery(false)

  const { setComponent } = useSidePanelStore()

  const onSubmit: SubmitHandler<{ checkinDate: string }> = async (data) => {
    mutateDate(
      { id: studentId || "", date: data.checkinDate },
      {
        onSuccess: () => {
          refetch()
          refetchUpcomingSessions()
          setComponent(null, null)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <FormDateField label="I checked in with this student on..." placeholder="Check-in Date" id="checkinDate" error={errors.checkinDate?.message} {...register("checkinDate", { required: "Check-in date is required" })} />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Update Check-in Date
      </button>
    </form>
  )
}

export default UpdateCheckinDateForm
