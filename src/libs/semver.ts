import { major, minor, parse, patch, SemVer, valid } from "semver";

export function getSemVerFromRelease(release: any): SemVer | null {
  return parse(valid(release.data.versionNum));
}

export function isAtLeastMinorRelease(version: SemVer | string | null): boolean {
  if (version === null) {
    return false;
  }

  if (patch(version) === 0) {
    return true;
  }

  return false;
}

export function getVersionWithoutPatch(version: SemVer | string | null): string | null {
  if (version === null) {
    return null;
  }

  return major(version) + "." + minor(version);
}
