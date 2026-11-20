import { PROJECTS, type Project } from './projects'

export const SITE_URL = 'https://sancho.sg-app.com'
export const SITE_NAME = 'Sancho Godinho'
export const SITE_TITLE = 'Sancho Godinho | Software Developer & Cybersecurity Researcher'
export const SITE_DESCRIPTION =
  'Sancho Godinho is a software developer, cybersecurity researcher, and open-source contributor in Mumbai. Explore projects, open-source work, and security research.'
/** Stable content date so sitemap/JSON-LD freshness does not churn per build. */
export const SITE_LAST_MODIFIED = '2026-11-20'

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const PROFILE_PAGE_ID = `${SITE_URL}/#profilepage`
export const PROJECTS_ID = `${SITE_URL}/#projects`
export const PORTRAIT_ID = `${SITE_URL}/#portrait`
export const DODO_PAYMENTS_ID = `${SITE_URL}/#dodo-payments`

/** Absolute URL builder that leaves already-absolute URLs untouched. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Canonical, percent-encoded path for a project page. */
export function projectPath(project: Pick<Project, 'name'>): string {
  return `/project/${encodeURIComponent(project.name)}`
}

export function projectUrl(project: Pick<Project, 'name'>): string {
  return `${SITE_URL}${projectPath(project)}`
}

export function projectMarkdownPath(project: Pick<Project, 'name'>): string {
  return `/markdown${projectPath(project)}.md`
}

/**
 * Builds a concise, unique meta description from the project's existing
 * one-line description. No capabilities are added beyond what the site says.
 */
export function projectMetaDescription(project: Project): string {
  const base = `${project.name}: ${project.description.trim()}`
  if (base.length >= 135) return base
  return `${base}${base.endsWith('.') ? '' : '.'} Project by Sancho Godinho.`
}

/** Escape "<" so JSON-LD strings can never terminate the script element. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

const KNOWS_ABOUT = [
  'Bun',
  'Node.js',
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'Expo',
  'HTML',
  'CSS',
  'Python',
  'Bash',
  'MongoDB',
  'Docker',
  'Socket.io',
  'Tailscale',
  'Linux',
  'server management',
  'infrastructure optimization',
  'server security',
  'UFW',
  'REST APIs',
  'WebSockets',
  'Git',
  'DevOps',
  'web security',
  'vulnerability research',
  'responsible disclosure',
]

const PERSON = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Sancho Godinho',
  givenName: 'Sancho',
  familyName: 'Godinho',
  // schema.org expects Text here; the GitHub handle is exposed via sameAs.
  alternateName: 'Sancho',
  url: SITE_URL,
  image: {
    '@type': 'ImageObject',
    '@id': PORTRAIT_ID,
    url: `${SITE_URL}/pfp-400px.png`,
    width: 400,
    height: 393,
    caption: 'Portrait of Sancho Godinho',
  },
  description:
    'Sancho Godinho is a software developer, cybersecurity researcher, DevOps and infrastructure enthusiast, and open-source contributor based in Mumbai, India.',
  jobTitle: 'Software Developer & Cybersecurity Researcher',
  email: 'sancho@sg-app.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Software Developer & Cybersecurity Researcher',
      description:
        'Software development, open-source contributions, DevOps and infrastructure work, and responsible security research.',
    },
    {
      '@type': 'Occupation',
      name: 'Community Manager & Open Source Software Developer',
      description:
        'Remote role at Dodo Payments from October 2025 to October 2026. Managed the Dodo Payments Discord community and was a core maintainer of the Dodo Payments CLI, Discord bot, migration tool, and sync engine.',
      occupationalCategory: 'Community management and open-source software development',
    },
  ],
  knowsAbout: KNOWS_ABOUT,
  knowsLanguage: [
    {
      '@type': 'Language',
      name: 'English',
      alternateName: 'en',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'professional inquiries',
    email: 'sancho@sg-app.com',
    url: `${SITE_URL}/#contact`,
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://github.com/sancho1952007',
    'https://www.linkedin.com/in/sancho-godinho/',
    'https://hackerone.com/sancho-godinho',
    'https://x.com/iamsgxd',
    'https://www.sololearn.com/profile/19684449',
  ],
  mainEntityOfPage: SITE_URL,
}

const WEBSITE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: 'Sancho Godinho Portfolio',
  description: SITE_DESCRIPTION,
  publisher: { '@id': PERSON_ID },
  author: { '@id': PERSON_ID },
  inLanguage: 'en',
  copyrightYear: 2026,
  copyrightHolder: { '@id': PERSON_ID },
  dateModified: SITE_LAST_MODIFIED,
  // No SearchAction: the site does not expose a site-wide search endpoint.
}

const DODO_PAYMENTS = {
  '@type': 'Organization',
  '@id': DODO_PAYMENTS_ID,
  name: 'Dodo Payments',
  url: 'https://dodopayments.com',
  sameAs: ['https://github.com/dodopayments'],
  description:
    'Employer of Sancho Godinho from October 2025 to October 2026. Sancho worked remotely as a Community Manager and Open Source Software Developer.',
}

const PROFILE_PAGE = {
  '@type': 'ProfilePage',
  '@id': PROFILE_PAGE_ID,
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: { '@id': PERSON_ID },
  about: { '@id': PERSON_ID },
  primaryImageOfPage: { '@id': PORTRAIT_ID },
  inLanguage: 'en',
  dateModified: SITE_LAST_MODIFIED,
}

/**
 * Site-wide identity graph. Rendered once from the root layout so every page
 * shares the same stable @id values for the person, website, and employer.
 */
