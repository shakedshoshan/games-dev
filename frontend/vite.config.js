import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
		  "@": path.resolve(__dirname, "./src"),
		},
	  },
	server: {
		port: 5173,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
});


// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"
 
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })