@file:OptIn(ExperimentalFoundationApi::class)

package com.jaidensiu.nucleusapp

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.jaidensiu.nucleus.NucleusColorTokens

@Composable
fun NucleusApp() {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(NucleusColorTokens.colorGrey50)
            .padding(horizontal = 16.dp, vertical = 12.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp),
    ) {
        stickyHeader {
            Text(
                text = "Nucleus",
                style = MaterialTheme.typography.headlineLarge,
                color = NucleusColorTokens.colorGrey950,
                modifier = Modifier
                    .fillMaxWidth()
                    .background(NucleusColorTokens.colorGrey50.copy(alpha = 0.92f))
                    .padding(vertical = 4.dp),
            )
        }

        items(primitiveGroups) { group ->
            ColorGroupSection(group)
        }
    }
}

@Composable
private fun ColorGroupSection(group: TokenGroup) {
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Text(
            text = group.name,
            style = MaterialTheme.typography.titleMedium,
            color = NucleusColorTokens.colorGrey950,
        )

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            group.tokens.forEach { token ->
                ColorCard(token)
            }
        }
    }
}

@Composable
private fun ColorCard(token: TokenSwatch) {
    Card {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(NucleusColorTokens.colorGrey0)
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Box(
                modifier = Modifier
                    .size(44.dp)
                    .border(1.dp, NucleusColorTokens.colorGrey200, RoundedCornerShape(12.dp))
                    .background(token.color, RoundedCornerShape(12.dp)),
            )

            Column {
                Text(
                    text = token.name,
                    style = MaterialTheme.typography.bodyLarge,
                    color = NucleusColorTokens.colorGrey950,
                )
                Text(
                    text = token.hex,
                    style = MaterialTheme.typography.bodySmall,
                    color = NucleusColorTokens.colorGrey700,
                )
            }
        }
    }
}

private data class TokenGroup(
    val name: String,
    val tokens: List<TokenSwatch>,
)

private data class TokenSwatch(
    val name: String,
    val color: Color,
    val hex: String,
)

private val primitiveGroups = listOf(
    TokenGroup(
        name = "Grey",
        tokens = listOf(
            TokenSwatch("colorGrey0", NucleusColorTokens.colorGrey0, "#FFFFFF"),
            TokenSwatch("colorGrey50", NucleusColorTokens.colorGrey50, "#F9FAFB"),
            TokenSwatch("colorGrey100", NucleusColorTokens.colorGrey100, "#F2F3F5"),
            TokenSwatch("colorGrey200", NucleusColorTokens.colorGrey200, "#EAEBED"),
            TokenSwatch("colorGrey300", NucleusColorTokens.colorGrey300, "#D7D9DC"),
            TokenSwatch("colorGrey400", NucleusColorTokens.colorGrey400, "#B5B7BA"),
            TokenSwatch("colorGrey500", NucleusColorTokens.colorGrey500, "#9FA2A5"),
            TokenSwatch("colorGrey600", NucleusColorTokens.colorGrey600, "#8A8C8F"),
            TokenSwatch("colorGrey700", NucleusColorTokens.colorGrey700, "#747679"),
            TokenSwatch("colorGrey800", NucleusColorTokens.colorGrey800, "#595B5E"),
            TokenSwatch("colorGrey900", NucleusColorTokens.colorGrey900, "#3F4144"),
            TokenSwatch("colorGrey950", NucleusColorTokens.colorGrey950, "#17181A"),
        ),
    ),
    TokenGroup(
        name = "Error",
        tokens = listOf(
            TokenSwatch("colorError100", NucleusColorTokens.colorError100, "#FFF8F7"),
            TokenSwatch("colorError200", NucleusColorTokens.colorError200, "#FFD7D1"),
            TokenSwatch("colorError300", NucleusColorTokens.colorError300, "#FFB4A8"),
            TokenSwatch("colorError400", NucleusColorTokens.colorError400, "#FF8D7E"),
            TokenSwatch("colorError500", NucleusColorTokens.colorError500, "#FC6150"),
            TokenSwatch("colorError600", NucleusColorTokens.colorError600, "#F2261D"),
            TokenSwatch("colorError700", NucleusColorTokens.colorError700, "#B8110C"),
            TokenSwatch("colorError800", NucleusColorTokens.colorError800, "#7F0001"),
            TokenSwatch("colorError900", NucleusColorTokens.colorError900, "#490000"),
        ),
    ),
    TokenGroup(
        name = "Warning",
        tokens = listOf(
            TokenSwatch("colorWarning100", NucleusColorTokens.colorWarning100, "#FFF9F1"),
            TokenSwatch("colorWarning200", NucleusColorTokens.colorWarning200, "#FFEBD0"),
            TokenSwatch("colorWarning300", NucleusColorTokens.colorWarning300, "#FFDDAD"),
            TokenSwatch("colorWarning400", NucleusColorTokens.colorWarning400, "#FFCE87"),
            TokenSwatch("colorWarning500", NucleusColorTokens.colorWarning500, "#FFBF5A"),
            TokenSwatch("colorWarning600", NucleusColorTokens.colorWarning600, "#FEAF00"),
            TokenSwatch("colorWarning700", NucleusColorTokens.colorWarning700, "#B47A00"),
            TokenSwatch("colorWarning800", NucleusColorTokens.colorWarning800, "#6F4A00"),
            TokenSwatch("colorWarning900", NucleusColorTokens.colorWarning900, "#311F00"),
        ),
    ),
    TokenGroup(
        name = "Success",
        tokens = listOf(
            TokenSwatch("colorSuccess100", NucleusColorTokens.colorSuccess100, "#F1FEF1"),
            TokenSwatch("colorSuccess200", NucleusColorTokens.colorSuccess200, "#CEF4CE"),
            TokenSwatch("colorSuccess300", NucleusColorTokens.colorSuccess300, "#AAE8AB"),
            TokenSwatch("colorSuccess400", NucleusColorTokens.colorSuccess400, "#84DC88"),
            TokenSwatch("colorSuccess500", NucleusColorTokens.colorSuccess500, "#58CF62"),
            TokenSwatch("colorSuccess600", NucleusColorTokens.colorSuccess600, "#00C235"),
            TokenSwatch("colorSuccess700", NucleusColorTokens.colorSuccess700, "#008C24"),
            TokenSwatch("colorSuccess800", NucleusColorTokens.colorSuccess800, "#005A14"),
            TokenSwatch("colorSuccess900", NucleusColorTokens.colorSuccess900, "#002C06"),
        ),
    ),
    TokenGroup(
        name = "Info",
        tokens = listOf(
            TokenSwatch("colorInfo100", NucleusColorTokens.colorInfo100, "#F7FAFF"),
            TokenSwatch("colorInfo200", NucleusColorTokens.colorInfo200, "#CADEFF"),
            TokenSwatch("colorInfo300", NucleusColorTokens.colorInfo300, "#9CC2FF"),
            TokenSwatch("colorInfo400", NucleusColorTokens.colorInfo400, "#6DA4FF"),
            TokenSwatch("colorInfo500", NucleusColorTokens.colorInfo500, "#3A84FF"),
            TokenSwatch("colorInfo600", NucleusColorTokens.colorInfo600, "#0064EE"),
            TokenSwatch("colorInfo700", NucleusColorTokens.colorInfo700, "#004BB7"),
            TokenSwatch("colorInfo800", NucleusColorTokens.colorInfo800, "#003484"),
            TokenSwatch("colorInfo900", NucleusColorTokens.colorInfo900, "#001E53"),
        ),
    ),
)
