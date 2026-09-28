const ASTROJS_SCOPE = "@astrojs/";
const PACKAGE_SCOPE_SEPARATOR_RE = /(?<=\/)/;
const MINOR_RELEASE_VERSION_RE = /^(\d+\.\d+)\.0$/;
const RELEASE_TAG_RE = /^((?:@[\w-]+\/)?[\w.-]+)@(\d+\.\d+\.\d+(?:-[\w.]+)?)$/;

export const STARLIGHT_PACKAGE_NAME = "@astrojs/starlight";

export function parseReleaseTag(tagName: string) {
  const [, packageName, version] = RELEASE_TAG_RE.exec(tagName) ?? [];
  if (!packageName || !version) return;

  return { packageName, version };
}

export function isStarlightPackage(packageName: string) {
  return packageName === STARLIGHT_PACKAGE_NAME;
}

export function getMinorReleaseVersion(version: string) {
  return MINOR_RELEASE_VERSION_RE.exec(version)?.[1];
}

export function splitPackageScope(packageName: string) {
  return packageName.split(PACKAGE_SCOPE_SEPARATOR_RE);
}

export function packageNameToSlug(packageName: string) {
  return packageName.startsWith(ASTROJS_SCOPE)
    ? packageName.slice(ASTROJS_SCOPE.length)
    : packageName;
}

export function getPackagePath(packageName: string) {
  return isStarlightPackage(packageName)
    ? "/"
    : `/packages/${packageNameToSlug(packageName)}/`;
}

export function getPackageReleasePath(packageName: string, version: string) {
  return isStarlightPackage(packageName)
    ? `/releases/${version}/`
    : `/packages/${packageNameToSlug(packageName)}/releases/${version}/`;
}
