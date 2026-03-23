package com.jaidensiu.nucleus

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

/**
 * Semantic color interface for Nucleus.
 * All fields map to semantic token names.
 */
data class NucleusColors(
    // Background
    val backgroundPrimary: Color,
    val backgroundSecondary: Color,
    val backgroundTertiary: Color,
    // Text
    val textPrimary: Color,
    val textSecondary: Color,
    val textTertiary: Color,
    val textInverse: Color,
    // Border
    val borderDefault: Color,
    val borderStrong: Color,
    // Action
    val actionPrimary: Color,
    val actionPrimaryContent: Color,
    val actionSecondary: Color,
    val actionDisabled: Color,
    val actionDisabledContent: Color,
    // Status
    val statusError: Color,
    val statusWarning: Color,
    val statusSuccess: Color,
    val statusInfo: Color,
    // Tab Bar
    val tabBarSelected: Color,
    val tabBarUnselected: Color,
    val tabBarBackground: Color,
    val tabBarBorder: Color,
)

fun lightColors() = NucleusColors(
    backgroundPrimary = NucleusLightColorTokens.backgroundPrimary,
    backgroundSecondary = NucleusLightColorTokens.backgroundSecondary,
    backgroundTertiary = NucleusLightColorTokens.backgroundTertiary,
    textPrimary = NucleusLightColorTokens.textPrimary,
    textSecondary = NucleusLightColorTokens.textSecondary,
    textTertiary = NucleusLightColorTokens.textTertiary,
    textInverse = NucleusLightColorTokens.textInverse,
    borderDefault = NucleusLightColorTokens.borderDefault,
    borderStrong = NucleusLightColorTokens.borderStrong,
    actionPrimary = NucleusLightColorTokens.actionPrimary,
    actionPrimaryContent = NucleusLightColorTokens.actionPrimaryContent,
    actionSecondary = NucleusLightColorTokens.actionSecondary,
    actionDisabled = NucleusLightColorTokens.actionDisabled,
    actionDisabledContent = NucleusLightColorTokens.actionDisabledContent,
    statusError = NucleusLightColorTokens.statusError,
    statusWarning = NucleusLightColorTokens.statusWarning,
    statusSuccess = NucleusLightColorTokens.statusSuccess,
    statusInfo = NucleusLightColorTokens.statusInfo,
    tabBarSelected = NucleusLightColorTokens.tabBarSelected,
    tabBarUnselected = NucleusLightColorTokens.tabBarUnselected,
    tabBarBackground = NucleusLightColorTokens.tabBarBackground,
    tabBarBorder = NucleusLightColorTokens.tabBarBorder,
)

fun darkColors() = NucleusColors(
    backgroundPrimary = NucleusDarkColorTokens.backgroundPrimary,
    backgroundSecondary = NucleusDarkColorTokens.backgroundSecondary,
    backgroundTertiary = NucleusDarkColorTokens.backgroundTertiary,
    textPrimary = NucleusDarkColorTokens.textPrimary,
    textSecondary = NucleusDarkColorTokens.textSecondary,
    textTertiary = NucleusDarkColorTokens.textTertiary,
    textInverse = NucleusDarkColorTokens.textInverse,
    borderDefault = NucleusDarkColorTokens.borderDefault,
    borderStrong = NucleusDarkColorTokens.borderStrong,
    actionPrimary = NucleusDarkColorTokens.actionPrimary,
    actionPrimaryContent = NucleusDarkColorTokens.actionPrimaryContent,
    actionSecondary = NucleusDarkColorTokens.actionSecondary,
    actionDisabled = NucleusDarkColorTokens.actionDisabled,
    actionDisabledContent = NucleusDarkColorTokens.actionDisabledContent,
    statusError = NucleusDarkColorTokens.statusError,
    statusWarning = NucleusDarkColorTokens.statusWarning,
    statusSuccess = NucleusDarkColorTokens.statusSuccess,
    statusInfo = NucleusDarkColorTokens.statusInfo,
    tabBarSelected = NucleusDarkColorTokens.tabBarSelected,
    tabBarUnselected = NucleusDarkColorTokens.tabBarUnselected,
    tabBarBackground = NucleusDarkColorTokens.tabBarBackground,
    tabBarBorder = NucleusDarkColorTokens.tabBarBorder,
)

val LocalNucleusColors = staticCompositionLocalOf { lightColors() }

@Composable
fun NucleusTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    val colors = if (darkTheme) darkColors() else lightColors()
    CompositionLocalProvider(LocalNucleusColors provides colors) {
        content()
    }
}

object Nucleus {
    val colors: NucleusColors
        @Composable
        get() = LocalNucleusColors.current
}
