# Chat v1 — গবেষণা সহকারী

এই folder-এ বাংলা AI Chat screen-এর সম্পূর্ণ UI module রাখা হয়েছে।

## Files
- `chat-v1.html` — screen markup ও Bengali labels
- `chat-v1.css` — visual system, responsive layout, drawer ও composer styling
- `chat-v1.js` — chat, voice input, speech output, mode selection, stop/clear এবং backend routing

## Design rule
নিজস্ব Al-Quran Research visual language; কোনো third-party icon library dependency নেই।

## Integration
Home v1-এর `AI সহায়ক` button এই screen-এ route করে। Backend endpoint বর্তমানে বিদ্যমান project chat API-তে POST করে। API ব্যর্থ হলে unverified content তৈরি না করে সীমিত local fallback status দেখায়।

## Scope
এটি chat UI layer। মূল Quran/research data এখানে hard-code করা হবে না; database/retrieval layer আলাদা থাকবে।
