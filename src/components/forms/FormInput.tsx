import { TextField, alpha, useTheme } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  ...props
}: FormInputProps<T>) => {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message || props.helperText}
          fullWidth
          sx={{
            ...props.sx,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.02),
              },
              '&.Mui-focused': {
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
              }
            }
          }}
        />
      )}
    />
  );
};
