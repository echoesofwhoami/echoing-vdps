import type { Heading } from '@types'
import { listShikiThemes } from '../styles/shiki-themes'

const sampleBash = `curl -s "https://<host>/notes" \\
  -H "Accept: application/json"`

const samplePython = `def greet(name: str) -> str:
    """Return a short greeting."""
    return f"Hello, {name}"

print(greet("<name>"))`

const previewHeadings: Heading[] = [
  { depth: 2, slug: 'preview-notes', text: 'Notes' },
  { depth: 3, slug: 'preview-request', text: 'A request' },
  { depth: 3, slug: 'preview-script', text: 'A script' },
]

export function themeTweakerPreview() {
  return {
    shikiThemes: listShikiThemes(),
    sampleBash,
    samplePython,
    previewHeadings,
  }
}
