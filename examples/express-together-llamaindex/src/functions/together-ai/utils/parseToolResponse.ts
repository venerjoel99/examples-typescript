export function parseToolResponse(response: string) {
    const functionRegex = /<function=(\w+)>(.*?)<\/function>/;
    const match = response.match(functionRegex);

    if (match) {
        const [, functionName, argsString] = match;
        try {
            return {
                function: functionName,
                arguments: JSON.parse(argsString),
            };
        } catch (error) {
            return null;
        }
    }

    return null;
}