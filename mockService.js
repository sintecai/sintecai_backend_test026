function mockAnalyze(message) {
  return {
    priority: "low",
    category: "general",
    summary: "Mock response",
    draft_reply: "This is a mock reply for testing."
  };
}

module.exports = { mockAnalyze };
