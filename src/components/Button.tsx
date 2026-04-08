type Props = {
  onClick: () => void;
  text: string;
  className?: string;
};

export default function Button({ onClick, text, className }: Props) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className={`cursor-pointer text-sm mt-4.25 text-white w-80  rounded-lg ${className}`}
      >
        {text}
      </button>
    </div>
  );
}