import Card from "@/components/cards/Card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function AdditionalSkeleton() {

    return (
        <Card
            title="Additional Info"
            childrenClassName="flex flex-col"
        >
            {Array.from({length: 6}).map((_, index) => (
                <div
                    key={index}
                    className="flex justify-between py-2"
                >
                    <div className="flex gap-4">
                        <Skeleton className="size-8 rounded-full " />
                        <Skeleton className="w-20 h-8" />
                    </div>
                    <span>
                        <Skeleton className="w-20 h-8" />
                    </span>
                </div>
            ))}
        </Card>
    );
};