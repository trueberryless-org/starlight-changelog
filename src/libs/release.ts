import { type CollectionEntry, getCollection } from "astro:content";

import {
  getMinorReleaseVersion,
  getPackagePath,
  getPackageReleasePath,
  isStarlightPackage,
  packageNameToSlug,
} from "./package";

const RELEASE_IMAGE_HEIGHT = 640;
const RELEASE_IMAGE_WIDTH = 1650;

export const RELEASES_PER_PAGE = 20;

export async function getReleases() {
  const releases = await getCollection("releases");

  return releases.toSorted(
    (a, b) => getReleaseDate(b).getTime() - getReleaseDate(a).getTime()
  );
}

export async function getPackageReleases(packageName: string) {
  const releases = await getReleases();

  return releases.filter((release) => release.data.packageName === packageName);
}

export async function getPackages() {
  const releases = await getReleases();
  const packages = new Map<string, Package>();

  for (const release of releases) {
    const { packageName } = release.data;
    const releasePackage = packages.get(packageName);

    if (releasePackage) {
      releasePackage.releases.push(release);
    } else {
      packages.set(packageName, {
        latestRelease: release,
        name: packageName,
        path: getPackagePath(packageName),
        releases: [release],
        slug: packageNameToSlug(packageName),
      });
    }
  }

  return [...packages.values()];
}

export function getReleaseDate(release: Release) {
  return release.data.publishedAt ?? release.data.createdAt;
}

export function getReleaseDescription(release: Release) {
  return `Release notes for ${release.id}.`;
}

export function getReleaseImage(release: Release) {
  if (!isStarlightPackage(release.data.packageName)) return;

  const minorVersion = getMinorReleaseVersion(release.data.version);
  if (!minorVersion) return;

  const url = new URL(
    "https://release-image-generator.netlify.app/api/generateImage"
  );
  url.searchParams.set("width", String(RELEASE_IMAGE_WIDTH));
  url.searchParams.set("height", String(RELEASE_IMAGE_HEIGHT));
  url.searchParams.set("text", minorVersion);

  return {
    alt: `Starlight ${minorVersion}`,
    height: RELEASE_IMAGE_HEIGHT,
    src: url.href,
    width: RELEASE_IMAGE_WIDTH,
  };
}

export function getReleasePath(release: Release) {
  return getPackageReleasePath(release.data.packageName, release.data.version);
}

export type Release = CollectionEntry<"releases">;

export interface Package {
  latestRelease: Release;
  name: string;
  path: string;
  releases: Release[];
  slug: string;
}
