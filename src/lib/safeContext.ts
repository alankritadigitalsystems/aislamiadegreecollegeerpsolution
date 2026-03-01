export function safeContext(context: { params: Record<string, string> }) {
  return { params: { ...context.params } };
}
