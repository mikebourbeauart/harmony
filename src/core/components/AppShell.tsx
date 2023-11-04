import CanvasDataProvider from "./CanvasDataProvider";

function AppShell({ children }: React.PropsWithChildren<{}>) {
	return <CanvasDataProvider>{children}</CanvasDataProvider>;
}

export default AppShell;
