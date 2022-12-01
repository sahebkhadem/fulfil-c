import { useEffect } from "react";

import { themes } from "./themes";

const useTheme = (selectedTheme) => {
	useEffect(() => {
		const theme = themes[selectedTheme] || themes.light;
		Object.keys(theme).forEach((key) => {
			const value = theme[key];
			document.documentElement.style.setProperty(key, value);
		});
	}, [selectedTheme]);
};

export default useTheme;