export const SITE_STRUCTURED_DATA = toJsonLd({
  '@context': 'https://schema.org',
  '@graph': [PERSON, WEBSITE, DODO_PAYMENTS],
})

function buildProjectNode(project: Project): Record<string, unknown> {
  const url = projectUrl(project)
  const node: Record<string, unknown> = {
    '@type': project.schemaType ?? 'CreativeWork',
    '@id': `${url}#project`,
    name: project.name,
    description: project.description,
    url,
    sameAs: project.url,
    creator: { '@id': PERSON_ID },
    image: {
      '@type': 'ImageObject',
      url: project.image,
      caption: `${project.name} preview`,
    },
    isPartOf: { '@id': WEBSITE_ID },
    // Plain URL keeps this valid in the homepage ItemList graph, where the
    // project WebPage node is not present.
    mainEntityOfPage: url,
  }

  if (project.applicationCategory) {
    node.applicationCategory = project.applicationCategory
  }
  if (project.operatingSystem) {
    node.operatingSystem = project.operatingSystem
  }
  if (project.status) {
    node.creativeWorkStatus = project.status
  }
  if (project.genre) {
    node.genre = project.genre
  }

  return node
}

const PROJECT_ITEM_LIST = {
  '@type': 'ItemList',
  '@id': PROJECTS_ID,
  name: 'Projects by Sancho Godinho',
  numberOfItems: PROJECTS.length,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  itemListElement: PROJECTS.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: buildProjectNode(project),
  })),
}

/** Homepage-only graph: profile page plus the project ItemList. */
export const HOME_STRUCTURED_DATA = toJsonLd({
  '@context': 'https://schema.org',
  '@graph': [PROFILE_PAGE, PROJECT_ITEM_LIST],
})

/** Project-page-only graph: WebPage, project entity, and breadcrumbs. */
export function projectStructuredData(project: Project): string {
  const url = projectUrl(project)

  return toJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${project.name} | Sancho Godinho`,
        description: projectMetaDescription(project),
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
        about: { '@id': `${url}#project` },
        mainEntity: { '@id': `${url}#project` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: project.image,
          caption: `${project.name} preview`,
        },
        inLanguage: 'en',
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      buildProjectNode(project),
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${SITE_URL}/#projects`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.name,
            item: url,
          },
        ],
      },
    ],
  })
}
