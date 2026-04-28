import Hamburger from '/src/assets/hamburger-svgrepo-com.svg?react';
import type {Dispatch, SetStateAction} from "react";

type MobileHeaderProps = {
    setSidePanelOpen: Dispatch<SetStateAction<boolean>>;
}
export default function MobileHeader({setSidePanelOpen}: MobileHeaderProps) {
    return (
        <div className='w-full py-4 px-4 h-16 bg-background sticky top-0 xs:hidden z-1001'>

            <button
                onClick={() => setSidePanelOpen(true)}
            >
                <Hamburger className="size-6 invert flex justify-end lg:hidden" />
            </button>
        </div>
    )
}