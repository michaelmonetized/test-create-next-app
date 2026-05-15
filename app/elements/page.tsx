/**
 * App Elements Page public module surface.
 */
import { FormsSection } from "@/app/elements/forms-section";
import { EmbeddedContentSection, InteractiveElementsSection } from "@/app/elements/media-sections";
import {
  ColorPaletteSection,
  ElementsHeader,
  GroupingContentSection,
  HeadingsSection,
  SectioningContentSection,
  TablesSection,
} from "@/app/elements/elements-shell";
import Layout from "@/components/ui/layout";

export default function Home() {
  return (
    <Layout variant="default" className="*:p-md *:w-full">
      <ElementsHeader />
      <main
        id="main"
        className="flex flex-col gap-md grow place-items-stretch place-content-stretch *:w-full"
      >
        <ColorPaletteSection />

        <hr />

        <HeadingsSection />

        <hr />

        <SectioningContentSection />

        <hr />

        <GroupingContentSection />

        <hr />

        <section id="phrasing" aria-labelledby="phrasing-title">
          <h2>
            <span id="phrasing-title">Phrasing Content</span>
            <a href="#forms" className="sr-nav-link">
              Skip to next section: {`"Forms"`}.
            </a>
            <a href="#grouping" className="sr-nav-link">
              back to previous section: {`"Grouping Content"`}.
            </a>
          </h2>
          <p>Inline elements that mark up runs of text within block-level containers.</p>

          <h3>Emphasis and importance</h3>
          <p>
            <code>em</code>
            is used for
            <em>emphasis</em>
            and usually renders as italics. Contrast with
            <code>i</code>, which offsets text for an alternate voice or mood:
            <i>E. coli</i>
            can be dangerous.
          </p>
          <p>
            <code>strong</code>
            conveys
            <strong>importance or urgency</strong>. Contrast with
            <code>b</code>, which draws
            <b>visual attention</b>
            without implying semantic weight.
          </p>

          <h3>Edits and annotations</h3>
          <p>
            <code>del</code>
            marks
            <del dateTime="2026-03-15">removed</del>
            text.
            <code>ins</code>
            marks
            <ins dateTime="2026-03-15">inserted</ins>
            text.
            <code>s</code>
            marks text that is no longer accurate:
            <s>Windows XP version available.</s>
          </p>
          <p>
            <code>mark</code>
            is the HTML equivalent of a<mark>yellow highlighter</mark>.<code>u</code>
            underlines without semantic meaning:
            <u>underlined text</u>.
          </p>

          <h3>Abbreviations and definitions</h3>
          <p>
            <code>abbr</code>: Some vehicles meet the
            <abbr title="Super Ultra Low Emission Vehicle">SULEV</abbr>
            standard.
          </p>
          <p>
            <code>dfn</code>: Foreign phrases add a certain
            <dfn lang="fr" title="French: indefinable quality">
              je ne sais quoi
            </dfn>
            {"to one's writing."}
          </p>

          <h3>Citations and quotations</h3>
          <p>
            <code>cite</code>: In the words of
            <cite>Charles Bukowski</cite>—
            <q>
              An intellectual says a simple thing in a hard way. An artist says a hard thing in a
              simple way.
            </q>
          </p>
          <p>
            <code>q</code>: The {"W3C's"} mission is
            <q cite="https://www.w3.org/Consortium/">
              to lead the World Wide Web to its full potential by developing protocols and
              guidelines that ensure long-term growth for the Web
            </q>
            .
          </p>

          <h3>Code, keyboard, and sample output</h3>
          <p>
            <code>code</code>: The
            <code>calc()</code>
            function performs arithmetic in CSS.
          </p>
          <p>
            <code>kbd</code>: Press
            <kbd>
              <kbd>Ctrl</kbd>+<kbd>R</kbd>
            </kbd>
            to redo in Vim. Just kidding — {"it's"}
            <kbd>
              <kbd>Ctrl</kbd>+<kbd>R</kbd>
            </kbd>
            everywhere else too.
          </p>
          <p>
            <code>samp</code>: The console returned
            <samp>1.618033988749895</samp>.
          </p>
          <p>
            <code>var</code>: To log in, type
            <kbd>
              ssh
              <var>user</var>
              @example.com
            </kbd>
            , where
            <var>user</var>
            is your username.
          </p>

          <h3>Data and time</h3>
          <p>
            <code>data</code>: The meeting is at
            <data value="2026-03-15T17:00-04:00">5 P.M.</data>
            Eastern.
          </p>
          <p>
            <code>time</code>: The golden ratio was studied as early as
            <time dateTime="-0300">300 BC</time>
            by Euclid.
          </p>

          <h3>Bidirectional and line-break control</h3>
          <p>
            <code>bdi</code>: Some names read right to left:
            <bdi lang="ar">مرحبا</bdi>.
          </p>
          <p>
            <code>bdo</code>:<bdo dir="rtl">This sentence has been reversed.</bdo>
          </p>
          <p>
            <code>wbr</code>: A very long word like super
            <wbr />
            cali
            <wbr />
            fragil
            <wbr />
            istic
            <wbr />
            expiali
            <wbr />
            do
            <wbr />
            cious can break at the indicated points.
          </p>
          <p>
            <code>br</code>: A line break
            <br />
            occurred here.
          </p>

          <h3>Meter and progress</h3>
          <p>
            <code>meter</code>: Storage used:
            <meter value={6} max={8} low={2} high={7} optimum={4}>
              6 of 8 blocks
            </meter>
          </p>
          <p>
            <code>progress</code>: Upload progress:
            <progress value={62} max={100}>
              62%
            </progress>
          </p>

          <h3>Subscript, superscript, and small</h3>
          <p>
            <code>sub</code>: H<sub>2</sub>O is water.
            <code>sup</code>: E = MC
            <sup>2</sup>.<code>small</code>:
            <q>
              I built this whole system.
              <small>[Editor&apos;s note: with help from φ]</small>
            </q>
          </p>

          <h3>Span</h3>
          <p>
            <code>span</code>: A<span>generic inline container</span>
            with no inherent meaning — useful as a styling hook.
          </p>
        </section>

        <hr />

        <FormsSection />

        <hr />

        <TablesSection />

        <hr />

        <EmbeddedContentSection />

        <hr />

        <InteractiveElementsSection />
      </main>
    </Layout>
  );
}
