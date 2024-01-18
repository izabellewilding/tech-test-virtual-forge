import { Slot } from "@radix-ui/react-slot";

type ButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
  type?: "submit" | "button";
};

type ButtonVariantProps = {
  selected?: boolean;
  lighter?: boolean;
} & ButtonBaseProps;

const BaseButton = ({
  className,
  children,
  onClick,
  asChild,
  type,
}: ButtonBaseProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      type={type || "button"}
      className={`rounded-md align-middle text-center p-3 w-full whitespace-nowrap ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

export const ButtonPrimary = (props: ButtonVariantProps) => {
  return (
    <BaseButton
      className="bg-indigo-500 hover:bg-indigo-400 text-white"
      {...props}
    >
      {props.children}
    </BaseButton>
  );
};

export const ButtonSecondary = (props: ButtonVariantProps) => {
  return (
    <BaseButton
      className={
        "rounded-md py-1 text-sm font-medium " +
        (props.selected
          ? "bg-indigo-100 text-indigo-600"
          : props.lighter
          ? "text-gray-500"
          : "text-black")
        // (props.lighter && "text-gray-700")
      }
      {...props}
    >
      {props.children}
    </BaseButton>
  );
};
