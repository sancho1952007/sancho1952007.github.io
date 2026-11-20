export interface Project {
  name: string
  description: string
  url: string
  image: string
  /** Schema.org type used for this project in structured data. */
  schemaType?: 'SoftwareApplication' | 'WebApplication' | 'CreativeWork'
  /** Schema.org applicationCategory, only for application/software projects. */
  applicationCategory?: string
  /** Schema.org operatingSystem, only where the platform is accurate. */
  operatingSystem?: string
  /** Schema.org creativeWorkStatus, only for known statuses. */
  status?: string
  /** Schema.org genre for non-application creative works. */
  genre?: string
}

export const PROJECTS: Project[] = [
  {
    name: 's0',
    description: 'The Quick & Ultimate Subdomain Finder',
    url: 'https://github.com/sancho1952007/s0',
    image: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/sancho1952007/s0/refs/heads/main/images/preview.png&maxage=15d',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'SecurityApplication',
  },
  {
    name: 'Postily',
    description: 'The Next Gen Social Media Site (Under Development)',
    url: 'https://postily.social',
    image: 'https://i.ibb.co/tpqpK5bH/d9f8637d-567b-4c11-968a-7688dcd44d2b.png',
    schemaType: 'WebApplication',
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Any',
    status: 'Under development',
  },
  {
    name: 'Bunserv',
    description: 'An extremely fast & simple static file server built with Bun',
    url: 'https://github.com/sancho1952007/bunserv',
    image: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/sancho1952007/bunserv/refs/heads/main/images/preview.png&maxage=15d',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'DeveloperApplication',
  },
  {
    name: 'VibedIn',
    description: 'Find like-minded X users to connect with',
    url: 'https://vibedin.sg-app.com',
    image: 'https://wsrv.nl/?url=https://vibedin.sg-app.com/images/og-image.png&maxage=15d',
    schemaType: 'WebApplication',
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Any',
  },
  {
    name: 'Serverbay',
    description: 'The marketplace for servers. Discover VPS, VDS and dedicated server listings from multiple individual and official sellers.',
    url: 'https://serverbay.sg-app.com',
    image: 'https://wsrv.nl/?url=https://serverbay.sg-app.com/logo.png%3Fv=0&maxage=15d',
    schemaType: 'WebApplication',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
  },
  {
    name: 'Smart Notes',
    description: 'Free cloud notepad with live-collaborative editing and rich text support (It has been shut down now).',
    url: 'https://smart-notes.sg-app.com',
    image: 'https://i.ibb.co/307TKL1/Screenshot-2024-06-06-163943.png',
    schemaType: 'WebApplication',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Any',
    status: 'Discontinued',
  },
  {
    name: 'SG Apps',
    description: 'At SG Apps, We Aim To Build Apps For The Best!',
    url: 'https://sg-app.com',
    image: 'https://i.ibb.co/sJbXgMvX/Screenshot-2026-11-19-at-5-34-29-PM.png',
    schemaType: 'CreativeWork',
    genre: 'Website',
  },
  {
    name: 'Tiles Game',
    description: 'A simple yet fun game to play in your free time!',
    url: 'https://sg-app.com/Tiles-Game/',
    image: 'https://i.ibb.co/GW0J8P5/Screenshot-2024-06-06-164126.png',
    schemaType: 'WebApplication',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
  },
  {
    name: 'Encli',
    description: 'A free cross platform file encryption/decryption tool.',
    url: 'https://github.com/sancho1952007/Encli',
    image: 'https://i.ibb.co/rb53gx6/encli.png',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'UtilitiesApplication',
  },
  {
    name: 'Clokie',
    description: 'An amazing customizable clock to be kept on display.',
    url: 'https://sancho1952007.github.io/Clokie/',
    image: 'https://i.ibb.co/DzWMry8/Capture.png',
    schemaType: 'WebApplication',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
  },
  {
    name: 'AOS Web',
    description: 'An OS-like system made only with web technology.',
    url: 'https://sancho1952007.github.io/AOS-Web/',
    image: 'https://i.ibb.co/1G4Qwpp/AOS-Web.png',
    schemaType: 'WebApplication',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
  },
  {
    name: 'Modern GUI',
    description: 'A beautiful window replacement for Tkinter (Python) apps.',
    url: 'https://github.com/sancho1952007/Modern-GUI-v3.0',
    image: 'https://i.ibb.co/s65b76z/Preview-Image.png',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'DeveloperApplication',
  },
  {
    name: 'iPhone 11 Clone',
    description: 'An iPhone 11 Pro made using only HTML & CSS.',
    url: 'https://sancho1952007.github.io/iPhone-11-Clone/',
    image: 'https://i.ibb.co/fxRWxzq/i-Phone-Preview.png',
    schemaType: 'CreativeWork',
    genre: 'Front-end demo',
  },
]

// Lookup index built once so slug resolution is O(1) instead of a linear scan
// repeated on every open/navigation.
const PROJECTS_BY_SLUG = new Map(
  PROJECTS.map((project) => [project.name.trim().toLowerCase(), project])
)

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

/** Resolves a raw or percent-encoded project slug to its project. */
export function findProject(slug: string | null | undefined): Project | null {
  if (!slug) return null
  return PROJECTS_BY_SLUG.get(safeDecode(slug).trim().toLowerCase()) ?? null
}
