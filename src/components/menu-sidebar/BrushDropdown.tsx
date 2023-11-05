"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// type BrushDropdownProps = {
// 	items: string[];
// 	onItemClick: (item: string) => void;
// };

const BrushDropdown: React.FC = () => {
	const [brush, setBrush] = React.useState("sketchy");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Open</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" side="right">
				<DropdownMenuLabel>Brushes</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={brush} onValueChange={setBrush}>
					<DropdownMenuRadioItem value="sketchy">
						Sketchy S
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="chrome">
						Chrome C
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="fur">
						Fur F
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
		//   <Container>
		//     {items.map((item, index) => (
		//       <MenuItem key={index} onClick={() => onItemClick(item)}>
		//         {item}
		//       </MenuItem>
		//     ))}
		//   </Container>
	);
};

export default BrushDropdown;
