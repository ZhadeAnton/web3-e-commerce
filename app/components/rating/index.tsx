import { IRatingProps } from "./types";

const Rating = ({ value }: IRatingProps) => {
  return (
    <div className="rating disabled">
      <input
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 ${value > 1 && "bg-orange-400"}`}
      />
      <input
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 ${value > 2 && "bg-orange-400"}`}
      />
      <input
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 ${value > 3 && "bg-orange-400"}`}
      />
      <input
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 ${value > 4 && "bg-orange-400"}`}
      />
      <input
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 ${value === 5 && "bg-orange-400"}`}
      />
    </div>
  );
};

export default Rating;
