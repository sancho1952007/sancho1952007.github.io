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
  /** Technologies used by the project, as stated by the project author. */
  techStack?: string[]
}

export const PROJECTS: Project[] = [
  {
    name: 's0',
    description: 'Fast CLI subdomain finder built with Bun.',
    url: 'https://github.com/sancho1952007/s0',
    image: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/sancho1952007/s0/refs/heads/main/images/preview.png&maxage=15d',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'SecurityApplication',
    techStack: ['Bun', 'MongoDB', 'Redis', 'Expo'],
  },
  {
    name: 'Postily',
    description: 'Creator-focused next-generation social media platform (under development).',
    url: 'https://postily.social',
    image: 'https://i.ibb.co/tpqpK5bH/d9f8637d-567b-4c11-968a-7688dcd44d2b.png',
    schemaType: 'WebApplication',
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Any',
    status: 'Under development',
    techStack: ['Bun', 'MongoDB', 'Redis', 'Expo', 'Elysia'],
  },
  {
    name: 'Bunserv',
    description: 'High-performance, minimalist static file server CLI built with Bun.',
    url: 'https://github.com/sancho1952007/bunserv',
    image: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/sancho1952007/bunserv/refs/heads/main/images/preview.png&maxage=15d',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'DeveloperApplication',
    techStack: ['Bun', 'CLI'],
  },
  {
    name: 'VibedIn',
    description: 'Connect with like-minded users on X based on shared interests.',
    url: 'https://vibedin.sg-app.com',
    image: 'https://wsrv.nl/?url=https://vibedin.sg-app.com/images/og-image.png&maxage=15d',
    schemaType: 'WebApplication',
    applicationCategory: 'SocialNetworkingApplication',
    operatingSystem: 'Any',
    techStack: ['Bun', 'MongoDB', 'Webhooks', 'X API'],
  },
  {
    name: 'Serverbay',
    description: 'Marketplace for VPS, VDS, and dedicated servers across individual and commercial sellers.',
    url: 'https://serverbay.sg-app.com',
    image: 'https://wsrv.nl/?url=https://serverbay.sg-app.com/logo.png%3Fv=0&maxage=15d',
    schemaType: 'WebApplication',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    techStack: ['Bun', 'MongoDB', 'Next.js'],
  },
  {
    name: 'Smart Notes',
    description: 'Real-time collaborative cloud notepad with rich text support (shut down).',
    url: 'https://smart-notes.sg-app.com',
    image: 'https://i.ibb.co/307TKL1/Screenshot-2024-06-06-163943.png',
    schemaType: 'WebApplication',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Any',
    status: 'Discontinued',
    techStack: ['Node.js', 'MongoDB', 'WebSockets'],
  },
  {
    name: 'SG Apps',
    description: 'Portfolio and hub for my custom-built applications.',
    url: 'https://sg-app.com',
    image: 'https://i.ibb.co/sJbXgMvX/Screenshot-2026-11-19-at-5-34-29-PM.png',
    schemaType: 'CreativeWork',
    genre: 'Website'
  },
  {
    name: 'Tiles Game',
    description: 'Lightweight, casual browser game.',
    url: 'https://sg-app.com/Tiles-Game/',
    image: 'https://i.ibb.co/GW0J8P5/Screenshot-2024-06-06-164126.png',
    schemaType: 'WebApplication',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    techStack: ['HTML', 'CSS', 'JS'],
  },
  {
    name: 'Encli',
    description: 'Cross-platform CLI file encryption and decryption utility.',
    url: 'https://github.com/sancho1952007/Encli',
    image: 'https://i.ibb.co/rb53gx6/encli.png',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'UtilitiesApplication',
    techStack: ['Node.js', 'CLI'],
  },
  {
    name: 'Clokie',
    description: 'An amazing customizable clock to be kept on display.',
    url: 'https://sancho1952007.github.io/Clokie/',
    image: 'https://i.ibb.co/DzWMry8/Capture.png',
    schemaType: 'WebApplication',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    techStack: ['HTML', 'CSS', 'JS'],
  },
  {
    name: 'AOS Web',
    description: 'An OS-like system made only with web technology.',
    url: 'https://sancho1952007.github.io/AOS-Web/',
    image: 'https://i.ibb.co/1G4Qwpp/AOS-Web.png',
    schemaType: 'WebApplication',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    techStack: ['HTML', 'CSS', 'JS'],
  },
  {
    name: 'Modern GUI',
    description: 'A beautiful window replacement for Tkinter (Python) apps.',
    url: 'https://github.com/sancho1952007/Modern-GUI-v3.0',
    image: 'https://i.ibb.co/s65b76z/Preview-Image.png',
    schemaType: 'SoftwareApplication',
    applicationCategory: 'DeveloperApplication',
    techStack: ['Python', 'Tkinter'],
  },
  {
    name: 'iPhone 11 Clone',
    description: 'An iPhone 11 Pro made using only HTML & CSS.',
    url: 'https://sancho1952007.github.io/iPhone-11-Clone/',
    image: 'https://i.ibb.co/fxRWxzq/i-Phone-Preview.png',
    schemaType: 'CreativeWork',
    genre: 'Front-end demo',
    techStack: ['HTML', 'CSS'],
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
