export function health(env) {
  return {
    service: 'al-quran-research-api',
    api_version: 'v1',
    status: 'ready-for-integration',
    data_source: env?.DB ? 'd1-configured' : 'master-dataset-adapter',
    ai_binding: Boolean(env?.AI),
    timestamp: new Date().toISOString()
  };
}
