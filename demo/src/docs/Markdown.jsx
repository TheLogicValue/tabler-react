import React, { useState } from 'react'

export function CodeBlock({ code, language = 'jsx' }) {
  const [message, setMessage] = useState('')
  return <div className="docs-code">
    <div className="docs-code-toolbar"><span>{language}</span><button type="button" onClick={async () => {
      try { await navigator.clipboard.writeText(code); setMessage('Código copiado.') }
      catch { setMessage('No se pudo copiar. Selecciona el código y cópialo manualmente.') }
    }}>Copiar código</button></div>
    <pre><code>{code}</code></pre><span className="docs-copy-status" role="status">{message}</span>
  </div>
}

function inline(text) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith('`')
    ? <code key={index}>{part.slice(1, -1)}</code>
    : part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part)
}

// Deliberately display a small, safe Markdown subset. Legacy HTML and JSX stay
// text; documentation examples are never evaluated or injected into the DOM.
export default function Markdown({ text }) {
  const blocks = [], lines = text.replaceAll('\r\n', '\n').split('\n')
  let index = 0
  while (index < lines.length) {
    const line = lines[index++]
    if (!line.trim()) continue
    if (line.startsWith('```')) {
      const language = line.slice(3).trim() || 'text', code = []
      while (index < lines.length && !lines[index].startsWith('```')) code.push(lines[index++])
      index++
      blocks.push(<CodeBlock key={blocks.length} code={code.join('\n')} language={language} />)
    } else if (/^#{1,6} /.test(line)) {
      const Heading = 'h' + Math.min(6, line.match(/^#+/)[0].length + 1)
      blocks.push(<Heading key={blocks.length}>{inline(line.replace(/^#+\s*/, ''))}</Heading>)
    } else if (/^\s*[-*] /.test(line)) {
      const items = [line.replace(/^\s*[-*] /, '')]
      while (index < lines.length && /^\s*[-*] /.test(lines[index])) items.push(lines[index++].replace(/^\s*[-*] /, ''))
      blocks.push(<ul key={blocks.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>)
    } else {
      const paragraph = [line]
      while (index < lines.length && lines[index].trim() && !/^(#|```|\s*[-*] )/.test(lines[index])) paragraph.push(lines[index++])
      blocks.push(<p key={blocks.length}>{inline(paragraph.join(' '))}</p>)
    }
  }
  return <div className="docs-markdown">{blocks}</div>
}
