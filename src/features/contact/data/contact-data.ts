export interface ContactLink {
  id: number;
  label: string;
  link: string;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 1,
    label: "Email",
    link: "mailto:triprasetya_andika@yahoo.com",
  },
  {
    id: 2,
    label: "Linkedin",
    link: "https://www.linkedin.com/in/andikatp/",
  },
  {
    id: 3,
    label: "Github",
    link: "https://github.com/andikatp",
  },
];
