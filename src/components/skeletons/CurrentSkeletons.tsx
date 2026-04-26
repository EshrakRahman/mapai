import Card from "@/components/cards/Card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function CurrentSkeletons() {
    return (
        <Card
            title="Current Weather"
            childrenClassName="flex flex-col items-center gap-8"
        >
            <div className="flex flex-col gap-2 items-center">
                <Skeleton className="w-30 h-15" />
                <Skeleton className="size-14 rounded-full " />

                <Skeleton className="w-36 h-7" />

            </div>
            <div className="flex flex-col items-center gap-2">
                <p className="text-xl">Local time:</p>
                <Skeleton className="w-36 h-10" />

            </div>
            <div className="flex justify-between w-full gap-2">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Feels like</p>
                    <Skeleton className="w-16 h-6" />

                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Humidity</p>
                    <Skeleton className="w-16 h-6" />

                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500">Wind</p>
                    <Skeleton className="w-16 h-6" />
                </div>
            </div>
        </Card>
    );
};