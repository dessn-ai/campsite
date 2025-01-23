import path from 'path'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

const tempDir = path.resolve(process.cwd())

const nextJsStubsPlugin = () => ({
  name: 'nextjs-stubs',
  resolveId(id) {
    // Handle next/image and next/link imports
    if (id === 'next/image') {
      return path.resolve(tempDir, 'next/image.tsx')
    }
    if (id === 'next/link') {
      return path.resolve(tempDir, 'next/link.tsx')
    }
  },
  async transform(code) {
    return code // We don't need to transform anymore since we're using alias
  }
})

export default {
  port: 5173,
  root: tempDir,
  plugins: [react({}), EnvironmentPlugin({}), nextJsStubsPlugin()],
  server: {
    hmr: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      'next/image': path.resolve(tempDir, 'next/image.tsx'),
      'next/link': path.resolve(tempDir, 'next/link.tsx'),
      'next/router': path.resolve(tempDir, 'next/router.tsx')
    }
  },
  define: { process: { env: {} } },
  publicDir: path.resolve(process.cwd(), 'screenshots') // Make screenshots folder public
}
