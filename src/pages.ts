import { addTemplate, extendPages, useNuxt } from '@nuxt/kit'
import { resolve, type ParsedPath, sep } from 'node:path'
import { type RenderHTMLElement, renderHTML } from './utils'
import { existsSync } from 'node:fs'

export function addIndexPage({
  file,
  filepath,
  path,
}: {
  file: ParsedPath
  filepath: string
  path: string
}) {
  addTemplate({
    filename: `routes/${path}`,
    getContents: () => {
      const imports: Array<{ name: string; path: string }> = [
        { name: 'Page', path: filepath },
      ]
      const html: RenderHTMLElement[] = [{ tag: 'Page' }]
      const layoutPath = resolve(filepath, '../+layout.vue')

      if (existsSync(layoutPath)) {
        imports.push({
          name: 'Layout',
          path: layoutPath,
        })

        html[0] = {
          tag: 'Layout',
          children: [html[0]],
        }
      }

      return `
            <script setup>
            ${imports
              .map(
                ({ name, path }) =>
                  `import ${name} from '${path.split(sep).join('/')}'`,
              )
              .join('\n')}
            </script>

            <template>
            ${renderHTML(html)}
            </template>
            `
    },
    write: true,
  })

  extendPages((pages) => {
    pages.push({
      path: `/${file.dir}`,
      file: resolve(useNuxt().options.srcDir, `.nuxt/routes/${path}`),
    })
  })
}

export function addPage({ filepath }: { filepath: string }) {}
