import { BaseInput } from './BaseInput';
import { InputProps } from './IProps';

export const NumberInput: React.FC<InputProps> = ({ ...props }) => {
  return <BaseInput type='number' {...props} />;
};
