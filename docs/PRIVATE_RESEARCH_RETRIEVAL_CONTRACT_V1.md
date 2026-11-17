# Private Research Retrieval Contract v1

## Purpose
Retrieve only the relevant, integrity-checked ayah chunk from an installed private source. The endpoint must never return an entire book object.

## Source registry fields
- `source_id`: stable identifier.
- `installed`: false until rights, edition, provenance, manifest checksum and R2 installation are verified.
- `permission_status`: must be `VERIFIED` before retrieval.
- `storage_key`: R2 key of the source manifest, not a full-book object.
- `manifest_sha256`: expected SHA-256 of the exact manifest bytes.

## R2 layout
```
private-sources/{source_id}/manifest.json
private-sources/{source_id}/{edition_id}/{chunk_id}.json
```

All chunk keys must remain under `private-sources/{source_id}/`; traversal, absolute paths, backslashes and empty path segments are rejected.

## Manifest schema
```json
{
  "schema_version": 1,
  "source_id": "SRC-IFB-001",
  "edition_id": "publisher-edition-id",
  "rights_status": "VERIFIED",
  "chunks": [
    {
      "chunk_id": "CHUNK-001",
      "ayah_id": "S001-A001",
      "storage_key": "private-sources/SRC-IFB-001/edition-id/CHUNK-001.json",
      "content_sha256": "64-lowercase-hex-characters"
    }
  ]
}
```

## Chunk schema
```json
{
  "schema_version": 1,
  "source_id": "SRC-IFB-001",
  "edition_id": "publisher-edition-id",
  "chunk_id": "CHUNK-001",
  "ayah_id": "S001-A001",
  "content": "Only the source passage for this ayah",
  "content_sha256": "64-lowercase-hex-characters",
  "page_ref": "optional publisher page reference"
}
```

The chunk checksum is SHA-256 over the UTF-8 bytes of `content`; it must match both the manifest entry and chunk object. The manifest checksum is SHA-256 over its exact stored UTF-8 bytes and must match the source registry.

## API contract
`GET /private-research/sources/{source_id}/content?ayah_id=S###-A###`

- Requires a valid 15-minute Bearer session for the same source.
- Requires source installation and configured manifest checksum.
- Requires a canonical ayah scope.
- Requires manifest `rights_status=VERIFIED`.
- Returns only matching chunk records with source/edition/ayah provenance.
- Rejects missing scope, unknown source, missing objects, integrity mismatch, unsafe R2 keys and unverified rights.
- Does not support whole-book retrieval.

## Limits
- Manifest: maximum 2,000,000 bytes and 50,000 chunk entries.
- Chunk object: maximum 64,000 bytes.
- Chunk content: maximum 16,000 characters.
- Maximum matching chunks: 3.

## External AI privacy
This retrieval endpoint does not itself call Gemini or another provider. The UI-to-Chat flow must require an explicit per-question consent control before any retrieved private text is sent to an external AI. Until that path exists and is tested, private text must not be added to chat prompts.

## Current source status
SRC-IFB-001 remains `installed=false / PENDING_VERIFICATION`. No real source text is present in the repository or R2 fixture. Automated tests use synthetic text only.
