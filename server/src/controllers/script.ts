import fs from "fs";
import path from "path";

fs.writeFileSync(path.join(__dirname, "test.text"), "55");
