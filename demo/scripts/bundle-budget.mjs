// AG Grid 32 is distributed as one generated module. Keep that vendor isolated
// and lazy-loaded by DataView; enforce the usual 500 kB on every other chunk.
export function bundleBudget() {
  return {
    name: 'demo-bundle-budget',
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') continue
        const limit = chunk.name === 'vendor-ag-grid' ? 1000_000 : 500_000
        const size = Buffer.byteLength(chunk.code)
        if (size > limit) {
          this.error(`${chunk.fileName}: ${size} bytes exceeds the ${limit} byte budget.`)
        }
      }
    },
  }
}
