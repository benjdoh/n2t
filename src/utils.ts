import { normalize } from 'node:path'
import { useNuxt } from '@nuxt/kit'

export function removeRoutesFromPath(path: string) {
  const routesPath = normalize(useNuxt().options.srcDir + '/routes')

  return normalize(path).replace(routesPath, '')
}

export type RenderHTMLElement = {
  tag: string
  children?: RenderHTMLElement[]
}

export function renderHTML(elements: RenderHTMLElement[]) {
  return elements
    .map((element) => {
      return `<${element.tag}>
      ${element.children ? renderHTML(element.children) : ''}
      </${element.tag}>`
    })
    .join('')
}
