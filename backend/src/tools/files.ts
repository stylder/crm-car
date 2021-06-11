import { UUID } from "./uuid";
const path = require("path");
const fs = require("fs");

export const safeFile = async (tempPath: string, fileName: string) => {
        const file = UUID() + fileName
        const targetPath = path.join(__dirname, "../../public/files/" + file);
        let publicFile
        try {
          await fs.copyFileSync(tempPath, targetPath);
          publicFile = file
        } catch (error) {
            publicFile = error
        } 
        return publicFile
}