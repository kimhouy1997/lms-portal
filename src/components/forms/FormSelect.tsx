import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText, 
  alpha, 
  useTheme 
} from '@mui/material';
import type { SelectProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface FormSelectProps<T extends FieldValues> extends Omit<SelectProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: { value: string | number; label: string }[];
}

export const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  ...props
}: FormSelectProps<T>) => {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            {...props}
            labelId={`${name}-label`}
            label={label}
            sx={{
              borderRadius: 3,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.02),
              },
              '&.Mui-focused': {
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                '& .MuiOutlinedInput-notchedOutline': {
                  borderWidth: 2,
                }
              }
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
