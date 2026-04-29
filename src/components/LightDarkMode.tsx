import Sun from "@/assets/sun-svgrepo-com.svg?react"
import Moon from "@/assets/Moon-svgrepo-com.svg?react"
import {Switch} from "@/components/ui/switch.tsx";
import {useTheme} from "@/components/ThemeProvider.tsx";

export default function LightDarkMode() {
    const {theme, toggleTheme} = useTheme();
    return (
        <div className="dark-mode flex gap-2 items-center ">
            <Sun className="size-5 invert" />
            <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
            />
            <Moon className="size-5 invert" />
        </div>
    )
}