export interface AdditionalLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface AdditionalItem {
  title: string;
  value?: string;
  links?: AdditionalLink[];
}

export const ABOUT_ADDITIONALS: AdditionalItem[] = [
  {
    title: "NAME",
    value: "ANDIKA TRI PRASETYA",
  },
  {
    title: "ROLE",
    value: "FULLSTACK DEVELOPER",
  },
  {
    title: "CONTACT",
    links: [
      {
        label: "TRIPRASETYA_ANDIKA@YAHOO.COM",
        href: "mailto:triprasetya_andika@yahoo.com",
      },
      {
        label: "LINKEDIN",
        href: "https://www.linkedin.com/in/andikatp/",
        isExternal: true,
      },
    ],
  },
];
