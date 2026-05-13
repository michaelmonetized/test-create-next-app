/**
 * Shared sections for the HTML elements kitchen sink page.
 */
import Image from "next/image";

const tableOfContents = [
  ["Introduction", "top"],
  ["Colors", "color-pallet"],
  ["Headings", "headings"],
  ["Sections", "sections"],
  ["Grouping", "grouping"],
  ["Phrasing", "phrasing"],
  ["Forms", "forms"],
  ["Tables", "tables"],
  ["Embeds", "embeds"],
  ["Interactive", "interactive"],
  ["Credits", "bottom"],
];

const accentColors = [
  "Rosewater",
  "Flamingo",
  "Pink",
  "Mauve",
  "Red",
  "Maroon",
  "Peach",
  "Yellow",
  "Green",
  "Teal",
  "Sky",
  "Sapphire",
  "Blue",
  "Lavender",
];

const textColors = ["Text", "Subtext-1", "Subtext-0"];

const surfaceColors = [
  "Overlay-2",
  "Overlay-1",
  "Overlay-0",
  "Surface-2",
  "Surface-1",
  "Surface-0",
  "Core",
  "Mantle",
  "Crust",
];

const goldenRatioScaleRows = [
  ["--text-xs", "core ÷ φ²", "~8px"],
  ["--text-sm", "core ÷ φ", "~13px"],
  ["--text-core", "1×", "~21px"],
  ["--text-md", "core × φ", "~34px"],
  ["--text-lg", "core × φ²", "~55px"],
];

const revenueRows = [
  ["Net sales", "$32,479", "$38,154", "$45,598"],
  ["Cost of sales", "$21,334", "$24,852", "$28,717"],
];

const languageRows = [
  ["No", "Nej", "Nee", "Non", "No"],
  ["Yes", "Ja", "Ja", "Oui", "Sí"],
  ["Bear", "Björn", "Beer", "Ours", "Oso"],
];

function colorClassName(label: string) {
  return `bg-${label.toLowerCase()}`;
}

function ColorSwatchGrid({
  labels,
  className,
}: {
  labels: string[];
  className: string;
}) {
  return (
    <div className={className}>
      {labels.map((label) => (
        <a key={label} href="#" className={colorClassName(label)}>
          {label}
        </a>
      ))}
    </div>
  );
}

function TextCells({ values }: { values: string[] }) {
  return values.map((value) => <td key={value}>{value}</td>);
}

function LabeledTableRow({ cells }: { cells: string[] }) {
  const [label, ...values] = cells;

  return (
    <tr>
      <th scope="row">{label}</th>
      <TextCells values={values} />
    </tr>
  );
}

