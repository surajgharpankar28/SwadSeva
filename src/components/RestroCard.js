import React from "react";
import { CON_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const RestroCard = (props) => {
  const { resData } = props;

  const {
    id,
    name,
    cuisines,
    avgRating,
    cloudinaryImageId,
    deliveryTime,
    areaName,
  } = resData?.info;

  return (
    <Link target="_blank" to={"/restaurants/" + id}>
      <div className="pr-8 pl-4">
        <div className="sc-etVdmn aNris w-[15rem] h-auto">
          <div className="sc-eNSrOW hqryrO grid transition duration-50 gap-3 grid-flow-row justify-stretch items-center p-0 cursor-pointer">
            <div className="sc-cWSHoV jdRrlh relative ">
              <div className="sc-eBMEME hkLgGF  top-0 left-0 w-full ">
                <div className="w-full h-full sc-dtInlm eNZkiz relative rounded-lg overflow-hidden">
                  <img
                    className="sc-bXCLTC jRHowI w-full h-40 object-cover "
                    src={CON_URL + cloudinaryImageId}
                    alt={name}
                  />
                  <div className="sc-dtBdUo gzvYBM sc-kOPcWz fFPUzA absolute bottom-0 right-0 left-0 grid content-end text-left px-3 pb-2 h-[81px] bg-gradient-to-b from-transparent to-[#1B1E24] [background:linear-gradient(rgba(27,30,36,0)0%,rgb(27,30,36)84.21%)]">
                    <div className="sc-aXZVg jJrxcx sc-kOHTFB jKfDUb uppercase font-[ProximaNovaCond] font-extrabold text-[16px] leading-[16px] tracking-[-0.4px] text-[rgba(255,255,255,0.92)] overflow-hidden w-full block break-words line-clamp-1"></div>
                    <div className="sc-aXZVg kUePhA sc-kOHTFB jKfDUb text-white font-bold">
                      {resData.info.aggregatedDiscountInfoV3?.header ||
                      resData.info.aggregatedDiscountInfoV3?.subHeader
                        ? resData.info.aggregatedDiscountInfoV3?.header +
                          " " +
                          resData.info.aggregatedDiscountInfoV3?.subHeader
                        : ""}
                    </div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-3">
              <div>
                <div className="font-bold text-lg">{name}</div>
              </div>

              <div className="sw-restaurant-card-subtext-container grid items-center mt-0.5 gap-0.5 grid-flow-col justify-start">
                <div className="mt-[-2px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    role="img"
                    aria-hidden="true"
                    strokeColor="rgba(2, 6, 12, 0.92)"
                    fillColor="rgba(2, 6, 12, 0.92)"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="9"
                      fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                    ></circle>
                    <path
                      d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                      fill="white"
                    ></path>
                    <defs>
                      <linearGradient
                        id="StoreRating20_svg__paint0_linear_32982_71567"
                        x1="10"
                        y1="1"
                        x2="10"
                        y2="19"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#21973B"></stop>
                        <stop offset="1" stopColor="#128540"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="-mt-1 ml-1 text-md">
                  <span className="">{avgRating} • </span>
                  {deliveryTime} mins
                </div>
              </div>

              <div className="sw-restaurant-card-descriptions-container font-light">
                <div className="sc-aXZVg font-extralight text-[14px] leading-[19px] tracking-[-0.3px] text-[rgba(2,6,12,0.6)] overflow-hidden w-full break-words">
                  {cuisines.join(", ")}
                </div>
                <div className="sc-aXZVg font-extralight text-[14px] leading-[19px] tracking-[-0.3px] text-[rgba(2,6,12,0.6)] overflow-hidden w-full break-words">
                  {areaName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestroCard;
