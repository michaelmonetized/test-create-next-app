/**
 * Public app surface smoke tests.
 */
import { describe, expect, mock, test } from "bun:test";
import * as prefetchRoute from "@/app/api/prefetch-images/[...rest]/route";
import ComponentsIndexPage from "@/app/components/page";
import * as biomeLint from "@/scripts/biome-lint.mjs";
import * as devLocalhost from "@/scripts/dev-localhost.mjs";
import * as devLocalhostInfo from "@/scripts/dev-localhost-info.mjs";
import "@/scripts/docstring-coverage.mjs";

mock.module("next/font/google", () => ({
  Geist: () => ({ className: "font-geist", variable: "--font-geist" }),
  Geist_Mono: () => ({
    className: "font-geist-mono",
    variable: "--font-geist-mono",
  }),
  Source_Code_Pro: () => ({
    className: "font-source-code",
    variable: "--font-source-code",
  }),
  Source_Sans_3: () => ({
    className: "font-source-sans",
    variable: "--font-source-sans",
  }),
  Source_Serif_4: () => ({
    className: "font-source-serif",
    variable: "--font-source-serif",
  }),
}));

mock.module("next/image", () => ({
  default: "img",
}));

mock.module("next/link", () => ({
  default: "a",
}));

mock.module("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ prefetch: () => undefined, push: () => undefined }),
}));

describe("public app surface", () => {
  test("exports route metadata and app pages", async () => {
    const chatRoute = await import("@/app/api/chat/route");
    const billingPage = await import("@/app/billing/page");
    const cartPage = await import("@/app/cart/page");
    const checkoutPage = await import("@/app/checkout/page");
    const componentsPage = await import("@/app/components/components-page");
    const dashboardPage = await import("@/app/dashboard/page");
    const elementsPage = await import("@/app/elements/page");
    const errorPage = await import("@/app/error");
    const globalErrorPage = await import("@/app/global-error");
    const knowledgeBasePage = await import("@/app/knowledge-base/page");
    const layout = await import("@/app/layout");
    const manifest = await import("@/app/manifest");
    const notFoundPage = await import("@/app/not-found");
    const orderCompletePage = await import("@/app/order-complete/page");
    const orderHistoryPage = await import("@/app/order-history/page");
    const homePage = await import("@/app/page");
    const privacyPage = await import("@/app/privacy/page");
    const profilePage = await import("@/app/profile/page");
    const robots = await import("@/app/robots");
    const tailwindCssPage = await import("@/app/tailwindcss/page");
    const tailwindCssSsrPage = await import("@/app/tailwindcss-ssr/page");
    const termsPage = await import("@/app/terms/page");
    const uiKitPage = await import("@/app/ui-kit/page");
    const openRouterChat = await import("@/lib/openrouter-chat");

    expect(chatRoute.maxDuration).toBe(60);
    expect(chatRoute.POST).toBe(openRouterChat.handleAccessibilityChatPost);
    expect(layout.metadata).toBeDefined();
    expect(privacyPage.metadata).toBeDefined();
    expect(termsPage.metadata).toBeDefined();
    expect(manifest.default()).toMatchObject({ name: expect.any(String) });
    expect(prefetchRoute.dynamic).toBe("force-static");
    expect(typeof prefetchRoute.GET).toBe("function");
    expect(robots.default()).toBeDefined();

    const pages = [
      billingPage.default,
      cartPage.default,
      checkoutPage.default,
      componentsPage.default,
      ComponentsIndexPage,
      dashboardPage.default,
      elementsPage.default,
      errorPage.default,
      globalErrorPage.default,
      knowledgeBasePage.default,
      layout.default,
      notFoundPage.default,
      orderCompletePage.default,
      orderHistoryPage.default,
      homePage.default,
      privacyPage.default,
      profilePage.default,
      tailwindCssPage.default,
      tailwindCssSsrPage.default,
      termsPage.default,
      uiKitPage.default,
    ];

    expect(pages.every((page) => typeof page === "function")).toBe(true);
  });

  test("exports shared component and library surfaces", async () => {
    const accessibility = await import("@/components/accessibility");
    const backToTop = await import("@/components/accessibility/back-to-top");
    const indicator = await import("@/components/accessibility/indicator");
    const colorScheme = await import("@/components/color-scheme");
    const dateYearInline = await import("@/components/date-year-inline");
    const link = await import("@/components/link");
    const logo = await import("@/components/logo");
    const ctaSection = await import("@/components/marketing/cta-section");
    const hero = await import("@/components/marketing/hero");
    const heroSlider = await import("@/components/marketing/hero-slider");
    const liveChat = await import("@/components/marketing/live-chat");
    const logoCarousel = await import("@/components/marketing/logo-carousel");
    const pricingTable = await import("@/components/marketing/pricing-table");
    const productGrid = await import("@/components/marketing/product-grid");
    const serviceGrid = await import("@/components/marketing/service-grid");
    const sinkDemos = await import("@/components/sink-demos");
    const tokenMatrix = await import("@/components/tailwindcss/token-matrix");
    const useMobile = await import("@/hooks/use-mobile");
    const prompt = await import("@/lib/accessibility-chat-system-prompt");
    const resolveModel = await import("@/lib/openrouter-resolve-model");
    const projectModule = await import("@/project");

    const components = [
      accessibility.default,
      backToTop.default,
      indicator.default,
      colorScheme.default,
      dateYearInline.default,
      link.default,
      logo.default,
      ctaSection.default,
      hero.default,
      heroSlider.default,
      liveChat.default,
      logoCarousel.default,
      pricingTable.default,
      productGrid.default,
      serviceGrid.default,
      sinkDemos.SinkDemosCanvas,
      sinkDemos.SinkDemosDialog,
      tokenMatrix.TailwindTokenMatrix,
    ];

    expect(components.every((component) => component != null)).toBe(true);
    expect(typeof useMobile.useIsMobile).toBe("function");
    expect(prompt.ACCESSIBILITY_CHAT_SYSTEM_PROMPT).toContain("accessibility");
    expect(typeof resolveModel.resolveOpenRouterModelId).toBe("function");
    expect(projectModule.project).toMatchObject({ title: expect.any(String) });
    expect(biomeLint.buildBiomeArgs(["--fix"])).toEqual([
      "check",
      ".",
      "--write",
    ]);
    expect(typeof biomeLint.runBiomeLint).toBe("function");
    expect(typeof devLocalhost.main).toBe("function");
    expect(
      devLocalhostInfo.getDevLocalhostInfo("/tmp/example-app"),
    ).toMatchObject({
      host: "example-app.localhost",
    });
  });
});
