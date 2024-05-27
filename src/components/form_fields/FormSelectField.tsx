import { forwardRef } from "react"

interface Option {
  value: string
  label: string
}

interface Props {
  label: string
  options: Option[]
  id: string
  error?: string
}

const FormSelectField = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { label, options, id, error, ...rest } = props

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1">
        {label}:
      </label>
      <select id={id} ref={ref} className={`border-2 rounded-xl p-2 ${error ? "border-red-500" : ""}`} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
})

export default FormSelectField
