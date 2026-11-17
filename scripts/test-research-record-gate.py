import json
from pathlib import Path

p = Path('backend/research-record-gate.js').read_text(encoding='utf-8')
required = [
    "status:'PENDING_REVIEW'",
    "save_policy:'APPROVAL_REQUIRED_NO_MASTER_OVERWRITE'",
    "supersedes:previous?.record_id||null",
    "const nextVersion=Number(previous?.version||0)+1",
    "source_file:researchProvenance.source_file",
    "evidence_refs:researchProvenance?.evidence_records||[]",
    "AI-generated output নিজে থেকে VERIFIED নয়।",
]
for item in required:
    assert item in p, f'missing contract: {item}'

proposal = {
    'status': 'PENDING_REVIEW',
    'version': 2,
    'supersedes': 'RR-Q001001-V1',
    'save_policy': 'APPROVAL_REQUIRED_NO_MASTER_OVERWRITE',
    'source_refs': [{'source_file': 'data/fatiha-master-v1.json', 'dataset_version': '2026-09-04-fatiha-master-v1', 'ayah_id': 'S001-A001'}],
}
assert proposal['status'] == 'PENDING_REVIEW'
assert proposal['version'] == 2
assert proposal['supersedes'] == 'RR-Q001001-V1'
assert proposal['source_refs'][0]['source_file'] == 'data/fatiha-master-v1.json'
print('PASS: save-gate contract and versioning invariants')


# Versioned record manifest and approval-workflow safety contract
index_path = Path('data/research-records/index.json')
index = json.loads(index_path.read_text(encoding='utf-8'))
assert index.get('schema_version') == 1
assert isinstance(index.get('records'), list)
assert any(x.get('file') == 'RR-Q001001-V1.json' and x.get('record_id') == 'RR-Q001001' and x.get('version') == 1 for x in index['records'])
workflow = Path('.github/workflows/research-record-approval.yml').read_text(encoding='utf-8')
for item in [
    "index_path=root/'index.json'",
    "index['records'].append(entry)",
    "concurrency:",
    "approval_basis",
    "canonical scope.ayah_id required",
    "source record_id does not exist",
]:
    assert item in workflow, f'missing approval/index invariant: {item}'
print('PASS: research memory index and approval workflow invariants')
