# iPhone Duo Support in React Native / Expo

**Session length:** 60 minutes
**Audience:** React Native / Expo developers
**Demo app:** `rn-duo` (Expo SDK 57, React Native 0.86, React Navigation 7)
**Status of information:** as of 16 Oct 2026. iPhone Duo goes on sale 23 Oct 2026. Apple has **not yet published** its written iPhone Duo developer guide, so parts of this deck are based on Apple Tech Talks, the HIG, and community analysis. Items that are unverified are marked ⚠️.

---

## Agenda (60 min)

| # | Topic | Time |
|---|-------|------|
| 0 | What is iPhone Duo (context) | 5 min |
| 1 | Prerequisites: Xcode, macOS, iOS, RN/Expo | 7 min |
| 2 | Showcase: our app **without** Duo support | 10 min |
| 3 | Impacted areas and what to do about each | 12 min |
| 4 | Orientation lock impact | 6 min |
| 5 | How SafeAreaView / safe-area insets behave | 7 min |
| 6 | Fixing the `Dimensions.get('window')` problem | 8 min |
| 7 | Testing strategy, checklist, Q&A | 5 min |

---

## 0. What is iPhone Duo?

A foldable iPhone with **two displays**, so one app can run at several very different window sizes during a single session.

| Display | Size (points) | Notes |
|---|---|---|
| Outer (closed) | 466 × 678 pt | Front camera region; system bars move **to the side** |
| Inner (open), portrait | 626 × 890 pt | Aspect ratio ≈ 1.42 (close to square); horizontal bars |
| Inner (open), landscape | 890 × 626 pt | Bars move **to the side** |
| Split View | Any width between these | Every app takes part; there is **no opt-out** |

> ⚠️ These sizes come from iphoneduosupport.com. Another source (Ingenious Techlab) says Apple has not published official values. Treat them as close but not final.

**Things that are new for an iPhone:**
- **Fold (`division`) region:** a hinge area down the middle while the device is half-open. Its width is 0 when the device is flat.
- **Occlusion region:** the inner FaceTime camera, active only while the camera is on.
- **Side system bars:** status bar and home indicator can sit on the left or right edge, not only top and bottom.
- **Continuous resizing:** fold, unfold, rotate, and drag the Split View divider all change the window size **while the app is running**.

**Key message:** stop thinking "phone = fixed portrait screen". On iPhone Duo the window size is a value that changes at runtime.

---

## 1. Prerequisites for Duo support

### Toolchain

| Item | Requirement | Our machine |
|---|---|---|
| **Xcode** | **Xcode 27.1** (iOS 27.1 SDK). Xcode 27.0 builds with the iOS 27 SDK; the fold APIs and full-screen Duo layout need 27.1 | Xcode 27.1 (27A9275) |
| **macOS** | Xcode 27.0 is reported to need **macOS Tahoe 26.6+ on Apple silicon**; Xcode 27 dropped Intel Macs. ⚠️ Confirm 27.1 on Apple's compatibility table | macOS 27.0.1 |
| **iOS SDK** | **iOS 27.1 SDK.** Check with `xcrun --sdk iphoneos --show-sdk-version`, which should print `27.1` | ✅ |
| **iOS runtime** | Device runs **iOS 27.1**. The app's deployment target can stay lower (ours is 16.4) | — |
| **Simulator** | iPhone Duo simulator in **Xcode Device Hub** (Xcode 27.1) | — |

### The UIScene life-cycle requirement

Apple's rule for the iOS 27 SDK:

> "Apps built with the latest SDK must adopt the scene-based life cycle or they fail to launch."

Without it, the app crashes at launch with *"UIScene life cycle is required for apps built with this SDK."* This affects **every** app built with Xcode 27, not only Duo apps.

| Stack | What to do |
|---|---|
| **Expo SDK 56** | ❌ Fails to launch under Xcode 27. Upgrade |
| **Expo SDK 57** (`expo` ≥ 57.0.23) | Set `ios.enableSceneSupport: true` in `expo-build-properties` |
| **Expo SDK 58** (beta) | Scenes are on by default |
| **Bare RN ≤ 0.87** | Add the scene manifest to Info.plist, create a `SceneDelegate.swift`, and change `AppDelegate` so it no longer creates the window |
| **Bare RN 0.88** | Scene support is in core (0.88 stable was scheduled for 12 Oct 2026) |

