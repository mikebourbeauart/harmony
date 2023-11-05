import Canvas from "@/components/Canvas";
import AppShell from "@/core/components/AppShell";
import MenuSidebar from "@/components/menu-sidebar/MenuSidebar";

export default function Home() {
	return (
		<AppShell>
			<main className="flex min-h-screen flex-col items-center justify-between ">
				<MenuSidebar />
				<Canvas />
			</main>
		</AppShell>
	);
}
