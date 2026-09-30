/**
 * Public search URL generator for 8 major job platforms.
 * Adheres strictly to official search query parameters without web scraping.
 */

export const PLATFORMS = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    shortName: 'LinkedIn',
    color: '#0A66C2',
    bgHover: 'hover:bg-[#0A66C2]/10',
    border: 'border-[#0A66C2]/30',
    textColor: 'text-[#0A66C2]',
    tagline: 'World\'s largest professional network',
  },
  {
    id: 'indeed',
    name: 'Indeed',
    shortName: 'Indeed',
    color: '#2164F3',
    bgHover: 'hover:bg-[#2164F3]/10',
    border: 'border-[#2164F3]/30',
    textColor: 'text-[#2164F3]',
    tagline: 'Leading global job search engine',
  },
  {
    id: 'naukri',
    name: 'Naukri',
    shortName: 'Naukri',
    color: '#FF7555',
    bgHover: 'hover:bg-[#FF7555]/10',
    border: 'border-[#FF7555]/30',
    textColor: 'text-[#EA580C]',
    tagline: 'Premier tech & enterprise jobs portal in APAC/India',
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    shortName: 'Glassdoor',
    color: '#0CAA41',
    bgHover: 'hover:bg-[#0CAA41]/10',
    border: 'border-[#0CAA41]/30',
    textColor: 'text-[#0CAA41]',
    tagline: 'Jobs with company insights & salaries',
  },
  {
    id: 'wellfound',
    name: 'Wellfound',
    shortName: 'Wellfound',
    color: '#FF6154',
    bgHover: 'hover:bg-[#FF6154]/10',
    border: 'border-[#FF6154]/30',
    textColor: 'text-[#FF6154]',
    tagline: 'Startup jobs & high-growth venture teams (AngelList)',
  },
  {
    id: 'internshala',
    name: 'Internshala',
    shortName: 'Internshala',
    color: '#1295C9',
    bgHover: 'hover:bg-[#1295C9]/10',
    border: 'border-[#1295C9]/30',
    textColor: 'text-[#1295C9]',
    tagline: 'Internships and entry-level career accelerators',
  },
  {
    id: 'foundit',
    name: 'Foundit',
    shortName: 'Foundit',
    color: '#6E32C9',
    bgHover: 'hover:bg-[#6E32C9]/10',
    border: 'border-[#6E32C9]/30',
    textColor: 'text-[#6E32C9]',
    tagline: 'Modern tech talent & corporate hiring (Monster)',
  },
  {
    id: 'google',
    name: 'Google Jobs',
    shortName: 'Google',
    color: '#4285F4',
    bgHover: 'hover:bg-[#4285F4]/10',
    border: 'border-[#4285F4]/30',
    textColor: 'text-[#4285F4]',
    tagline: 'Aggregated index of millions of job listings worldwide',
  },
]

