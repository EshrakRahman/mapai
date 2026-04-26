import Card from "@/components/cards/Card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function DailySkeleton() {
    return (
        <Card
            title="Daily Forecast"
            childrenClassName="flex flex-col gap-4"
        >
            {Array.from({length: 8}).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between gap-4"
                >
                    <Skeleton className="w-9 h-8" />
                    <Skeleton className="size-8 rounded-full " />
                    <Skeleton className=" size-8" />
                    <Skeleton className=" size-8" />
                    <Skeleton className=" size-8" />
                </div>
            ))}
        </Card>
    )
}