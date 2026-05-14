/**
 * Components Link public module surface.
 */
"use client";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

type PrefetchImage = {
  srcset: string;
  sizes: string;
  src: string;
  alt: string;
  loading: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function prefetchImages(href: string) {
  if (!href.startsWith("/") || href.startsWith("/order") || href === "/") {
    return [];
  }
  const url = new URL(href, window.location.href);
  const imageResponse = await fetch(`/api/prefetch-images${url.pathname}`, {
    priority: "low",
  });
  const { images } = await imageResponse.json();
  return images as PrefetchImage[];
}

const seen = new Set<string>();
const imageCache = new Map<string, PrefetchImage[]>();

// Helper function to check if a URL is external
function isExternalUrl(href: string): boolean {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_HOST;
    if (!baseUrl) {
      // If no environment variable is set, assume relative URLs are internal
      return (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//")
      );
    }
    const url = new URL(href, baseUrl);
    const baseOrigin = new URL(baseUrl).origin;
    return url.origin !== baseOrigin;
  } catch {
    return false;
  }
}

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function shouldInterceptNavigation(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  isExternal: boolean,
) {
  if (event.defaultPrevented || isExternal) return false;
  if (event.button !== 0) return false;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
    return false;

  const url = new URL(href, window.location.href);
  return url.origin === window.location.origin;
}

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof NextLink>
>(({ children, ...props }, forwardedRef) => {
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  let prefetchTimeout: NodeJS.Timeout | null = null;

  // Determine if this is an external link
  const href = String(props.href);
  const isExternal = isExternalUrl(href);

  // Prepare props with security attributes for external links
  const linkProps = {
    ...props,
    ...(isExternal &&
      props.target === "_blank" && {
        rel: "noopener noreferrer",
      }),
  };

  const handleRef = React.useCallback(
    (node: HTMLAnchorElement | null) => {
      linkRef.current = node;
      assignRef(forwardedRef, node);
    },
    [forwardedRef],
  );

  React.useEffect(() => {
    if (props.prefetch === false) return;

    const linkElement = linkRef.current;
    if (!linkElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          prefetchTimeout = setTimeout(async () => {
            router.prefetch(String(props.href));
            await sleep(0);

            if (!imageCache.has(String(props.href))) {
              void prefetchImages(String(props.href)).then((images) => {
                imageCache.set(String(props.href), images);
              });
            }

            observer.unobserve(entry.target);
          }, 300);
        } else if (prefetchTimeout) {
          clearTimeout(prefetchTimeout);
          prefetchTimeout = null;
        }
      },
      { rootMargin: "0px", threshold: 0.1 },
    );

    observer.observe(linkElement);

    return () => {
      observer.disconnect();
      if (prefetchTimeout) {
        clearTimeout(prefetchTimeout);
      }
    };
  }, [props.href, props.prefetch, router.prefetch, prefetchTimeout]);

  return (
    <NextLink
      ref={handleRef}
      prefetch={false}
      onMouseEnter={(e) => {
        props.onMouseEnter?.(e);
        router.prefetch(href);
        const images = imageCache.get(href) || [];
        for (const image of images) {
          prefetchImage(image);
        }
      }}
      onMouseDown={(e) => {
        props.onMouseDown?.(e);
        if (shouldInterceptNavigation(e, href, isExternal)) {
          e.preventDefault();
          router.push(href);
        }
      }}
      {...linkProps}
    >
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";

function prefetchImage(image: PrefetchImage) {
  if (image.loading === "lazy" || seen.has(image.srcset)) {
    return;
  }
  const img = new Image();
  img.decoding = "async";
  img.fetchPriority = "low";
  img.sizes = image.sizes;
  seen.add(image.srcset);
  img.srcset = image.srcset;
  img.src = image.src;
  img.alt = image.alt;
}

export default Link;
