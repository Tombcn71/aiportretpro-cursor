"use client";

import { Component } from "react";
import { Crisp } from "crisp-sdk-web";

class CrispChat extends Component {
  componentDidMount() {
    // Delay Crisp chat loading by 4 seconds to improve LCP
    setTimeout(() => {
      Crisp.configure("9bdd6a78-a819.99-4220-bfe4-5ad9336aca6b");
    }, 4000);
  }

  render() {
    return null;
  }
}

export default CrispChat;
