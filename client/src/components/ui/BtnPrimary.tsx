interface Props {
  //   border: string;
  //   color: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const BtnPrimary: React.FC<Props> = ({ children, onClick, className, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      className={`py-2 px-3 rounded-sm ${
        disabled ? "bg-gray-300 cursor-not-allowed" : "outline outline-pink-500 "
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BtnPrimary;
