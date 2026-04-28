import type { ReactNode } from "react";

type Props = {
  onClick: () => void;
  text: ReactNode;          
  className?: string;
};

export default function Button({ onClick, text, className }: Props) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className={`cursor-pointer flex items-center justify-center  text-[16px] h-8 md:h-12 w-23 md:w-43 text-white  rounded-[8px] font-bold ${className}`}
      >
        {text}
      </button>
    </div>
  );
}