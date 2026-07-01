"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const DISMISS_KEY = "tgbeamLayloPopupDismissedAt";
const SHOW_DELAY_MS = 2000;
// Re-show the popup this long after it was last dismissed (7 days).
const DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// Compact single-form embed (minimal=true). We supply our own headline/copy above it.
const LAYLO_EMBED_URL =
  "https://embed.laylo.com?dropId=vfSjK&color=6d6a5c&minimal=true&theme=light";
// Public Laylo profile used as a fallback if the embedded iframe fails to load.
const LAYLO_FALLBACK_URL = "https://laylo.com/tgbeam";
// If the iframe hasn't loaded within this window, assume it failed and show a fallback.
const IFRAME_LOAD_TIMEOUT_MS = 6000;

export default function LayloPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const iframeLoaded = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY));
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_TTL_MS) return;

    const timer = window.setTimeout(() => setIsVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Once visible, guard against a silently blank/broken iframe.
  useEffect(() => {
    if (!isVisible) return;
    const timer = window.setTimeout(() => {
      if (!iframeLoaded.current) setIframeFailed(true);
    }, IFRAME_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [isVisible]);

  const dismiss = () => {
    setIsVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // Ignore storage errors (e.g. private browsing); popup just won't persist.
    }
  };

  return (
    <>
      {isVisible && (
        <div
          className="laylo-popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Sign up for updates"
          onClick={dismiss}
        >
          <div
            className="laylo-popup-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="laylo-popup-close"
            >
              Close
            </button>

            <h2 className="laylo-popup-title">SIGN UP FOR UPDATES</h2>
            <p className="laylo-popup-copy">
              Sign up for updates and receive a discount code for the exclusive
              TGBEAM merch capsule designed by Leeann Huang.
            </p>

            {iframeFailed ? (
              <div style={{ textAlign: "center" }}>
                <a
                  href={LAYLO_FALLBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="laylo-fallback-button"
                >
                  Sign up on Laylo
                </a>
              </div>
            ) : (
              <>
                <iframe
                  id="laylo-drop-vfSjK"
                  title="Sign up for TGBEAM updates"
                  frameBorder="0"
                  scrolling="no"
                  allow="web-share"
                  className="laylo-iframe"
                  src={LAYLO_EMBED_URL}
                  onLoad={() => {
                    iframeLoaded.current = true;
                  }}
                  onError={() => setIframeFailed(true)}
                  {...{ allowtransparency: "true" }}
                />
                {/* Load the SDK AFTER the iframe exists so Laylo can initialize/resize it. */}
                <Script
                  src="https://embed.laylo.com/laylo-sdk.js"
                  strategy="afterInteractive"
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
