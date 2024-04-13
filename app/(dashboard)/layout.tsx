import Logo from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav>
                <Logo />
                <ThemeSwitcher />
                <UserButton afterSignOutUrl="/sign-in" />
            </nav>
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    )
}