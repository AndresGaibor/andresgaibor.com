export const social = {
  email: 'email-removed-for-spam-protection',
  github: 'https://github.com/AndresGaibor',
} as const;

export const socialLinks = [
  { label: 'GitHub', href: social.github },
  { label: 'Email', href: `mailto:${social.email}` },
] as const;
