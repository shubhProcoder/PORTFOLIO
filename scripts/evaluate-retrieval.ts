import { retrieve } from '../lib/knowledge/retrieve';

const EVALUATION_SET = [
  { category: 'DIRECT', query: 'What has Shubh built?' },
  { category: 'PROJECT', query: 'What is AgentForge?' },
  { category: 'TECHNICAL', query: 'Which projects use RAG?' },
  { category: 'CONTRIBUTION', query: 'What did Shubh personally contribute?' },
  { category: 'FAILURE', query: 'What were the failure modes?' },
  { category: 'CURRENT', query: 'What is Shubh building now?' },
  { category: 'NEGATIVE', query: 'Did Shubh build a production-scale autonomous agent?' },
  { category: 'SCALE_CHECK', query: 'Did Shubh handle production workloads for 100K+ users?' },
  { category: 'UNKNOWN', query: "What is Shubh's experience with fine-tuning LLMs?" },
  { category: 'AMBIGUOUS', query: 'Tell me about AI projects.' },
  { category: 'MULTI-ENTITY', query: 'Which projects involve both RAG and evaluation?' },
  { category: 'EVIDENCE', query: 'Where does the information about AgentForge come from?' },
];


function runEvaluation() {
  console.log('==================================================');
  console.log('KNOWLEDGE RETRIEVAL EVALUATION');
  console.log('==================================================\n');

  for (const { category, query } of EVALUATION_SET) {
    console.log(`[${category}] QUERY: "${query}"`);
    try {
      const result = retrieve(query);
      console.log(`ANSWER:\n${result.answer}`);
      console.log(`EVIDENCE FOUND: ${result.evidence.length}`);
      if (result.evidence.length > 0) {
        console.log(`TOP EVIDENCE: ${result.evidence[0].entityTitle} (${result.evidence[0].evidenceState})`);
      }
    } catch (e: any) {
      console.error(`ERROR: ${e.message}`);
    }
    console.log('--------------------------------------------------\n');
  }
}

runEvaluation();
