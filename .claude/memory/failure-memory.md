# Failure Memory

This file contains project-specific mistakes that should never be repeated.

---

## FM-001

### Problem

Duplicate API requests.

### Root Cause

Using `useEffect` with unstable dependencies.

### Rule

Prefer React Query or event-driven fetching. Avoid fetching inside `useEffect` unless dependencies are guaranteed stable.

### Example

❌

```tsx
useEffect(() => {
  fetchUser();
}, [navigation]);
```

✅

```tsx
useFocusEffect(
  useCallback(() => {
    fetchUser();
  }, []),
);
```

---

## FM-002

### Problem

Bottom Sheet UI breaks when keyboard opens.

### Root Cause

Using normal TextInput inside Gorhom BottomSheet.

### Rule

Always use `BottomSheetTextInput`.

---

## FM-003

### Problem

Crash because API returned null.

### Rule

Never assume `user.profile` exists. Always guard with optional chaining.

### Example

❌

```tsx
const name = user.profile.name;
```

✅

```tsx
const name = user?.profile?.name;
```

---

## FM-004

### Problem

Hardcoded colors and dimensions break dark mode and responsive scaling.

### Root Cause

Using raw hex values and fixed pixel numbers in styles.

### Rule

Always use the theme system: colors via `Colors[theme]?.key` and dimensions via `scale(value)`. Never hardcode.

### Example

❌

```tsx
backgroundColor: '#FFFFFF',
padding: 16,
```

✅

```tsx
backgroundColor: Colors[theme]?.background,
padding: scale(16),
```

---

## FM-005

### Problem

Hardcoded user-facing strings can't be translated.

### Root Cause

Writing literal text directly in components.

### Rule

Always use centralized i18n strings via `Strings.<Namespace>.<key>`. Never hardcode display text.

---

## FM-006

### Problem

Requests keep running / update state after a screen unmounts, causing warnings and leaks.

### Root Cause

Using plain `createAsyncThunk` without cancellation, or not aborting dispatches on cleanup.

### Rule

Always use `createAsyncThunkWithCancelToken` and abort the dispatch in the effect cleanup.

### Example

✅

```tsx
const promise = dispatch(fetchTodos());
return () => promise.abort();
```

---

## FM-007

### Problem

FlatList re-renders every item on any change and scrolls poorly.

### Root Cause

Inline `renderItem`/`keyExtractor`, missing `keyExtractor`, or non-memoized item components.

### Rule

Memoize `renderItem` and `keyExtractor` with `useCallback`, wrap item components in `React.memo`, and always provide a stable `keyExtractor`.

---

## FM-008

### Problem

`any` types hide bugs and defeat strict TypeScript.

### Root Cause

Reaching for `any` instead of defining a typed interface.

### Rule

No `any`. Always define and use typed interfaces (see `app/types/`).

---

## FM-009

### Problem

`navigation.navigate` / `route.params` are untyped, so wrong params compile but crash at runtime.

### Root Cause

Navigating without registering the route in `RootStackParamList` and its params.

### Rule

Always add the screen and its params to `RootStackParamList` and use `NavigationRoutes` constants — never navigate to a raw string route.

### Example

❌

```tsx
navigation.navigate('Todo', { id });
```

✅

```tsx
navigation.navigate(ROUTES.Todo, { id });
// with Todo: { id: number } declared in RootStackParamList
```

---

## FM-010

### Problem

Persisted Redux state is stale, bloated, or leaks sensitive data after reload.

### Root Cause

Whitelisting entire reducers (or none) in redux-persist and using raw string MMKV keys.

### Rule

Only whitelist the slices that must survive restart, and always read/write MMKV via the `MMKVKeys` constants — never inline key strings.

---

## FM-011

### Problem

Form submits with invalid data or the submit button stays enabled on invalid input.

### Root Cause

Manual validation / no schema, or not gating submit on Formik validity.

### Rule

Always define a Yup schema in `ValidationSchema`, drive the form with Formik, surface `errors`/`touched` messages via i18n strings, and disable submit until valid.

---

## FM-012

### Problem

API integration is incomplete — errors are swallowed silently, a new slice never updates state, or duplicate action/URL keys collide.

### Root Cause

Omitting the `.rejected` `extraReducers` case, forgetting to register a new reducer in `Store.ts`, or hardcoding URLs/action keys instead of using `APIConst` / `ToolkitAction`.

### Rule

For every thunk (built with `createAsyncThunkWithCancelToken`), wire **all three** `extraReducers` cases — `.pending`, `.fulfilled`, `.rejected` (never skip `.rejected`). Register every new slice in `Store.ts` `combineReducers`, export it from the slice barrel, and add URLs/keys only via `APIConst` and `ToolkitAction`.

### Example

❌

```tsx
builder
  .addCase(fetchTodos.fulfilled, ...);
// .rejected missing → errors vanish
```

✅

```tsx
builder
  .addCase(fetchTodos.pending, ...)
  .addCase(fetchTodos.fulfilled, ...)
  .addCase(fetchTodos.rejected, ...);
```

---

## FM-013

### Problem

New feature screen is unreachable, or Redux logic leaks into the Screen component.

### Root Cause

Skipping one of the four wiring points, or calling `dispatch`/selectors/actions directly inside the Screen instead of the custom hook.

### Rule

Keep all Redux logic (dispatch, selectors, actions, Formik) in `use<Feature>.ts` — the Screen consumes the hook only. A feature is reachable only when **all four** exist: `ROUTES.<Feature>` in `NavigationRoutes.ts`, the `<Stack.Screen>` registration, the `RootStackParamList` param type, and the `app/modules/index.ts` barrel export. Missing any one = broken feature.
