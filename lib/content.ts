import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface ProfileStat {
  value: string;
  label: string;
  /** Qualifier shown beside the value — e.g. "projected", so the claim carries its own caveat. */
  note?: string;
  /** Case study this number came from; makes the stat clickable and gives it a source. */
  slug?: string;
  /** The question the project answers — headlines the hero's project card. */
  question?: string;
}

export interface Profile {
  name: string;
  shortName: string;
  heroKicker: string;
  tagline: string;
  typewriter: string[];
  about: string[];
  stats: ProfileStat[];
  location: string;
  email: string;
  linkedin: string;
  github: string;
  cv: string;
  portrait: string;
  logo: string;
  languages: { name: string; level: string }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  caseStudy: string;
}

export interface EducationItem {
  degree: string;
  /** Compact form of `degree` for tight spots like the hero strip. */
  short?: string;
  school: string;
  location: string;
  period: string;
  details: string[];
  image: string;
  /** "white" puts the logo on a white plate — for marks that need a light background. */
  imageBg?: 'white';
  /** `false` keeps the entry out of the hero strip; it still shows in the Education section. */
  hero?: boolean;
}

export interface SkillsData {
  iconGroupLabel: string;
  icons: { name: string; icon: string }[];
  /** The hero dashboard's proficiency bars — label + 0–100 fill. */
  heroSkills: { label: string; level: number }[];
  chipGroupLabel: string;
  chips: string[];
}

export interface ExtraItem {
  title: string;
  org: string;
  description: string;
  category: 'tech' | 'non-tech';
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  kind: string;
  org: string;
  role: string;
  period: string;
  location: string;
  cover: string;
  featured: boolean;
  order: number;
  tags: string[];
  context: string;
  problem: string;
  solution: string[];
  impact: { value: string; label: string }[];
  gallery: { src: string; caption?: string }[];
  links: { label: string; url: string }[];
  body: string;
}

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')) as T;
}

export const getProfile = () => readJson<Profile>('profile.json');
export const getExperience = () => readJson<{ items: ExperienceItem[] }>('experience.json').items;
export const getEducation = () => readJson<{ items: EducationItem[] }>('education.json').items;
export const getSkills = () => readJson<SkillsData>('skills.json');
export const getExtras = () => readJson<{ items: ExtraItem[] }>('extras.json').items;

export function getProjects(): Project[] {
  const dir = path.join(CONTENT_DIR, 'projects');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return {
        slug: f.replace(/\.md$/, ''),
        body: content.trim(),
        tags: [],
        solution: [],
        impact: [],
        gallery: [],
        links: [],
        featured: false,
        order: 99,
        ...data,
      } as unknown as Project;
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
