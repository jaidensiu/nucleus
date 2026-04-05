# iOS Example

iOS sample app that compiles the generated Swift token file from `build/ios` directly into the app target.

## Open

1. Run the root `npm run build` so `build/ios` exists.
2. Open `examples/ios/NucleusApp/NucleusApp.xcodeproj` in Xcode.
3. Choose a simulator and run the `NucleusApp` scheme.

The sample app renders primitive swatches using `NucleusColorTokens`.
