import Logo from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav className="w-screen flex  items-center border-b border-border h-[60px]  ">
                <div className="flex items-center justify-start w-full pl-2 ">
                    <Logo />
                </div>
                <div className="flex items-center justify-end gap-x-4 pr-4  w-full ">
                    <ThemeSwitcher />
                    <UserButton afterSignOutUrl="/sign-in" />
                </div>
            </nav>
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    )
}