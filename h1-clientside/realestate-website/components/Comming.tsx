import { Construction } from "lucide-react";

const CommingSoon = () => {
    return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-[400px]">
        <div className="p-2 bg-yellow-500 rounded-full animate-pulse">
            <Construction className="size-20 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-center">This section is under construction</h1>
        <p className="text-sm text-muted-foreground text-center">We are working on getting the section up and running, come back later.</p>
    </div>);
}

export default CommingSoon;
