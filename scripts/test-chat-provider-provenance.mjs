#!/usr/bin/env node
'use strict';

import assert from 'node:assert/strict';
import { classifyChatResponse } from './lib/chat-provider-provenance.mjs';

const cases = [
  ['verified project fixture is not model generation', {
    answer: 'সূরা ফাতিহা — যাচাইকৃত প্রকল্পের উত্তর',
    language: 'bn',
    provider: 'verified-project-data'
  }, 'verified-data-fallback', false, true],
  ['Gemini model response is classified as generated', {
    answer: 'বাংলায় তৈরি একটি পরীক্ষামূলক উত্তর',
    language: 'bn',
    provider: 'gemini-2.5-flash'
  }, 'model-generated', true, true],
  ['Gemini lite response is classified as generated', {
    answer: 'বাংলা উত্তর',
    language: 'bn',
    provider: 'gemini-2.5-flash-lite'
  }, 'model-generated', true, true],
  ['Cloudflare AI response is classified as generated', {
    answer: 'বাংলা উত্তর',
    language: 'bn',
    provider: 'cloudflare-ai'
  }, 'model-generated', true, true],
  ['Cloudflare recovery model response is classified as generated', {
    answer: 'বাংলা উত্তর',
    language: 'bn',
    provider: 'cloudflare-workers-ai-recovery:@cf/google/gemma-4-26b-a4b-it'
  }, 'model-generated', true, true],
  ['research API fail-closed response is not model generation', {
    answer: 'যাচাইযোগ্য গবেষণা-রেকর্ড পাওয়া যায়নি।',
    language: 'bn',
    provider: 'research-api'
  }, 'research-api-fail-closed', false, true],
  ['local voice processing is not model generation', {
    answer: 'শব্দ সংশোধন',
    language: 'bn',
    provider: 'local-voice-engine'
  }, 'local-processing', false, true],
  ['unknown provider cannot be claimed as model generated', {
    answer: 'বাংলা উত্তর',
    language: 'bn',
    provider: 'unverified-provider'
  }, 'unknown-provider', false, true],
  ['empty answer is invalid even if provider says Gemini', {
    answer: '   ',
    language: 'bn',
    provider: 'gemini-2.5-flash'
  }, 'invalid-no-answer', false, false],
  ['English answer is generated but not Bengali acceptance', {
    answer: 'An English test answer',
    language: 'en',
    provider: 'gemini-2.5-flash'
  }, 'model-generated', true, false],
  ['missing provider is unknown', {
    answer: 'বাংলা উত্তর',
    language: 'bn'
  }, 'unknown-provider', false, true]
];

let passed = 0;
for (const [name, payload, expectedKind, expectedModelGenerated, expectedBengali] of cases) {
  try {
    const result = classifyChatResponse(payload);
    assert.equal(result.kind, expectedKind);
    assert.equal(result.modelGenerated, expectedModelGenerated);
    assert.equal(result.bengali, expectedBengali);
    passed++;
    console.log('PASS', name);
  } catch (error) {
    console.error('FAIL', name, '-', error?.stack || error);
  }
}
console.log(`RESULT: ${passed}/${cases.length} provider provenance cases passed`);
if (passed !== cases.length) process.exit(1);
console.log('BOUNDARY: fixture/unit evidence only; does not prove a live Gemini or Cloudflare AI call occurred.');
