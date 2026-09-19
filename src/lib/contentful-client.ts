import { createClient } from "contentful";

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

export const isContentfulConfigured = Boolean(spaceId && accessToken);

export const contentfulClient = isContentfulConfigured
  ? createClient({
      space: spaceId!,
      accessToken: accessToken!,
    })
  : null;
