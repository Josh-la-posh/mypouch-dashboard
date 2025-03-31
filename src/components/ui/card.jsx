import { TrendingUp } from "lucide-react";
import React from "react";

const Card = ({
    color,
    amount, 
    name,
    rate,
    icon,
    className,
    iconClassName,
    amountClassName,
    nameClassName,
    rateClassName
}) => {

    return(
        <div className={`w-full min-w-36 max-w-60 rounded-md p-3 bg-[#CABEC7] ${className}`}>
            <div className="flex gap-2">
                <div className={`mt-1 text-[4px] md:text-xs ${color} ${iconClassName}`}>
                    {icon}
                </div>
                <div className="">
                    <h1 className={`text-xs md:text-md font-[700] dark:text-primary-dark ${amountClassName}`}>{amount}</h1>
                    <p className={`text-[7px] md:text-xs font-[600] text-primary dark:text-primary-dark ${nameClassName}`}>{name}</p>
                    {rate && 
                        (<div className={`text-[9px] ${(rate[0] === '-' || rate == 0) ? 'text-danger' : 'text-primary-dark'} flex gap-1 items-center ${rateClassName}`}>
                            <TrendingUp size='12px'/>
                            {rate} %
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;