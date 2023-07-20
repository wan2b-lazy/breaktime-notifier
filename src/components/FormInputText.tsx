import { FC, memo } from "react";
import { Controller } from "react-hook-form";

import { TextField } from "@mui/material";

type InputFiledType = "number" | "time";
type FormInputProps = {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  required?: boolean;
  type?: InputFiledType;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  error?: boolean;
  helperText?: string | undefined;
  rules: any;
};

const FormInputText: FC<FormInputProps> = (props) => {
  const {
    name,
    control,
    rules,
    required,
    type,
    id,
    label,
    autoComplete,
    autoFocus,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          margin="normal"
          fullWidth
          variant="outlined"
          required={required}
          type={type}
          id={id}
          label={label}
          name={name}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          error={!!error}
          onChange={onChange}
          value={value}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
};

export default FormInputText;
