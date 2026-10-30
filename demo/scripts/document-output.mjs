import { isAbsolute, relative, resolve } from 'node:path'

export function documentOutputPath(directory, name) {
  if (typeof name !== 'string' || !name || /[/\\]/u.test(name) || name.includes(String.fromCharCode(0))) {
    throw new Error('Nombre de export no permitido: ' + JSON.stringify(name))
  }
  const target = resolve(directory, name + '.json')
  const within = relative(directory, target)
  if (!within || within === '..' || within.startsWith('../') || within.startsWith('..\\') || isAbsolute(within)) {
    throw new Error('La ficha debe permanecer dentro del directorio generado')
  }
  return target
}
