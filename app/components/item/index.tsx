import { formatToEther, parseBigInt } from "@/utils/price";
import { IItemProps } from "./types";
import Image from "next/image";
import Rating from "../rating";

const Item = ({ name, image, category, cost, stock, rating }: IItemProps) => {
  return (
    <div className="card card-compact w-72 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={image}
          width={500}
          height={500}
          alt={name}
          priority={false}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{category}</p>
        <p>Stock: {parseBigInt(stock)}</p>

        <Rating value={parseBigInt(rating)} />
        <div className="card-actions justify-end">
          <button className="btn btn-primary">{parseBigInt(cost)} ETH</button>
        </div>
      </div>
    </div>
  );
};

export default Item;
