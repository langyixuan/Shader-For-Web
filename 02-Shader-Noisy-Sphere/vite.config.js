import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

import * as path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    plugins: [glsl()],
});
