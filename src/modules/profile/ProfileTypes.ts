/**
 * A single number shown in the profile stats card.
 */
export interface ProfileStat {
  /** Unique identifier of the stat. */
  id: string;
  /** The number to show. */
  value: number;
  /** Label below the number, e.g. "countries". */
  label: string;
}

/**
 * A row in the profile settings card.
 */
export interface ProfileSetting {
  /** Unique identifier of the setting. */
  id: string;
  /** Setting name. */
  label: string;
  /** Current value shown on the right, if any. */
  value?: string;
}

/**
 * Values and handlers returned by the useProfile hook.
 */
export interface ProfileHookReturnType {
  /** The user's display name. */
  name: string;
  /** Initials for the avatar. */
  initials: string;
  /** Membership line, e.g. "Exploring since 2021". */
  memberSinceLabel: string;
  /** Stats shown in the stats card. */
  stats: ProfileStat[];
  /** Rows shown in the settings card. */
  settings: ProfileSetting[];
  /** Signs the user out. */
  onSignOut: () => void;
}
