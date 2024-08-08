export function findWhereErrorHasBeenThrown(e: Error, testClassName: string) {
  const stackLines = e.stack?.split('\n');
  if (stackLines) {
    const revelantLine = stackLines.find((line) => line.trimStart().startsWith(`at ${testClassName}`));
    return revelantLine ? `${stackLines[0]}\n${revelantLine}` : stackLines[0];
  }
  return undefined;
}
