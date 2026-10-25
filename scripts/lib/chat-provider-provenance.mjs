const MODEL_PROVIDER_PATTERNS = [
  /^gemini-[a-z0-9._-]+$/i,
  /^cloudflare-ai$/i,
  /^cloudflare-workers-ai-recovery:@cf\/[a-z0-9._/-]+$/i
];

export function classifyChatResponse(payload) {
  const provider = typeof payload?.provider === 'string' ? payload.provider.trim() : '';
  const answer = typeof payload?.answer === 'string' ? payload.answer.trim() : '';
  if (!answer) {
    return { kind: 'invalid-no-answer', provider: provider || null, modelGenerated: false, bengali: false };
  }

  const bengali = /[\u0980-\u09FF]/u.test(answer);
  if (provider === 'verified-project-data') {
    return { kind: 'verified-data-fallback', provider, modelGenerated: false, bengali };
  }
  if (MODEL_PROVIDER_PATTERNS.some((pattern) => pattern.test(provider))) {
    return { kind: 'model-generated', provider, modelGenerated: true, bengali };
  }
  if (provider === 'research-api') {
    return { kind: 'research-api-fail-closed', provider, modelGenerated: false, bengali };
  }
  if (provider === 'local-voice-engine') {
    return { kind: 'local-processing', provider, modelGenerated: false, bengali };
  }
  return { kind: 'unknown-provider', provider: provider || null, modelGenerated: false, bengali };
}
