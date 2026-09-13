interface CoatingButtonProps {
  borderRadius?: string;
}

const CoatingButton = ({ borderRadius = "rounded-xl" }: CoatingButtonProps) => {
  return (
    <div
      className={`absolute inset-0 bg-black/20 flex justify-center items-center 
        ${borderRadius}`}
    >
      <div
        className="animate-spin rounded-full border-5 border-amber-200/30 
        border-t-amber-400 w-8 h-8"
      />
    </div>
  );
};

export default CoatingButton;
