import { TrendingUp } from "lucide-react";
import React from "react";

const Card = ({
    color,
    amount, 
    name,
    rate,
    icon,
    iconClassName,
    amountClassName,
    nameClassName,
    rateClassName
}) => {

    return(
        <div className={`rounded-md p-3 ${color ? color : 'bg-greyText'}`}>
            <div className="flex gap-2">
                <div className={`mt-1 dark:text-white ${iconClassName}`}>
                    {icon}
                </div>
                <div className="">
                    <h1 className={`text-md font-[700] dark:text-white ${amountClassName}`}>{amount}</h1>
                    <p className={`text-[10px] font-[600] text-primary ${nameClassName}`}>{name} Users</p>
                    {rate && 
                        (<div className={`text-[9px] text-danger flex gap-1 items-center ${rateClassName}`}>
                            <TrendingUp size='12px'/>
                            {rate}%
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;