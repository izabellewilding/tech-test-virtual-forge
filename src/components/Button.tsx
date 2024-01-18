import { Slot } from "@radix-ui/react-slot";

type ButtonBaseProps = {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
  asChild?: boolean;
  type?: "submit" | "button";
};

type ButtonVariantProps = {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  lighter?: boolean;
  asChild?: boolean;
  type?: "submit" | "button";
};

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
      className={`rounded-md align-middle text-center p-3  ${className || ""}`}
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
        "rounded-md py-1 text-sm font-medium  " +
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
