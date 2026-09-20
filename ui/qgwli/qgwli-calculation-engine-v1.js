/* QGWLI Calculation Engine v1.0
   Static-data execution path for mathematical research.
*/
(function(){
'use strict';
const RULE='QGWLI-BASE-LETTER-v1';
function run(fixture,metricId){
  if(!fixture||!Array.isArray(fixture.words)) throw new Error('QGWLI fixture পাওয়া যায়নি।');
  const metric=metricId||'QGWLI_COUNT_A001';
  const wordCount=fixture.words.length;
  const letterCount=fixture.words.reduce((s,w)=>s+Number(w.letter_count||0),0);
  const ok=wordCount===fixture.expected?.word_count&&letterCount===fixture.expected?.letter_count;
  return {
    metric_id:metric,
    formula:'word_count = COUNT(word_occurrence); base_letter_count = SUM(word.letter_count)',
    dataset_id:fixture.fixture_id,
    dataset_version:fixture.source?.dataset_version||'UNKNOWN',
    counting_rule_version:fixture.rules?.letter_counting_rule_version||RULE,
    calculation_method:'deterministic fixture aggregation',
    calculation_run_id:'RUN-'+Date.now(),
    result:{word_count:wordCount,base_letter_count:letterCount},
    independent_validation:{
      expected_word_count:fixture.expected?.word_count,
      expected_letter_count:fixture.expected?.letter_count,
      word_count_match:wordCount===fixture.expected?.word_count,
      letter_count_match:letterCount===fixture.expected?.letter_count
    },
    status:ok?'PASS':'BLOCKED'
  };
}
function countWordPositions(fixture){return (fixture.words||[]).map((w,i)=>({word_occurrence_id:w.word_occurrence_id,global_word_position:w.global_word_position,sequence:i+1}));}
function countLetterPositions(fixture){return (fixture.letter_occurrences||[]).map((l,i)=>({letter_occurrence_id:l.letter_occurrence_id,global_letter_position:l.global_letter_position,sequence:i+1}));}
window.AlQuranMathEngine={version:'1.0',rule:RULE,run,countWordPositions,countLetterPositions};
})();