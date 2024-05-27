import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormTextField from "../form_fields/FormTextField"
import FormDateField from "../form_fields/FormDateField"
import FormTextareaField from "../form_fields/FormTextAreaField"
import { IStudentProfile } from "./../../types/student.interface"
import useStudentsQuery from "../../react-query/queries/useStudentsQuery"
import useUpdateStudentMutation from "../../react-query/mutations/useUpdateStudentMutation"
import useUpcomingSessionsQuery from "../../react-query/queries/useUpcomingSessionsQuery"
import { PROGRESS } from "./../../constants/progress"
import FormSelectField from "../form_fields/FormSelectField"
import useSidePanelStore from "../../store/sidepanel.store"

import UpdateCheckinDateForm from "./UpdateCheckinDateForm"

const studentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  onboardDate: z.string().min(1, "Onboard date is required"),
  progress: z.string().min(1, "Progress is required"),
  nextCheckin: z.string().min(1, "Next check-in date is required"),
  notes: z.string().optional(),
})

type StudentFormValues = z.infer<typeof studentSchema>

interface Props {
  student: IStudentProfile
}

const EditStudentForm: React.FC<Props> = ({ student }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      onboardDate: student.onboardDate,
      progress: student.progress,
      nextCheckin: student.nextCheckin,
      notes: student.notes,
    },
  })

  const { mutate } = useUpdateStudentMutation()
  const { refetch } = useStudentsQuery(false)
  const { refetch: refetchUpcomingSessions } = useUpcomingSessionsQuery(false)

  const { setComponent } = useSidePanelStore()

  const onSubmit: SubmitHandler<StudentFormValues> = async (data) => {
    mutate(
      { ...student, ...data },
      {
        onSuccess() {
          refetch()
          refetchUpcomingSessions()
          setComponent(null, null)
        },
      }
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <FormTextField label="First Name" placeholder="First Name" id="firstName" error={errors.firstName?.message} {...register("firstName")} />
        <FormTextField label="Last Name" placeholder="Last Name" id="lastName" error={errors.lastName?.message} {...register("lastName")} />
        <FormTextField label="Email" placeholder="Email" id="email" error={errors.email?.message} {...register("email")} />
        <FormDateField label="Onboard Date" placeholder="Onboard Date" id="onboardDate" error={errors.onboardDate?.message} {...register("onboardDate")} />
        <FormSelectField
          label="Progress"
          id="progress"
          {...register("progress")}
          options={PROGRESS.map((item) => {
            return { value: item, label: item }
          })}
        />

        <FormDateField label="Next Check-in" placeholder="Next Check-in" id="nextCheckin" error={errors.nextCheckin?.message} {...register("nextCheckin")} />
        <FormTextareaField label="Notes" placeholder="Notes" id="notes" error={errors.notes?.message} {...register("notes")} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      <h1 className="text-2xl mb-8">Use this section if you checked in with the student</h1>
      <UpdateCheckinDateForm studentId={student.id} />
    </>
  )
}

export default EditStudentForm
