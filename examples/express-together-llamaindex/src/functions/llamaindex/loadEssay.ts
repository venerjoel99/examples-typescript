import fs from "node:fs/promises";

export async function loadEssay(path: string): Promise<string> {
    return await fs.readFile(path, "utf-8");
}
