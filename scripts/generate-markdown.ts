import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PROJECTS } from '../lib/projects'

const SITE_URL = 'https://sancho.sg-app.com'
const outputDir = fileURLToPath(
  new URL('../public/markdown/project/', import.meta.url)
)

// Wrapped so the script does not rely on top-level await, which the app's
// tsconfig target does not allow.
async function main() {
  await mkdir(outputDir, { recursive: true })

  // Remove Markdown pages for projects that no longer exist so the directory
  // stays in sync with PROJECTS and never serves stale, orphaned content.
  const expectedFiles = new Set(PROJECTS.map((project) => `${project.name}.md`))
  const existingFiles = await readdir(outputDir)
  await Promise.all(
    existingFiles
      .filter((file) => file.endsWith('.md') && !expectedFiles.has(file))
      .map((file) => unlink(join(outputDir, file)))
  )

  for (const project of PROJECTS) {
    const pageUrl = `${SITE_URL}/project/${encodeURIComponent(project.name)}`
    const lines = [
      `# ${project.name}`,
      '',
      `> ${project.description}`,
      '',
      '**Project by Sancho Godinho.**',
      '',
      `- Project page: ${pageUrl}`,
      `- Markdown version: ${pageUrl.replace('/project/', '/markdown/project/')}.md`,
      `- External link: ${project.url}`,
    ]

    if (project.status) {
      lines.push(`- Status: ${project.status}`)
    }
    if (project.applicationCategory) {
      lines.push(`- Category: ${project.applicationCategory}`)
    }
    if (project.genre) {
      lines.push(`- Type: ${project.genre}`)
    }

    lines.push(
      '',
      '## About Sancho Godinho',
      '',
      'Sancho Godinho is a software developer, cybersecurity researcher, and open-source contributor based in Mumbai, India.',
      '',
      '- Portfolio: https://sancho.sg-app.com/',
      '- GitHub: https://github.com/sancho1952007',
      '- LinkedIn: https://www.linkedin.com/in/sancho-godinho/',
      '- HackerOne: https://hackerone.com/sancho-godinho',
      ''
    )

    await writeFile(
      join(outputDir, `${project.name}.md`),
      lines.join('\n'),
      'utf8'
    )
  }

  console.log(
    `Generated ${PROJECTS.length} project Markdown files in public/markdown/project/`
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