/** Renders the page title and table of contents for the HTML elements page. */
export function ElementsHeader() {
  return (
    <header id="top" className="shrink">
      <h1>
        <span id="page-title">Completely WCAG Compliant HTML Kitchen Sink</span>
        <a href="#table-of-contents" className="sr-nav-link">
          Skip to Table of Contents.
        </a>
      </h1>
      <p>A WCAG-compliant reference of every HTML5 element.</p>
      <aside aria-labelledby="#table-of-contents">
        <h2 id="table-of-contents">
          Table of Contents
          <a href="#color-pallet" className="sr-nav-link">
            Skip to Color Pallet.
          </a>
          <a href="#top" className="sr-nav-link">
            Back to top.
          </a>
        </h2>

        <nav>
          <ul>
            {tableOfContents.map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </header>
  );
}

/** Renders the Catppuccin-inspired color palette reference section. */
export function ColorPaletteSection() {
  return (
    <section id="color-pallet" aria-labelledby="color-pallet-title" className="flex flex-col gap-md">
      <h2>
        <span id="color-pallet-title">Color Pallet</span>
        <a href="#headings" className="sr-nav-link">
          Skip to next section: {`"Headings"`}.
        </a>
        <a href="#table-of-contents" className="sr-nav-link">
          back to Table of Contents.
        </a>
      </h2>
      <div className="flex flex-col gap-1 text-center">
        <ColorSwatchGrid
          labels={accentColors}
          className="grid *:text-background grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-7 *:aspect-square *:object-cover *:place-content-center *:place-items-center *:rounded-md *:border-border/60 *:border-2"
        />
        <ColorSwatchGrid
          labels={textColors}
          className="grid *:text-background grid-cols-2 gap-1 md:grid-cols-3 *:aspect-square *:object-cover *:place-content-center *:place-items-center *:rounded-md *:border-border/60 *:border-2"
        />
        <ColorSwatchGrid
          labels={surfaceColors}
          className="grid grid-cols-2 gap-1 md:grid-cols-3 *:aspect-square *:object-cover *:place-content-center *:place-items-center *:rounded-md *:border-border/60 *:border-2"
        />
      </div>
    </section>
  );
}

/** Renders the heading hierarchy examples and guidance. */
export function HeadingsSection() {
  return (
    <section id="headings" aria-labelledby="headings-title">
      <h2>
        <span id="headings-title">Headings</span>
        <a href="#sections" className="sr-nav-link">
          Skip to next section: {`"Sectioning Content"`}.
        </a>
        <a href="#color-pallet" className="sr-nav-link">
          back to Color Pallet.
        </a>
      </h2>
      <p>
        Elements
        <code>h1</code>
        through
        <code>h6</code>
        form the heading content category. Each level carries semantic weight —<code>h1</code>
        is the page title,
        <code>h2</code>
        marks major sections, and so on down. Skipping levels (e.g.
        <code>h2</code>→<code>h4</code>) breaks the document outline and harms assistive
        technology navigation.
      </p>

      <p className="h1">
        <code>&lt;h1 /&gt;</code>
        The quick brown fox jumps over the lazy dog
      </p>
      <p className="h2">
        <code>&lt;h2 /&gt;</code>
        Pack my box with five dozen liquor jugs
      </p>
      <p className="h3">
        <code>&lt;h3 /&gt;</code>
        Jaunty zinnias vie with flaunting phlox
      </p>
      <p className="h4">
        <code>&lt;h4 /&gt;</code>
        Five or six big jet planes zoomed quickly by the tower
      </p>
      <p className="h5">
        <code>&lt;h5 /&gt;</code>
        Expect skilled signwriters to use many jazzy alphabets
      </p>
      <p className="h6">
        <code>&lt;h6 /&gt;</code>
        How vexingly quick daft zebras jump
      </p>

      <p>
        The heading demonstrations above are shown in descending order for visual reference only. In
        a real document, heading levels must reflect the content hierarchy, not the desired font
        size.
      </p>
    </section>
  );
}

/** Renders sectioning-content examples for landmarks and article structure. */
export function SectioningContentSection() {
  return (
    <section id="sections" aria-labelledby="sections-title">
      <h2>
        <span id="sections-title">Sectioning Content</span>
        <a href="#grouping" className="sr-nav-link">
          Skip to next section: {`"Grouping Content"`}.
        </a>
        <a href="#table-of-contents" className="sr-nav-link">
          back to previous section: {`"Headings"`}.
        </a>
      </h2>
      <p>
        The elements
        <code>article</code>,<code>aside</code>,<code>nav</code>, and
        <code>section</code>
        create distinct regions in the document outline. Each can contain its own heading hierarchy.
      </p>

      <nav aria-label="Sample navigation">
        <h3>Navigation</h3>
        <p>
          A<code>nav</code>
          element with a list of links, as you might find in a site header or sidebar:
        </p>
        <ul>
          {["Home", "About", "Services", "Contact"].map((label) => (
            <li key={label}>
              <a href="#">{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <article>
        <h3>Article</h3>
        <p>
          An
          <code>article</code>
          represents a self-contained composition — a blog post, a news story, a forum thread. This
          paragraph is nested inside one. It contains many different, sometimes useful,
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML elements</a>. Of course
          there are classics like
          <em>emphasis</em>,<strong>strong importance</strong>, and
          <small>small print</small>, but there are many others as well.
        </p>
        <section>
          <h4>Article subsection</h4>
          <p>
            This paragraph lives inside a<code>section</code>
            within the parent
            <code>article</code>. Nesting sections like this is valid and useful for long-form
            content with internal structure.
          </p>
          <p>
            ↓ The following paragraph has the
            <code>hidden</code>
            attribute and should not be displayed. ↓
          </p>
          <p hidden>→ You should not see this paragraph. ←</p>
          <p>↑ The previous paragraph should not be displayed. ↑</p>
        </section>
      </article>

      <aside>
        <h3>Aside</h3>
        <p>
          An
          <code>aside</code>
          holds content tangentially related to its surrounding context — a pull quote, a sidebar, a
          related-links panel. Screen readers can jump directly to it via landmark navigation.
        </p>
      </aside>
    </section>
  );
}

/** Renders grouping-content examples for lists, quotes, preformatted text, and figures. */
export function GroupingContentSection() {
  return (
    <section id="grouping" aria-labelledby="grouping-title">
      <h2>
        <span id="grouping-title">Grouping Content</span>
        <a href="#grouping" className="sr-nav-link">
          Skip to next section: {`"Phrasing Content"`}.
        </a>
        <a href="#sections" className="sr-nav-link">
          back to previous section: {`"Sectioning Content"`}.
        </a>
      </h2>
      <p>
        Block-level elements that group runs of text or other content together: paragraphs, lists,
        blockquotes, preformatted text, figures, and more.
      </p>

      <h3>Blockquote</h3>
      <blockquote>
        <p>I quickly explained that many big jobs involve few hazards.</p>
      </blockquote>
      <blockquote cite="https://en.wikipedia.org/wiki/Steve_Jobs">
        <p>
          People think focus means saying yes to the thing you&apos;ve got to focus on. But
          that&apos;s not what it means at all. It means saying no to the hundred other good ideas
          that there are. You have to pick carefully.
        </p>
        <footer>
          — Steve Jobs,
          <cite>Apple WWDC, 1997</cite>
        </footer>
      </blockquote>

      <h3>Lists</h3>
      <h4>Unordered list</h4>
      <ul>
        <li>
          List item one
          <ul>
            <li>
              Nested item
              <ul>
                <li>Level three, item one</li>
                <li>Level three, item two</li>
              </ul>
            </li>
            <li>Nested item two</li>
          </ul>
        </li>
        <li>List item two</li>
        <li>List item three</li>
      </ul>

      <h4>Ordered list</h4>
      <ol>
        <li>
          First item
          <ol>
            <li>
              Sub-item one
              <ol>
                <li>Deep item one</li>
                <li>Deep item two</li>
              </ol>
            </li>
            <li>Sub-item two</li>
          </ol>
        </li>
        <li>Second item</li>
        <li>Third item</li>
      </ol>

      <h4>Description list</h4>
      <dl>
        <dt>Golden ratio</dt>
        <dd>
          An irrational number approximately equal to
          <span className="phi-expand">1.618</span>, often denoted by the Greek letter phi (φ).
        </dd>
        <dt>Fibonacci sequence</dt>
        <dd>
          A sequence where each number is the sum of the two preceding ones. The ratio of
          consecutive terms converges to φ.
        </dd>
        <dt>Kitchen sink</dt>
        <dd>A document containing every conceivable element, used for testing styles.</dd>
      </dl>

      <h3>Preformatted text</h3>
      <pre>{`:root {
  --gwx: calc(((1 + sqrt(5)) / 2) - 1);
  --gnx: calc(1 - var(--gwx));
  --swx: calc(1 + var(--gwx));
}`}</pre>

      <pre>
        <samp>
          $ <kbd>node -e &ldquo;console.log((1 + Math.sqrt(5)) / 2)&rdquo;</kbd>
          1.618033988749895
        </samp>
      </pre>
      <h3>Figure</h3>
      <figure>
        <Image
          src="https://placecats.com/200/124"
          alt="A kitten in golden ratio aspect"
          width={200}
          height={124}
        />
        <figcaption>Figure 1: A 200×124 image — approximately φ:1 aspect ratio.</figcaption>
      </figure>

      <h3>Horizontal rule</h3>
      <p>A thematic break between paragraphs:</p>
      <hr />
      <p>The content continues after the break above.</p>

      <h3>Address</h3>
      <address>
        1 Infinite Loop
        <br />
        Cupertino, CA 95014
        <br />
        United States
      </address>
    </section>
  );
}

/** Renders accessible tabular-data examples. */
export function TablesSection() {
  return (
    <section id="tables" aria-labelledby="tables-title">
      <h2>
        <span id="tables-title">Tables</span>
        <a href="#embeds" className="sr-nav-link">
          Skip to next section: Embeds.
        </a>
        <a href="#forms" className="sr-nav-link">
          back to previous section:Forms.
        </a>
      </h2>
      <p>
        Tables are for tabular data — not layout. Proper use of <code>thead</code>,{" "}
        <code>tbody</code>, <code>tfoot</code>, <code>th</code> with <code>scope</code>, and{" "}
        <code>caption</code> makes tables accessible to screen readers.
      </p>

      <h3>Simple table</h3>
      <table>
        <caption>Golden ratio scale at 21px core</caption>
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Scale</th>
            <th scope="col">~Value</th>
          </tr>
        </thead>
        <tbody>
          {goldenRatioScaleRows.map(([token, scale, value]) => (
            <tr key={token}>
              <td>
                <code>{token}</code>
              </td>
              <td>{scale}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Complex table</h3>
      <p id="characteristics-summary">
        In this table, negative traits appear on the left and positive traits on the right.
      </p>
      <table aria-describedby="characteristics-summary">
        <caption>Characteristics with positive and negative sides</caption>
        <thead>
          <tr>
            <th scope="col" id="neg">
              Negative
            </th>
            <th scope="col">Characteristic</th>
            <th scope="col" id="pos">
              Positive
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td headers="neg">Sad</td>
            <th scope="row">Mood</th>
            <td headers="pos">Happy</td>
          </tr>
          <tr>
            <td headers="neg">Failing</td>
            <th scope="row">Grade</th>
            <td headers="pos">Passing</td>
          </tr>
        </tbody>
      </table>

      <h3>Table with multiple sections</h3>
      <table>
        <caption>
          Revenue summary with
          <code>thead</code>,<code>tbody</code>, and
          <code>tfoot</code>
        </caption>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">2024</th>
            <th scope="col">2025</th>
            <th scope="col">2026</th>
          </tr>
        </thead>
        <tbody>
          {revenueRows.map((cells) => (
            <LabeledTableRow key={cells[0]} cells={cells} />
          ))}
        </tbody>
        <tbody>
          <tr>
            <th scope="row">Gross margin</th>
            <td>$11,145</td>
            <td>$13,302</td>
            <td>$16,881</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Margin %</th>
            <td>34.3%</td>
            <td>34.9%</td>
            <td>37.0%</td>
          </tr>
        </tfoot>
      </table>

      <h3>Table with colgroup</h3>
      <table>
        <caption>Proto-Indo-European language family sample</caption>
        <colgroup span={1}></colgroup>
        <colgroup span={2}></colgroup>
        <colgroup span={2}></colgroup>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="colgroup" colSpan={2}>
              Germanic
            </th>
            <th scope="colgroup" colSpan={2}>
              Romance
            </th>
          </tr>
          <tr>
            <th scope="col">English</th>
            <th scope="col">Swedish</th>
            <th scope="col">Dutch</th>
            <th scope="col">French</th>
            <th scope="col">Spanish</th>
          </tr>
        </thead>
        <tbody>
          {languageRows.map((cells) => (
            <LabeledTableRow key={cells[0]} cells={cells} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
