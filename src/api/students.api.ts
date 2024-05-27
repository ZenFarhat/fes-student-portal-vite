import { SUPABASE_CLIENT } from "../supabase"
import { IStudentProfile } from "./../types/student.interface"

export const updateStudent = async (student: IStudentProfile) => {
  await SUPABASE_CLIENT.from("students").upsert(student)
}

export const getUpcomingSessions = async () => {
  const data = await SUPABASE_CLIENT.from("students").select("*").range(0, 15).order("nextCheckin", { ascending: true })

  return data.data
}

export const getStudents = async (name?: string) => {
  if (!name || name.length === 0) {
    const allUsers = await SUPABASE_CLIENT.from("students").select("*").range(0, 20).order("firstName", { ascending: true })

    return allUsers.data
  }

  const data = await SUPABASE_CLIENT.from("students").select("*").range(0, 20).order("firstName", { ascending: true }).ilike("firstName", `%${name}%`)

  return data.data
}

export const createStudent = async (student: IStudentProfile) => {
  await SUPABASE_CLIENT.from("students").insert(student)
}

interface IPayload {
  date: string
  id: string
}

export const updateCheckinDate = async (payload: IPayload) => {
  const currentDate = new Date(payload.date)

  currentDate.setDate(currentDate.getDate() + 14)

  const updatedDate = currentDate.toISOString().split("T")[0]

  await SUPABASE_CLIENT.from("students").upsert({ id: payload.id, nextCheckin: updatedDate })
}
