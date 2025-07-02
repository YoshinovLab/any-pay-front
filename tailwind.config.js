// tailwind.config.js
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
export const plugins = [
  iconsPlugin({
    collections: getIconCollections(["ic", "noto", "meteocons", "lucide"]),
  }),
];
