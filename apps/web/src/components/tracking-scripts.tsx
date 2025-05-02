import Script from "next/script";

export default function TrackingScripts() {
  return (
    <>
      <Script
        defer
        src="https://analytics.tbdh.dev/script.js"
        data-website-id="67f0901b-457d-40b6-965a-1cba66957743"
      />
    </>
  );
}
