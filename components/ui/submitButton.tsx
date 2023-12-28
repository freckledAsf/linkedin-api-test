import { ReloadIcon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "./button";

type Props = ButtonProps & {
  isLoading: boolean;
};

const SubmitButton = ({ isLoading, children, ...props }: Props) => (
  <Button disabled={isLoading} {...props}>
    {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
    {children}
  </Button>
);

export default SubmitButton;
