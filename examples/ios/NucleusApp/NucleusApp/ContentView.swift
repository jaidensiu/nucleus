import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            ScrollView {
                LazyVStack(alignment: .leading, spacing: 24) {
                    ForEach(primitiveGroups) { group in
                        VStack(alignment: .leading, spacing: 12) {
                            Text(group.name)
                                .font(.headline)
                                .foregroundStyle(Color(hex: NucleusColorTokens.colorGrey950))

                            ForEach(group.tokens) { token in
                                HStack(spacing: 12) {
                                    RoundedRectangle(cornerRadius: 12)
                                        .fill(Color(hex: token.hex))
                                        .frame(width: 44, height: 44)
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 12)
                                                .stroke(Color(hex: NucleusColorTokens.colorGrey200), lineWidth: 1)
                                        )

                                    VStack(alignment: .leading, spacing: 4) {
                                        Text(token.name)
                                            .font(.body)
                                            .foregroundStyle(Color(hex: NucleusColorTokens.colorGrey950))
                                        Text("#\(token.hex)")
                                            .font(.caption)
                                            .foregroundStyle(Color(hex: NucleusColorTokens.colorGrey700))
                                    }

                                    Spacer()
                                }
                                .padding(14)
                                .background(Color(hex: NucleusColorTokens.colorGrey0))
                                .clipShape(RoundedRectangle(cornerRadius: 16))
                            }
                        }
                    }
                }
                .padding(16)
            }
            .background(Color(hex: NucleusColorTokens.colorGrey50))
            .navigationTitle("Nucleus")
        }
        .navigationViewStyle(.stack)
    }
}

private struct TokenGroup: Identifiable {
    let id: String
    let name: String
    let tokens: [TokenSwatch]
}

private struct TokenSwatch: Identifiable {
    let id: String
    let name: String
    let hex: String
}

