/**
 * Embedded media and interactive sections for the HTML elements kitchen sink page.
 */
import Image from "next/image";
import { SinkDemosCanvas, SinkDemosDialog } from "@/components/sink-demos";

/** Renders embedded-content examples for image, media, iframe, SVG, MathML, and canvas. */
export function EmbeddedContentSection() {
  return (
    <section id="embeds" aria-labelledby="embeds-title">
      <h2>
        <span id="embeds-title">Embedded Content</span>
        <a href="#interactive" className="sr-nav-link">
          Skip to next section: {`"Interactive"`}.
        </a>
        <a href="#tables" className="sr-nav-link">
          back to previous section: {`"Tables"`}.
        </a>
      </h2>
      <p>Elements that embed external resources: images, audio, video, iframes, SVG, MathML, and canvas.</p>

      <h3>Image</h3>
      <p>
        <Image
          src="https://placecats.com/150/150"
          alt="A 150 by 150 pixel photo of a kitten"
          width={150}
          height={150}
        />
      </p>

      <h3>Picture with responsive sources</h3>
      <picture>
        <source srcSet="https://placecats.com/240/148 2x,https://placecats.com/120/74  1x" />
        <Image
          src="https://placecats.com/120/74"
          alt="A kitten at golden ratio aspect"
          width={120}
          height={74}
        />
      </picture>

      <h3>Audio</h3>
      <audio controls preload="none">
        <source
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/What_hath_God_wrought.ogg"
          type="audio/ogg"
        />
        <p>
          Your browser does not support the audio element.
          <a href="https://upload.wikimedia.org/wikipedia/commons/c/c7/What_hath_God_wrought.ogg">
            Download the audio
          </a>
          .
        </p>
      </audio>

      <h3>Video</h3>
      <iframe
        loading="lazy"
        sandbox=""
        className="aspect-video object-cover bg-black w-2xl"
        title="Sample embedded document"
        srcDoc={`<html><head><style>*{margin:0; padding:0; width:100%; aspect-ratio: 16/9; object-fit: cover; background:black; overflow: hidden;}</style></head><body><video controls width={320} preload="none">
            <source src="/video.mp4" type="video/mp4" />
            <p>
              Your browser does not support the video element.
              <a href="/video.mp4">Download the video</a>.
            </p>
          </video></body></html>`}
      ></iframe>

      <h3>Iframe</h3>
      <iframe
        title="Sample embedded document"
        srcDoc="<p style='font-family:system-ui;padding:1em'>This is an embedded document inside an <code>iframe</code>.</p>"
        width="100%"
        height={80}
      ></iframe>

      <h3>SVG</h3>
      <svg
        role="img"
        aria-labelledby="svg-title"
        width={200}
        height={124}
        viewBox="0 0 200 124"
      >
        <rect
          x={0}
          y={0}
          width={200}
          height={124}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />
        <line
          x1={124}
          y1={0}
          x2={124}
          y2={124}
          stroke="currentColor"
          strokeWidth={0.5}
          strokeDasharray="4 2"
        />
        <line
          x1={124}
          y1={47}
          x2={200}
          y2={47}
          stroke="currentColor"
          strokeWidth={0.5}
          strokeDasharray="4 2"
        />
        <text x={50} y={65} fontSize={11} fill="currentColor" textAnchor="middle" fontFamily="system-ui">
          φ
        </text>
        <text x={155} y={25} fontSize={9} fill="currentColor" textAnchor="middle" fontFamily="system-ui">
          1−1/φ
        </text>
      </svg>

      <h3>MathML</h3>
      <math display="block" aria-label="phi equals one plus square root of five, all divided by two">
        <mrow>
          <mi>φ</mi>
          <mo>=</mo>
          <mfrac>
            <mrow>
              <mn>1</mn>
              <mo>+</mo>
              <msqrt>
                <mn>5</mn>
              </msqrt>
            </mrow>
            <mn>2</mn>
          </mfrac>
        </mrow>
      </math>

      <h3>Canvas</h3>
      <SinkDemosCanvas />
    </section>
  );
}

/** Renders interactive disclosure examples. */
export function InteractiveElementsSection() {
  return (
    <section id="interactive" aria-labelledby="interactive-title">
      <h2>
        <span id="interactive-title">Interactive Elements</span>
        <a href="#footer" className="sr-nav-link">
          Skip to the last section: {`"Footer"`}.
        </a>
        <a href="#embeds" className="sr-nav-link">
          back to previous section: {`"Embeds"`}.
        </a>
      </h2>
      <p>Elements that provide interactive disclosure or summarization.</p>

      <h3>Details and summary</h3>
      <details>
        <summary>What is the golden ratio?</summary>
        <p>
          The golden ratio (φ) is an irrational number equal to
          <code>(1 + √5) / 2</code>, approximately 1.6180339887. It appears in geometry, art,
          architecture, and nature. Two quantities are in the golden ratio if their ratio equals the
          ratio of their sum to the larger quantity.
        </p>
      </details>
      <details>
        <summary>Why use it in CSS?</summary>
        <p>
          Proportions derived from φ create visual harmony without arbitrary magic numbers. A type
          scale, spacing system, and layout grid all derived from the same irrational constant
          produce inherently cohesive designs.
        </p>
      </details>
      <details open>
        <summary>File transfer progress (open by default)</summary>
        <dl>
          <dt>Transfer rate</dt>
          <dd>452 KB/s</dd>
          <dt>Elapsed</dt>
          <dd>01:16:27</dd>
          <dt>Progress</dt>
          <dd>
            <progress max={375505392} value={97543282}></progress>
            26%
          </dd>
        </dl>
      </details>
      <SinkDemosDialog />
    </section>
  );
}
