# Android Example

Android sample app that consumes the generated Android sources in `build/android`.

## Requirements

- Android Studio Koala or newer
- Android SDK 35

## Open

Run the root `npm run build` first so `build/android` exists. The demo wraps the generated Kotlin sources from `build/android/src/main/kotlin` in a local Android library module for IDE-friendly sync.

Open `examples/android` in Android Studio and run the `app` configuration.
