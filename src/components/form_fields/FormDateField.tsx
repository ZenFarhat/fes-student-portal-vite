import { forwardRef } from "react"

interface Props {
  label: string
  placeholder: string
  id: string
  error?: string
}

const FormDateField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, placeholder, id, error, ...rest } = props

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1">
        {label}:
      </label>
      <input type="date" placeholder={placeholder} name={id} id={id} ref={ref} className={`border-2 rounded-xl p-2 ${error ? "border-red-500" : ""}`} {...rest} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
})

export default FormDateField
