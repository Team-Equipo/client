// FormattedWebView.js
import React, { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { WebView } from "react-native-webview";

const FormattedWebView = ({ endpoint, searchedWord }) => {
  const [siteLoading, setSiteLoading] = useState(false);

  return (
    <View
      style={{
        overflow: "hidden",
        width: useWindowDimensions().width * 0.9,
        flex: 1,
      }}
    >
      {/* Loading indicator */}
      {siteLoading ? (
        <View style={{ height: "100%", justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      ) : null}

      {/* Wordreference page */}
      <WebView
        originWhitelist={["*"]}
        source={{ uri: endpoint + searchedWord }}
        style={{ borderRadius: 15, marginTop: -175 }}
        containerStyle={{ borderRadius: 15 }}
        onLoadStart={() => setSiteLoading(true)}
        onLoadProgress={() => setSiteLoading(false)}
      />
    </View>
  );
};

export default FormattedWebView;
