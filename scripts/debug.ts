import { buildKnowledgeIndex } from '../lib/knowledge/normalize';
const terms = ['experience', 'fine', 'tuning', 'llms'];
const index = buildKnowledgeIndex();

index.entities.forEach(e => {
  let score = 0;
  let termsMatched = 0;
  terms.forEach(t => {
    let matched = false;
    if (e.searchableText.match(new RegExp(t, 'gi'))) matched = true;
    if (e.title.toLowerCase().includes(t)) matched = true;
    if (matched) termsMatched++;
  });
  const matchRatio = termsMatched / terms.length;
  console.log(`${e.title} -> Matched: ${termsMatched}, Ratio: ${matchRatio.toFixed(2)}`);
});