private let primitiveGroups: [TokenGroup] = [
    TokenGroup(
        id: "grey",
        name: "Grey",
        tokens: [
            TokenSwatch(id: "colorGrey0", name: "colorGrey0", hex: NucleusColorTokens.colorGrey0),
            TokenSwatch(id: "colorGrey50", name: "colorGrey50", hex: NucleusColorTokens.colorGrey50),
            TokenSwatch(id: "colorGrey100", name: "colorGrey100", hex: NucleusColorTokens.colorGrey100),
            TokenSwatch(id: "colorGrey200", name: "colorGrey200", hex: NucleusColorTokens.colorGrey200),
            TokenSwatch(id: "colorGrey300", name: "colorGrey300", hex: NucleusColorTokens.colorGrey300),
            TokenSwatch(id: "colorGrey400", name: "colorGrey400", hex: NucleusColorTokens.colorGrey400),
            TokenSwatch(id: "colorGrey500", name: "colorGrey500", hex: NucleusColorTokens.colorGrey500),
            TokenSwatch(id: "colorGrey600", name: "colorGrey600", hex: NucleusColorTokens.colorGrey600),
            TokenSwatch(id: "colorGrey700", name: "colorGrey700", hex: NucleusColorTokens.colorGrey700),
            TokenSwatch(id: "colorGrey800", name: "colorGrey800", hex: NucleusColorTokens.colorGrey800),
            TokenSwatch(id: "colorGrey900", name: "colorGrey900", hex: NucleusColorTokens.colorGrey900),
            TokenSwatch(id: "colorGrey950", name: "colorGrey950", hex: NucleusColorTokens.colorGrey950),
        ]
    ),
    TokenGroup(
        id: "error",
        name: "Error",
        tokens: [
            TokenSwatch(id: "colorError100", name: "colorError100", hex: NucleusColorTokens.colorError100),
            TokenSwatch(id: "colorError200", name: "colorError200", hex: NucleusColorTokens.colorError200),
            TokenSwatch(id: "colorError300", name: "colorError300", hex: NucleusColorTokens.colorError300),
            TokenSwatch(id: "colorError400", name: "colorError400", hex: NucleusColorTokens.colorError400),
            TokenSwatch(id: "colorError500", name: "colorError500", hex: NucleusColorTokens.colorError500),
            TokenSwatch(id: "colorError600", name: "colorError600", hex: NucleusColorTokens.colorError600),
            TokenSwatch(id: "colorError700", name: "colorError700", hex: NucleusColorTokens.colorError700),
            TokenSwatch(id: "colorError800", name: "colorError800", hex: NucleusColorTokens.colorError800),
            TokenSwatch(id: "colorError900", name: "colorError900", hex: NucleusColorTokens.colorError900),
        ]
    ),
    TokenGroup(
        id: "warning",
        name: "Warning",
        tokens: [
            TokenSwatch(id: "colorWarning100", name: "colorWarning100", hex: NucleusColorTokens.colorWarning100),
            TokenSwatch(id: "colorWarning200", name: "colorWarning200", hex: NucleusColorTokens.colorWarning200),
            TokenSwatch(id: "colorWarning300", name: "colorWarning300", hex: NucleusColorTokens.colorWarning300),
            TokenSwatch(id: "colorWarning400", name: "colorWarning400", hex: NucleusColorTokens.colorWarning400),
            TokenSwatch(id: "colorWarning500", name: "colorWarning500", hex: NucleusColorTokens.colorWarning500),
            TokenSwatch(id: "colorWarning600", name: "colorWarning600", hex: NucleusColorTokens.colorWarning600),
            TokenSwatch(id: "colorWarning700", name: "colorWarning700", hex: NucleusColorTokens.colorWarning700),
            TokenSwatch(id: "colorWarning800", name: "colorWarning800", hex: NucleusColorTokens.colorWarning800),
            TokenSwatch(id: "colorWarning900", name: "colorWarning900", hex: NucleusColorTokens.colorWarning900),
        ]
    ),
    TokenGroup(
        id: "success",
        name: "Success",
        tokens: [
            TokenSwatch(id: "colorSuccess100", name: "colorSuccess100", hex: NucleusColorTokens.colorSuccess100),
            TokenSwatch(id: "colorSuccess200", name: "colorSuccess200", hex: NucleusColorTokens.colorSuccess200),
            TokenSwatch(id: "colorSuccess300", name: "colorSuccess300", hex: NucleusColorTokens.colorSuccess300),
            TokenSwatch(id: "colorSuccess400", name: "colorSuccess400", hex: NucleusColorTokens.colorSuccess400),
            TokenSwatch(id: "colorSuccess500", name: "colorSuccess500", hex: NucleusColorTokens.colorSuccess500),
            TokenSwatch(id: "colorSuccess600", name: "colorSuccess600", hex: NucleusColorTokens.colorSuccess600),
            TokenSwatch(id: "colorSuccess700", name: "colorSuccess700", hex: NucleusColorTokens.colorSuccess700),
            TokenSwatch(id: "colorSuccess800", name: "colorSuccess800", hex: NucleusColorTokens.colorSuccess800),
            TokenSwatch(id: "colorSuccess900", name: "colorSuccess900", hex: NucleusColorTokens.colorSuccess900),
        ]
    ),
    TokenGroup(
        id: "info",
        name: "Info",
        tokens: [
            TokenSwatch(id: "colorInfo100", name: "colorInfo100", hex: NucleusColorTokens.colorInfo100),
            TokenSwatch(id: "colorInfo200", name: "colorInfo200", hex: NucleusColorTokens.colorInfo200),
            TokenSwatch(id: "colorInfo300", name: "colorInfo300", hex: NucleusColorTokens.colorInfo300),
            TokenSwatch(id: "colorInfo400", name: "colorInfo400", hex: NucleusColorTokens.colorInfo400),
            TokenSwatch(id: "colorInfo500", name: "colorInfo500", hex: NucleusColorTokens.colorInfo500),
            TokenSwatch(id: "colorInfo600", name: "colorInfo600", hex: NucleusColorTokens.colorInfo600),
            TokenSwatch(id: "colorInfo700", name: "colorInfo700", hex: NucleusColorTokens.colorInfo700),
            TokenSwatch(id: "colorInfo800", name: "colorInfo800", hex: NucleusColorTokens.colorInfo800),
            TokenSwatch(id: "colorInfo900", name: "colorInfo900", hex: NucleusColorTokens.colorInfo900),
        ]
    ),
]

#Preview {
    ContentView()
}
