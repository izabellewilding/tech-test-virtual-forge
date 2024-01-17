type ButtonBaseProps = {
  className: string;
  children: React.ReactNode;
};

export const Button = ({ className, children }: ButtonBaseProps) => {
  return (
    <button
      type="button"
      className={`rounded-md align-middle p-3 text-white ${className || ""}`}
    >
      {children}
    </button>
  );
};
