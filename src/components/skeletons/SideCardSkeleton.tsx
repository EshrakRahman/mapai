import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import InformationIcon from '/src/assets/information-3-svgrepo-com.svg?react';
import Card from "@/components/cards/Card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export function SideCardSkeleton() {
    return (
        <>
            <Card
                childrenClassName="flex flex-col gap-3 "
                className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60"
            >
                <div className="flex justify-between">
                    <div className="flex items-center gap-2 ">
                        <Skeleton className="w-12 h-7" />
                        <Skeleton className="w-12 h-7" />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <InformationIcon className='size-4' />
                            </TooltipTrigger>
                            <TooltipContent className="z-2000">
                                <p className="max-w-xs">

                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <span className="text-lg font-bold "></span>
                </div>
                <Skeleton className="w-full h-1.5" />

                <div className="flex justify-between text-xs">
                    <Skeleton className="w-2 h-4" />
                    <Skeleton className="w-2 h-4" />
                </div>
                <div className="flex justify-between">
                    {Array.from({length: 5}).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-15 h-6"
                        />

                    ))}
                </div>
            </Card>
        </>
    )
}