import { existsSync, lstatSync, readFileSync } from 'node:fs'
import { join, normalize, parse, resolve, sep } from 'node:path'
import {
  defineNuxtModule,
  extendPages,
  addTemplate,
  addTypeTemplate,
  updateTemplates,
} from '@nuxt/kit'
import { watch } from 'chokidar'
import {
  type RenderHTMLElement,
  removeRoutesFromPath,
  renderHTML,
} from './utils'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { addIndexPage } from './pages'

// Module options TypeScript interface definition
export interface ModuleOptions {}

const SCRIPT_TAGS = ['<script>', '<script lang="ts">']

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'n2t',
    configKey: 'n2t',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    const routesPath: string = normalize(join(_nuxt.options.srcDir, '/routes'))
    const pagePaths: Record<string, string> = {}

    if (!lstatSync(routesPath).isDirectory()) {
      throw new Error('Routes directory does not exist')
    }

    _nuxt.options.alias['#routes'] = routesPath

    const watcher = watch(routesPath)

    watcher.on('add', (filepath) => {
      const path = removeRoutesFromPath(filepath)
      const file = parse(path)

      if (lstatSync(filepath).isDirectory()) return
      let route = ''

      if (file.ext === '.vue') {
      }

      if (file.ext === '.vue' && file.name === '+page') {
        pagePaths[file.dir] = filepath

        addIndexPage({ file, filepath, path })

        return
      }

      if (file.ext === '.vue' && file.name !== '+layout') {
      }
    })

    watcher.on('change', (path, stats) => {})
  },
})
