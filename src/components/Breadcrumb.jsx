"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const Breadcamp = ({ auction, difRoute }) => {
  const params = useParams();
  const hash = params?.hash || "";

  return (
    <div className="w-auto h-auto flex items-center gap-2 font-main text-base leading-[19.2px] font-[400]">
      <Link
        href="/"
        className="text-[#AAAAAA] hover:text-[#fff] transition-colors duration-[250ms]"
      >
        Home
      </Link>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_552_744"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_552_744)">
          <path
            d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"
            fill="#AAAAAA"
          />
        </g>
      </svg>
      {difRoute ? (
        <Link
          href={`/${difRoute.toLowerCase()}`}
          className="text-[#AAAAAA] hover:text-[#fff] transition-colors duration-[250ms]"
        >
          {difRoute}
        </Link>
      ) : (
        <Link
          href="/shop"
          className="text-[#AAAAAA] hover:text-[#fff] transition-colors duration-[250ms]"
        >
          Shop
        </Link>
      )}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_552_744"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_552_744)">
          <path
            d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"
            fill="#AAAAAA"
          />
        </g>
      </svg>
      <span className="capitalize text-[#fff] line-clamp-1">
        {hash.split("-").join(" ")} {auction ? "(Auction)" : ""}
      </span>
    </div>
  );
};

export default Breadcamp;
