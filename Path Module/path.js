import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let result = path.join(__dirname, "Shashikant", "System", "Index.js");

console.log(result);
