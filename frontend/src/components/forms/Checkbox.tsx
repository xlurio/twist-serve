import {
  Checkbox as MUICheckbox,
  FormControlLabel,
  CheckboxProps,
} from '@mui/material';

export default function Checkbox(
  props: {label?: string} & CheckboxProps
): JSX.Element {
  const {label, ...propsWithoutLabel} = props;
  return (
    <FormControlLabel
      control={<MUICheckbox {...propsWithoutLabel} />}
      label={label}
    />
  );
}
