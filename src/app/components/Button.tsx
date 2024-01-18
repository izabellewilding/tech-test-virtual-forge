type ButtonBaseProps = {
  className: string;
  children: React.ReactNode;
  onClick: () => void;
};

type ButtonVariantProps = {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
  lighter?: boolean;
};

const BaseButton = ({ className, children, onClick }: ButtonBaseProps) => {
  return (
    <button
      type="button"
      className={`rounded-md align-middle p-3 text-white ${className || ""}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export const ButtonPrimary = (props: ButtonVariantProps) => {
  return (
    <BaseButton className="bg-indigo-500 hover:bg-indigo-400" {...props}>
      {props.children}
    </BaseButton>
  );
};

export const ButtonSecondary = (props: ButtonVariantProps) => {
  return (
    <BaseButton
      className={
        "rounded-md p-1 text-sm font-medium  " +
        (props.selected
          ? "bg-indigo-200 text-indigo-600"
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
