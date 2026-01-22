import { BaseInput } from './BaseInput';
import { InputProps } from './IProps';

export const PasswordInput: React.FC<InputProps> = ({ ...props }) => {
  return <BaseInput type='password' {...props} />;
};
