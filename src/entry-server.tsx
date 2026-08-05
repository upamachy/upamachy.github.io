import { renderToString } from "react-dom/server"
import App from "./App.tsx"
import { structuredData } from "./data/seo.ts"

export function render() {
  return {
    html: renderToString(<App />),
    jsonLd: JSON.stringify(structuredData()),
  }
}
