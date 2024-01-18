type ButtonBaseProps = {
  className: string;
  children: React.ReactNode;
  onClick: () => void;
};

type ButtonVariantProps = {
  selected?: boolean;
  children: React.ReactNode;
  onClick: () => void;
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
    <BaseButton className={"bg-indigo-500 hover:bg-indigo-400"} {...props}>
      {props.children}
    </BaseButton>
  );
};

export const ButtonSecondary = (props: ButtonVariantProps) => {
  return (
    <BaseButton
      className={
        "rounded-md p-1 text-sm font-semibold " +
        (props.selected ? "bg-indigo-200 text-indigo-600" : "text-black")
      }
      {...props}
    >
      {props.children}
    </BaseButton>
  );
};
