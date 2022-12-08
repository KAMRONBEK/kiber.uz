import { TextField } from "@mui/material"
import { forwardRef, useMemo } from "react"
import { Controller } from "react-hook-form"

//@ts-ignore
const FTextField = ({ control, name, label, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref , onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            onChange={onChange}
            value={value}
            inputRef={ref}
            label={label}
            error={!!error}
            helperText={error ? error.message : " "}
            size="small"
            {...props}
          />
        )
      }}
    />
  )
}

export default FTextField
