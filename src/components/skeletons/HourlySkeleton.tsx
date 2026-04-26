import Card from "@/components/cards/Card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function HourlySkeleton() {
    return (

        <Card
            title="Hourly Forecast"
            childrenClassName="flex gap-4 overflow-x-scroll gap-2 p-2"
        >
            {Array.from({length: 8}).slice(0, 24).map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center space-x-3 gap-4"
                >
                    <Skeleton className="w-15 h-6" />
                    <Skeleton className="size-8" />
                    <Skeleton className="w-8 h-6" />
                </div>
            ))}
        </Card>
    )
}