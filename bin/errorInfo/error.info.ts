export function findWhereErrorHasBeenThrown(e: Error, testClassName: string) {
  const stackLines = e.stack?.split('\n');
  if (stackLines) {
    const relevantLine = stackLines.find((line) =>
      line.trimStart().startsWith(`at ${testClassName}`),
    );
    return relevantLine ? `${stackLines[0]}\n${relevantLine}` : stackLines[0];
  }
  return undefined;
}
