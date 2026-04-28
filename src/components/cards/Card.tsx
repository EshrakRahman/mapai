import {type ReactNode} from "react";
import clsx from 'clsx';

type Props = {
    title?: string;
    children: ReactNode;
    className?: string;
    childrenClassName?: string;
};

export default function Card({children, title, className, childrenClassName}: Props) {
    return (
        <div className={clsx("p-4 rounded-xl bg-zinc-900 shadow-md flex flex-col gap-4 text-white 2xl:h-full", className)}>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className={clsx(childrenClassName, 'animate-[fade-in_0.6_ease-out_forwards] 2xl:flex-1')}>{children}</div>
        </div>
    );
}
