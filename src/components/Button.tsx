const Button = ({
  id,
  title,
  leftIcon,
  containerClass,
  rightIcon,
  handleClick
}: {
  id: string;
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClass: string;
  handleClick?: () => void;
}) => {
  return (
    <button
      id={id}
      onClick={handleClick}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <span>{title}</span>
      </span>

      {rightIcon}
    </button>
  );
};

export default Button;
