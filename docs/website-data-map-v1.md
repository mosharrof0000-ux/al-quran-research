# Website Data Map v1.0

বর্তমান UI অপরিবর্তিত রেখে কোন অংশ কোন research data ব্যবহার করবে তার contract।

| Website feature | Data contract | API ধারণা |
|---|---|---|
| সূরা তালিকা | `surah` | GET /api/v1/surahs |
| আয়াত পাঠ | `ayah` | GET /api/v1/surahs/{id}/ayahs |
| শব্দভিত্তিক গবেষণা | `token`, `lemma`, `root`, `morphology`, `grammar_annotation` | GET /api/v1/ayahs/{id}/tokens |
| Syntax | `syntax_relation` | GET /api/v1/ayahs/{id}/syntax |
| অর্থ | `meaning` | GET /api/v1/tokens/{id}/meanings |
| অনুবাদ | `translation_edition`, `translation` | GET /api/v1/ayahs/{id}/translations |
| Evidence | `evidence_source`, `evidence_link` | GET /api/v1/entities/{type}/{id}/evidence |
| Research claim | `research_claim`, `analysis_variant` | GET /api/v1/research/claims |
| Concordance | token/root + derived index | GET /api/v1/search/concordance |
| Search | derived search indexes | GET /api/v1/search |
| Metrics | `metric_definition`, `metric_run` | GET /api/v1/metrics |
| AI Chat | verified records + API contract | POST /api/v1/research/ask |
| Future sync | `sync_state` | internal/admin pipeline |

## UI safety rule
এই architecture তৈরি করতে `index.html` বা বর্তমান visual design বদলানোর প্রয়োজন নেই। UI কেবল API/data contract অনুসরণ করবে।

## AI data rule
AI উত্তর দেওয়ার আগে সম্ভব হলে verified corpus context নিতে হবে। নতুন বিশ্লেষণ হলে সেটি draft research claim হিসেবে বিবেচিত হবে; evidence review ছাড়া published/verified status পাবে না।

## Data flow
`User -> Website -> Research API -> Database`
`AI Chat -> Research API -> Verified/Versioned Data -> AI response`

## Expansion rule
নতুন feature এলে প্রথমে নির্ধারণ করতে হবে: এটি existing entity-এর field, নতুন relation, নাকি নতুন extension module। Core identity ভাঙা যাবে না।