export function buildPlatformUrl(platformId, {
  role = 'Software Engineer',
  location = '',
  workplaceType = 'all', // all | remote | hybrid | onsite
  jobType = 'all',       // all | fulltime | parttime | internship | contract
  experienceLevel = 'all', // all | internship | entry | mid | senior | lead
  datePosted = 'all',    // all | 24h | week | month
}) {
  const encRole = encodeURIComponent(role.trim())
  const encLoc = encodeURIComponent(location.trim())
  const isRemote = workplaceType === 'remote' || /remote/i.test(location)

  switch (platformId) {
    case 'linkedin': {
      let url = `https://www.linkedin.com/jobs/search/?keywords=${encRole}`
      if (location) url += `&location=${encLoc}`

      // Workplace Type: 1=onsite, 2=remote, 3=hybrid
      if (workplaceType === 'remote') url += '&f_WT=2'
      else if (workplaceType === 'hybrid') url += '&f_WT=3'
      else if (workplaceType === 'onsite') url += '&f_WT=1'

      // Job Type: F=full-time, P=part-time, C=contract, I=internship
      if (jobType === 'fulltime') url += '&f_JT=F'
      else if (jobType === 'parttime') url += '&f_JT=P'
      else if (jobType === 'internship') url += '&f_JT=I'
      else if (jobType === 'contract') url += '&f_JT=C'

      // Experience Level: 1=internship, 2=entry, 3=associate, 4=mid-senior, 5=director, 6=executive
      if (experienceLevel === 'internship') url += '&f_E=1'
      else if (experienceLevel === 'entry') url += '&f_E=2'
      else if (experienceLevel === 'mid') url += '&f_E=3%2C4'
      else if (experienceLevel === 'senior' || experienceLevel === 'lead') url += '&f_E=4%2C5'

      // Date Posted
      if (datePosted === '24h') url += '&f_TPR=r86400'
      else if (datePosted === 'week') url += '&f_TPR=r604800'
      else if (datePosted === 'month') url += '&f_TPR=r2592000'

      return url
    }

    case 'indeed': {
      let q = role
      if (workplaceType === 'remote') q += ' remote'
      if (jobType === 'internship') q += ' internship'
      let url = `https://www.indeed.com/jobs?q=${encodeURIComponent(q)}`
      if (location && !isRemote) url += `&l=${encLoc}`

      // From age
      if (datePosted === '24h') url += '&fromage=1'
      else if (datePosted === 'week') url += '&fromage=7'
      else if (datePosted === 'month') url += '&fromage=30'

      return url
    }

    case 'glassdoor': {
      let q = role
      if (workplaceType === 'remote') q += ' remote'
      let url = `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(q)}`
      if (location) url += `&locT=C&locKeyword=${encLoc}`
      if (datePosted === '24h') url += '&fromAge=1'
      else if (datePosted === 'week') url += '&fromAge=7'
      else if (datePosted === 'month') url += '&fromAge=30'
      return url
    }

    case 'naukri': {
      let q = role
      if (workplaceType === 'remote') q += ' remote'
      let url = `https://www.naukri.com/search/jobs?k=${encodeURIComponent(q)}`
      if (location) url += `&l=${encLoc}`
      return url
    }

    case 'wellfound': {
      let url = `https://wellfound.com/jobs?query=${encRole}`
      if (location) url += `&location=${encLoc}`
      return url
    }

    case 'internshala': {
      const isIntern = jobType === 'internship' || experienceLevel === 'internship'
      const base = isIntern ? 'https://internshala.com/internships/' : 'https://internshala.com/jobs/'
      let url = `${base}?search=${encRole}`
      if (location) url += `&location=${encLoc}`
      return url
    }

    case 'foundit': {
      let q = role
      if (workplaceType === 'remote') q += ' remote'
      let url = `https://www.foundit.in/srp/results?query=${encodeURIComponent(q)}`
      if (location) url += `&locations=${encLoc}`
      return url
    }

    case 'google': {
      let searchTerms = [role]
      if (location) searchTerms.push(`in ${location}`)
      if (workplaceType === 'remote') searchTerms.push('remote')
      if (jobType === 'fulltime') searchTerms.push('full-time')
      else if (jobType === 'internship') searchTerms.push('internship')
      else if (jobType === 'parttime') searchTerms.push('part-time')
      if (experienceLevel === 'entry') searchTerms.push('entry level')
      else if (experienceLevel === 'senior') searchTerms.push('senior')
      searchTerms.push('jobs')

      return `https://www.google.com/search?q=${encodeURIComponent(searchTerms.join(' '))}&ibp=htl;jobs`
    }

    default:
      return `https://www.google.com/search?q=${encodeURIComponent(role + ' jobs')}`
  }
}

export function getAllPlatformUrls(params) {
  return PLATFORMS.map((platform) => ({
    ...platform,
    url: buildPlatformUrl(platform.id, params),
  }))
}
