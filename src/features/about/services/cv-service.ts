import {
  contentfulClient,
  isContentfulConfigured,
} from "../../../lib/contentful-client";

export const DEFAULT_CV_URL = "/Andika_Tri_Prasetya_CV.pdf";

function extractAssetUrl(assetField: any): string | null {
  if (!assetField) return null;
  // Direct string URL
  if (typeof assetField === "string") {
    return assetField.startsWith("//") ? `https:${assetField}` : assetField;
  }
  // Contentful Asset object
  if (assetField.fields?.file?.url) {
    const url = assetField.fields.file.url;
    return url.startsWith("//") ? `https:${url}` : url;
  }
  if (assetField.file?.url) {
    const url = assetField.file.url;
    return url.startsWith("//") ? `https:${url}` : url;
  }
  return null;
}

export async function fetchCvUrlFromContentful(): Promise<string> {
  if (!isContentfulConfigured || !contentfulClient) {
    return DEFAULT_CV_URL;
  }

  try {
    const response = await contentfulClient.getEntries({
      content_type: "cv",
      limit: 1,
    });

    if (!response.items || response.items.length === 0) {
      return DEFAULT_CV_URL;
    }

    const entry = response.items[0];
    const fields: Record<string, any> = entry.fields || {};

    const assetCandidate =
      fields.file ||
      fields.cv ||
      fields.pdf ||
      fields.asset ||
      fields.resume ||
      fields.attachment ||
      fields.document;

    return extractAssetUrl(assetCandidate) || DEFAULT_CV_URL;
  } catch (error) {
    console.warn("Contentful CV fetch failed, using local CV fallback:", error);
    return DEFAULT_CV_URL;
  }
}
