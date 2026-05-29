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
        <div className={`w-full rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-slate-950/40 transition-shadow ${className}`}>
            <div className="flex gap-3 items-start">
                <div className={`text-sm ${color} ${iconClassName}`}>
                    {icon}
                </div>
                <div className="">
                    <h1 className={`text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 ${amountClassName}`}>{amount}</h1>
                    <p className={`text-xs font-medium text-slate-500 dark:text-slate-400 ${nameClassName}`}>{name}</p>
                    {rate && 
                        (<div className={`text-xs ${(rate[0] === '-' || rate == 0) ? 'text-danger' : 'text-color-green'} flex gap-1 items-center mt-2 ${rateClassName}`}>
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