**Our app (commit `36e7ffe`):**

```js
// app.config.js → expo-build-properties
ios: {
  deploymentTarget: '16.4',
  // Required to launch when built with the iOS 27 SDK (UIScene lifecycle).
  // SDK 57 only: remove when upgrading to SDK 58, where it is the default.
  enableSceneSupport: true
}
```
Also bump `expo-build-properties` to `57.0.22` or later.

**Bare RN: Info.plist scene manifest**

```xml
<key>UIApplicationSceneManifest</key>
<dict>
  <key>UIApplicationSupportsMultipleScenes</key>
  <false/>
  <key>UISceneConfigurations</key>
  <dict>
    <key>UIWindowSceneSessionRoleApplication</key>
    <array>
      <dict>
        <key>UISceneConfigurationName</key>
        <string>Default Configuration</string>
        <key>UISceneDelegateClassName</key>
        <string>$(PRODUCT_MODULE_NAME).SceneDelegate</string>
      </dict>
    </array>
  </dict>
</dict>
```
In `SceneDelegate`, keep `appDelegate?.window = window`. Leaving it out crashes (RN issue #53602).

### Library versions that matter

| Library | Version | Why |
|---|---|---|
| `react-native-screens` | ≥ 4.25 (iPhone Duo fixes shipped 13 Oct) | We use **4.26.0** ✅ |
| `react-native-safe-area-context` | Recent 5.x | Reports per-side insets correctly. We use 5.7.0 ✅ |
| React Navigation | 7.x | The native bottom tabs (`@react-navigation/bottom-tabs/unstable`) are expected to move to the side ⚠️ not verified on a device |

### 💡 My take: things that are easy to miss
- **Scene adoption changes more than layout.** Under a scene delegate, UIKit delivers URLs to the **scene**, not the app delegate. Retest **deep links and universal links** (cold start and warm start).
- **Native SDKs that hook `AppDelegate`** (push, analytics, attribution, crash reporting) may stop receiving events. Retest each one.
- **CLI tooling:** Xcode 27 moved simulators into Device Hub, and `npx expo run:ios` failed until a fix was merged (expo/expo #46882). Update Expo CLI.
- Do the Xcode 27 migration on its **own branch, before any layout work**. A crash at launch hides every other problem.

---

## 2. Showcase: our app without Duo support

There are **two different "without support" states**, and both are worth showing.

### State A: old build (not built with the iOS 27.1 SDK) → letterboxed

The OS runs the app in **compatibility mode** at a familiar iPhone size and aspect ratio. The rest of the display stays unused.

```
 Inner display (626 × 890), old build
┌───────────────────────────────┐
│███████████████████████████████│
│█████┌─────────────────┐███████│
│█████│ Explore         │███████│
│█████│ [ Search…     ] │███████│
│█████│ ┌───┐ ┌───┐     │███████│   ← app runs at "normal iPhone" size
│█████│ │   │ │   │     │███████│
│█████│ └───┘ └───┘     │███████│
│█████│ 🧭  ♡  🗺  👤     │███████│
│█████└─────────────────┘███████│
│███████████████████████████████│
└───────────────────────────────┘
```
Nothing breaks, but the app looks dated and wastes the bigger screen. **Point to make:** "it works" is not the same as "it's supported".

### State B: built with the 27.1 SDK but no layout fixes (commit `36e7ffe`)

Now the app gets the whole window, and every assumption in the code shows up. What we saw in `rn-duo`:

| Symptom | Root cause | Fixed in |
|---|---|---|
| **Popular carousel cards stay sized for 466 pt** after unfolding, and the carousel snap offset is wrong | `DESTINATION_CARD_WIDTH` was computed from `Dimensions.get('window')` **at module load** | `8de563e` |
| **The whole UI changes size** when rotating, because `scale()` mixed up width and height | `Metrics.tsx` computed `baseSize` once, from the launch window | `8de563e` |
| **Tab bar switches to a short side-by-side layout** (icon next to label) on wide windows | React Navigation's automatic `tabBarLabelPosition` on wide screens | `8de563e` |
| **Header, search bar, and back/favourite buttons hidden under the side status bar or camera** | Code only used `insets.top`; it ignored `insets.left` and `insets.right` | `5f1d8c3` |
| **App appears sideways or stretched** on the inner display | `orientation: 'portrait'` is **ignored** there | (see §4) |

```
 Inner display, landscape, State B
┌──────────────────────────────────────────┐
│▌Explore             (A)│                 │  ← title under the side status bar
│▌[ Search…           ]  │                 │
│▌┌──────┐┌──────┐       │   empty space   │  ← cards still 466-pt sized
│▌└──────┘└──────┘       │                 │
│ 🧭 Explore  ♡ Saved  🗺 Trips  👤 Profile │  ← tab bar squashed
└──────────────────────────────────────────┘
  ▌ = side system bar / camera area
```

### Demo script (≈ 6 min)
1. `git checkout 36e7ffe`, then run on the **iPhone Duo simulator** (Device Hub). Show the **closed** state: looks fine.
2. **Unfold:** cards stay small, there's empty space, the tab bar changes shape.
3. **Rotate the inner display:** the header slides under the side status bar, and the portrait lock is ignored.
4. **Split View:** drag the divider slowly. Nothing reflows.
5. `git checkout 5f1d8c3` and repeat. Everything reflows.

> 📸 Take screenshots at **466 pt** and **626 pt** (portrait and landscape) for both commits as backup slides, in case the simulator misbehaves live.

---

## 3. Impacted areas and what to do

| # | Area | What goes wrong | What to do |
|---|---|---|---|
| 1 | **App launch** | Crash at launch under Xcode 27 | Adopt the UIScene life cycle (§1) |
| 2 | **Deep links / universal links** | URLs go to the scene delegate, so links stop working | Retest cold, warm, and universal links; RN 0.88 / Expo handle routing |
| 3 | **Native SDKs** (push, analytics, crash reporting, attribution) | Hooks in `AppDelegate` stop firing | Check each SDK's scene-support notes and upgrade |
| 4 | **Static dimensions** | `Dimensions.get` at module scope never updates | `useWindowDimensions()` at render time (§6) |
| 5 | **Orientation locks** | Ignored on the inner display | Remove the assumption and make layouts work in any aspect ratio (§4) |
| 6 | **Safe-area math** | Side bars make left and right insets different | Apply each edge separately (§5) |
| 7 | **Device-type checks** | `Platform.isPad` is **false** on Duo, so tablet layouts never appear | Choose layouts by **width** (e.g. `width >= 600`) |
| 8 | **AppState** | In Split View an app can be **visible but `inactive`**. Pausing on `inactive` freezes content the user can see | Pause video, timers, and animations only on **`background`** |
| 9 | **Tab bar / toolbars** | JS tab bar stays at the bottom; native system bars move to the side | Set `tabBarLabelPosition` explicitly, or try native bottom tabs ⚠️ |
| 10 | **Video** | Full-screen 16:9 on a 1.42 display leaves about 125 pt of black bars | Keep the player at `aspectRatio: 16/9` and put related content underneath |
| 11 | **Camera** | Folding switches which camera faces the user, which can cause a black or frozen preview or the wrong lens | Test start, then fold, then unfold, with your camera library |
| 12 | **Hinge-aware UI** | No JavaScript API exists for `reservedRegions`, `UIHingeInteraction`, or arrangements | Keep controls away from the centre fold. A native module is needed for real hinge awareness ⚠️ |

### Fixes from our repo

**Tab bar: keep it consistent on wide windows** (`src/navigation/BottomTabNavigator.tsx`)
```tsx
const insets = useSafeAreaInsets();
// ...
tabBarLabelPosition: 'below-icon',          // don't switch to side-by-side when wide
tabBarStyle: {
  height: scale(40) + insets.bottom,        // explicit height fits the icon and label
  paddingTop: scale(6)
},
tabBarIconSize: scale(25),
```

**Responsive layout: branch on width, not on device**
```tsx
const { width } = useWindowDimensions();
const isWide = width >= 600;          // closed = 1 column, open = 2 columns (any orientation)
const numColumns = isWide ? 2 : 1;

<FlatList
  key={numColumns}                    // FlatList can't change numColumns in place: remount it
  numColumns={numColumns}
  ...
/>
```

**AppState: pause on background only**
```ts
AppState.addEventListener('change', (state) => {
  if (state === 'background') pausePlayback();   // not: state !== 'active'
});
```

### 💡 My take
- **Reflow instead of scaling up.** Our `scale()` helper enlarges things on bigger windows, which works for phones. On a 626-pt inner display it's usually better to show **more content** (more columns, a master/detail layout) than **bigger content**. Decide this as a team for each screen.
- **Hidden `numColumns` problem:** changing `numColumns` on a live `FlatList` throws an error, so the `key` change above is required.
- **Size-derived values in memoized code:** a `useMemo` or `useCallback` that reads `width` without listing it as a dependency will still be stale. Lint helps, but `eslint-disable` comments hide this (we have one in `useTheme`; there it's intentional and commented).
- **Bottom sheets and modals:** snap points calculated as a percentage of the launch height have the same stale-value problem as `Dimensions`.
- **Images:** a hero image sized for 466 pt gets upscaled and looks soft at 890 pt. Request larger sources or use `srcSet`-style URLs.
- **Grep before you estimate:**
  ```bash
  grep -rn "Dimensions.get" src/
  grep -rn "Math.max(insets" src/
  grep -rnE "isPad|lockToPortrait|UISupportedInterfaceOrientations" src/ ios/
  grep -rn "AppState" src/
  ```

---

## 4. Impact on the orientation lock

**The rule:** on the **inner display, iPhone Duo does not honour the app's supported interface orientations.** This applies to:
- `orientation: 'portrait'` in `app.config.js` / `app.json` (our app has this)
- `UISupportedInterfaceOrientations` in Info.plist
- Runtime libraries such as `expo-screen-orientation` and `react-native-orientation-locker` (`lockToPortrait()`)

The lock is ignored **silently**: no warning and no error. A layout that assumes "height > width" will appear sideways or stretched.

**Why Apple does this:** the inner display is close to square (≈ 1.42) and the user holds it either way. Forcing portrait would leave the app letterboxed in landscape. iPad has followed the same idea since iPadOS 26.

### What to do
1. **Don't rely on the lock** for layout correctness. Keep it if it helps the outer display, but test as though it isn't there.
2. **Fix what the lock was hiding:** screens that only ever worked in portrait (long forms, fixed-height headers, full-height images).
3. **Choose layouts by width, not orientation:**
   ```ts
   const { width } = useWindowDimensions();
   const columns = width >= 600 ? 2 : 1;   // correct in portrait AND landscape
   ```
4. **Keep scale stable when rotating.** Our `Metrics.tsx` now calculates scale from the **short and long sides**, so rotating doesn't change the UI size:
   ```ts
   const baseWidth  = Math.min(width, height) / guidelineBaseWidth;
   const baseHeight = Math.max(width, height) / guidelineBaseHeight;
   ```
   (`jest/__tests__/Metrics.test.ts` checks that `scale(100)` is the same in portrait and landscape.)

### 💡 My take
- Screens that **must** be portrait (for example, camera or document capture) should **adapt** (centre the content in a portrait-shaped container) rather than assume the device will rotate for them.
- Don't use `useWindowDimensions` to detect *orientation* (`width > height`) and then pick a layout. Use it to detect the **available width**. Split View can give you a narrow window on a landscape device.

---

## 5. How SafeAreaView and safe-area insets behave

### What changes
On iPhone, `insets.left` and `insets.right` used to be equal (0 in portrait, or matching notch insets in landscape). On iPhone Duo:
- The **outer display** and the **inner display in landscape** put system bars **on one side**.
- So **`insets.left !== insets.right`** is now normal.
- The FaceTime camera on the inner display adds its own occluded area.

### What still works
- `SafeAreaView` (from `react-native-safe-area-context`) **applies per-side insets correctly** on its own.
- `useSafeAreaInsets()` **reports real values** for each side.

### What breaks: our own inset math

```tsx
// ❌ Assumes both sides match: over-pads one side and pushes content off-centre
<View style={{ paddingHorizontal: insets.left }} />
<View style={{ paddingHorizontal: Math.max(insets.left, insets.right) }} />

// ✅ Each edge on its own
<View style={{ paddingLeft: insets.left, paddingRight: insets.right }} />
```
The same applies in native code: use `bounds.inset(by: safeAreaInsets).width`, not `bounds.width - safeAreaInsets.left * 2`.

### The bug in our app: only `insets.top` was used (`5f1d8c3`)

**Before:** the back and favourite buttons in `DetailsHero` only cleared the top inset, so in landscape they sat under the side status bar or camera.
```tsx
const actionsPosition = useMemo<ViewStyle>(() => ({ top: insets.top + scale(26) }), [insets.top]);
```
**After:**
```tsx
const actionsPosition = useMemo<ViewStyle>(
  () => ({
    top: insets.top || scale(26),
    left: scale(14) + insets.left,
    right: scale(14) + insets.right
  }),
  [insets.top, insets.left, insets.right]
);
```
**Explore header and search bar:** the same fix, with `marginLeft: insets.left, marginRight: insets.right`.

### 💡 My take
- **Edge-to-edge screens** (hero images, maps, video) are where this matters most. They deliberately skip `SafeAreaView` and position controls by hand. Search for `position: 'absolute'` together with `insets.top`.
- **List content:** `FlatList` / `ScrollView` rows need left and right padding too, not only the header. Using `contentContainerStyle` with `paddingLeft` and `paddingRight` is the cleanest way.
- **Use `edges` on SafeAreaView** to choose which sides to pad (for example `edges={['top', 'left', 'right']}` above a tab bar), instead of wrapping and then padding again by hand.
- **Inset values change at runtime** (fold, rotate, Split View), so never store them in module-scope constants or in Redux.

---

## 6. Fixing the `Dimensions.get('window')` problem

### The problem
```ts
// ❌ Runs ONCE, when the JS module first loads
import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: { width: width * 0.9 }      // stays sized for the 466-pt outer display forever
});
```
- The value is **captured at launch**. Fold, unfold, rotate, and Split View never update it.
- **`Dimensions.addEventListener` does not fix this on its own.** The event fires, but `StyleSheet.create` objects built at module scope are never rebuilt.
- **A variant that's easy to miss:** derived constants such as `const CARD_W = width * 0.45`, which were exactly our `DESTINATION_CARD_WIDTH` bug.

### Fix level 1: `useWindowDimensions()` in render (the standard answer)
```tsx
import { useWindowDimensions, View } from 'react-native';

function Card({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();          // re-renders on every size change
  return <View style={{ width: width * 0.9 }}>{children}</View>;
}
```

### Fix level 2: fix it once in the theme layer (what `rn-duo` did)

Our app creates every style through `useTheme(styleSheet)` and sizes everything with `scale()`. Instead of touching more than 40 components, we fixed the **shared layer**:

**`src/theme/Metrics.tsx`: live values instead of one-time values**
```ts
let width = 0;
let height = 0;
let baseSize = 1;

const updateMetrics = (window: Pick<ScaledSize, 'width' | 'height'>): void => {
  if (window.width === width && window.height === height) return;   // no-op if unchanged
  width = window.width;
  height = window.height;
  const baseWidth  = Math.min(width, height) / guidelineBaseWidth;
  const baseHeight = Math.max(width, height) / guidelineBaseHeight;
  const isTablet = (Platform.OS === 'ios' && Platform.isPad) || (baseWidth + baseHeight) / 2 > 1.2;
  baseSize = (baseWidth + baseHeight) * (isTablet ? 0.4 : 0.5);
};

updateMetrics(Dimensions.get('window'));   // initial value only
export { scale, updateMetrics, width, height };   // `width`/`height` are ES live bindings
```

**`src/hooks/useTheme.ts`: update the metrics and rebuild styles on resize**
```ts
const { width: windowWidth, height: windowHeight } = useWindowDimensions();
updateMetrics({ width: windowWidth, height: windowHeight });   // before any style is built

const styles = useMemo<T>(
  () => (styleSheetFn?.(currentThemeMode, isDark) ?? {}) as T,
  [styleSheetFn, currentThemeMode, isDark, windowWidth, windowHeight]   // rebuild on resize
);
```

**Module-scope constant → function read at render time**
```ts
// ❌ before
export const DESTINATION_CARD_WIDTH = Math.round((width * 140) / guidelineBaseWidth);
// ✅ after
export const getDestinationCardWidth = (): number =>
  Math.round((width * DESIGN_CARD_WIDTH) / guidelineBaseWidth);
```

### Rules to take away
1. **Never read window size at module scope.** Read it inside render or a hook.
2. **Any constant derived from size should become a function** (or a hook).
3. Use `Dimensions.get` **only** as an initial value, or inside event handlers that run *now*.
4. Prefer **flex and percentages** (`width: '90%'`, `flex: 1`, `aspectRatio`) over pixel maths where you can. They never go stale.
5. Use `screen` dimensions only for physical-display facts. **Layout depends on `window`** (Split View makes the window smaller than the screen).

### 💡 My take
- The theme-layer fix works **only because every component gets its styles through `useTheme`**. A component that imports `width` from `theme` and uses it in a module-level `StyleSheet.create` is still stale. Add a lint rule or review checklist item: *"no `width`/`height` reads outside render"*.
- `updateMetrics` runs **during render**, which is a deliberate side effect. It's idempotent and cheap, but call it out in code review so nobody "cleans it up" into a `useEffect` (that would run after the styles were built, which is too late).
- Write a unit test like `Metrics.test.ts` so the behaviour can't silently regress.

---

## 7. Testing strategy and checklist

### Where to test
| Tool | What it covers | What it misses |
|---|---|---|
| **Xcode 27.1 Device Hub, iPhone Duo simulator** | Open, close, rotate, fold poses, Split View | The real hinge feel; widgets and share extensions don't run |
| **iPad simulator in Split View** | Drag the divider through its whole range to find cached dimensions | Side bars, hinge |
| **Snapshot tests at 466 × 678 and 626 × 890** | Regressions in CI | Live resize transitions |
| **Real device (from 23 Oct)** | Camera across a fold, native tabs, hinge | — |

### Migration order (steps 1–4 give most of the visible improvement)
1. ✅ Build with Xcode 27.1 and adopt the UIScene life cycle; retest deep links, push, and SDKs
2. ✅ Replace module-scope `Dimensions.get` with `useWindowDimensions` / live metrics
3. ✅ Remove reliance on orientation locks and fix what they hid
4. ✅ Audit safe-area math (per side)
5. Replace device-type checks with width checks
6. Test the Split View divider across its full range
7. Check `AppState` handling (`background`, not `inactive`)
8. Native tab bar and camera across a fold
9. Decide whether a native fold or hinge module is worth it

### Checklist slide
- [ ] Builds and launches with Xcode 27.1 (scene life cycle)
- [ ] Deep links work (cold, warm, universal)
- [ ] No `Dimensions.get` at module scope
- [ ] Layout chosen by width; no `Platform.isPad` branching
- [ ] Works in any orientation on the inner display
- [ ] `insets.left` and `insets.right` applied separately
- [ ] Media pauses on `background` only
- [ ] 16:9 video isn't the only thing filling a near-square screen
- [ ] Controls kept away from the centre fold
- [ ] Tested at 466 pt and 626 pt, in portrait and landscape, plus Split View
- [ ] App Store: Duo screenshots are **optional** for now (outer 1398 × 2034 px, inner 2007 × 2853 px)

---

## Q&A: likely questions

**Q: Can we opt out of Split View?**
No. Every app takes part in Split View, so assume any width between 466 and 890 pt.

**Q: Is there a JS API for the hinge or fold?**
Not yet. `reservedRegions`, `UIHingeInteraction`, and arrangement APIs are native only. You'd need a custom native module (for example, one emitting `foldStateDidChange` to a `useFoldState()` hook). RN's own fold API is still an open PR. ⚠️ Beware an npm package called `expo-hinge`: it's a placeholder, not Expo's module.

**Q: Do we have to support it on day one?**
Older builds still run (letterboxed). But **any** build made with Xcode 27 needs the scene life cycle, and once you build with the 27.1 SDK you get the full window, with all of the issues above.

**Q: Does this affect Android?**
These issues (stale dimensions, asymmetric insets, ignored orientation locks, resizable windows) have existed on Android foldables and large screens for years. Fixing them for Duo also improves Android.

---

## References
- Ingenious Techlab: [React Native & Expo on iPhone Duo / iOS 27](https://ingenioustechlab.com/blog/react-native-expo-iphone-duo-ios-27/)
- iPhone Duo Support: [React Native framework guide](https://iphoneduosupport.com/frameworks/react-native/)
- iPhone Duo Support: [React Native on iPhone Duo (blog)](https://iphoneduosupport.com/blog/react-native-iphone-duo/)
- Blake Crosley: [Xcode 27 Is Out: Requirements, Targets, and What Broke](https://blakecrosley.com/blog/xcode-27-release) (macOS requirement)
- Blake Crosley: [Xcode 27 Drops Intel](https://blakecrosley.com/blog/xcode-27-drops-intel)
- Demo repo commits: `36e7ffe` (scene support only) → `8de563e` (dynamic metrics, tab bar) → `5f1d8c3` (per-side insets)
