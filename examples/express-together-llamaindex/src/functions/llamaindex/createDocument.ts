import {
    Document,
} from "llamaindex";

export async function createDocument(essay: string, path: string): Promise<Document> {
    return new Document({ text: essay, id_: path });
}