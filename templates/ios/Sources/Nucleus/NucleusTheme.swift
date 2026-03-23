import Foundation

/// Semantic color set for Nucleus.
/// All values are hex strings (e.g. "FFFFFF") – the consuming app bridges to its own color type.
public struct NucleusSemanticColors: Sendable {
    // Background
    public let backgroundPrimary: String
    public let backgroundSecondary: String
    public let backgroundTertiary: String
    // Text
    public let textPrimary: String
    public let textSecondary: String
    public let textTertiary: String
    public let textInverse: String
    // Border
    public let borderDefault: String
    public let borderStrong: String
    // Action
    public let actionPrimary: String
    public let actionPrimaryContent: String
    public let actionSecondary: String
    public let actionDisabled: String
    public let actionDisabledContent: String
    // Status
    public let statusError: String
    public let statusWarning: String
    public let statusSuccess: String
    public let statusInfo: String
    // Tab Bar
    public let tabBarSelected: String
    public let tabBarUnselected: String
    public let tabBarBackground: String
    public let tabBarBorder: String
}

public enum NucleusTheme {
    public static let light = NucleusSemanticColors(
        backgroundPrimary: NucleusLightColorTokens.backgroundPrimary,
        backgroundSecondary: NucleusLightColorTokens.backgroundSecondary,
        backgroundTertiary: NucleusLightColorTokens.backgroundTertiary,
        textPrimary: NucleusLightColorTokens.textPrimary,
        textSecondary: NucleusLightColorTokens.textSecondary,
        textTertiary: NucleusLightColorTokens.textTertiary,
        textInverse: NucleusLightColorTokens.textInverse,
        borderDefault: NucleusLightColorTokens.borderDefault,
        borderStrong: NucleusLightColorTokens.borderStrong,
        actionPrimary: NucleusLightColorTokens.actionPrimary,
        actionPrimaryContent: NucleusLightColorTokens.actionPrimaryContent,
        actionSecondary: NucleusLightColorTokens.actionSecondary,
        actionDisabled: NucleusLightColorTokens.actionDisabled,
        actionDisabledContent: NucleusLightColorTokens.actionDisabledContent,
        statusError: NucleusLightColorTokens.statusError,
        statusWarning: NucleusLightColorTokens.statusWarning,
        statusSuccess: NucleusLightColorTokens.statusSuccess,
        statusInfo: NucleusLightColorTokens.statusInfo,
        tabBarSelected: NucleusLightColorTokens.tabBarSelected,
        tabBarUnselected: NucleusLightColorTokens.tabBarUnselected,
        tabBarBackground: NucleusLightColorTokens.tabBarBackground,
        tabBarBorder: NucleusLightColorTokens.tabBarBorder
    )

    public static let dark = NucleusSemanticColors(
        backgroundPrimary: NucleusDarkColorTokens.backgroundPrimary,
        backgroundSecondary: NucleusDarkColorTokens.backgroundSecondary,
        backgroundTertiary: NucleusDarkColorTokens.backgroundTertiary,
        textPrimary: NucleusDarkColorTokens.textPrimary,
        textSecondary: NucleusDarkColorTokens.textSecondary,
        textTertiary: NucleusDarkColorTokens.textTertiary,
        textInverse: NucleusDarkColorTokens.textInverse,
        borderDefault: NucleusDarkColorTokens.borderDefault,
        borderStrong: NucleusDarkColorTokens.borderStrong,
        actionPrimary: NucleusDarkColorTokens.actionPrimary,
        actionPrimaryContent: NucleusDarkColorTokens.actionPrimaryContent,
        actionSecondary: NucleusDarkColorTokens.actionSecondary,
        actionDisabled: NucleusDarkColorTokens.actionDisabled,
        actionDisabledContent: NucleusDarkColorTokens.actionDisabledContent,
        statusError: NucleusDarkColorTokens.statusError,
        statusWarning: NucleusDarkColorTokens.statusWarning,
        statusSuccess: NucleusDarkColorTokens.statusSuccess,
        statusInfo: NucleusDarkColorTokens.statusInfo,
        tabBarSelected: NucleusDarkColorTokens.tabBarSelected,
        tabBarUnselected: NucleusDarkColorTokens.tabBarUnselected,
        tabBarBackground: NucleusDarkColorTokens.tabBarBackground,
        tabBarBorder: NucleusDarkColorTokens.tabBarBorder
    )
}
