import { BaseInput } from './BaseInput';
import { InputProps } from './IProps';

export const EmailInput: React.FC<InputProps> = ({ ...props }) => {
  return <BaseInput type='email' {...props} />;
};
