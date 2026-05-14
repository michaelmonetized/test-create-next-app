/**
 * Form control demonstrations for the HTML elements kitchen sink page.
 */

const textInputs = [
  ["input-text", "Text", "text", "Plain text input"],
  ["input-email", "Email address", "email", "you@example.com"],
  ["input-password", "Password", "password", "••••••••"],
  ["input-search", "Search", "search", "Search…"],
  ["input-url", "URL", "url", "https://example.com"],
  ["input-tel", "Telephone", "tel", "+1 (555) 000-0000"],
];

const dateInputs = [
  ["input-date", "Date", "date"],
  ["input-datetime-local", "Date & time (local)", "datetime-local"],
  ["input-month", "Month", "month"],
  ["input-week", "Week", "week"],
  ["input-time", "Time", "time"],
];

const ratioOptions = [
  ["radio-golden", "golden", "Golden ratio — φ ≈ 1.618", false, true],
  ["radio-silver", "silver", "Silver ratio — δ ≈ 2.414", false, false],
  [
    "radio-disabled",
    "plastic",
    "Plastic ratio — ρ ≈ 1.325 (disabled)",
    true,
    false,
  ],
] as const;

const propertyOptions = [
  ["check-irrational", "Irrational number", false, true],
  ["check-algebraic", "Algebraic number", false, false],
  ["check-transcendental", "Transcendental number (disabled)", true, false],
] as const;

const buttonVariants = [
  ["", "Raw buttons"],
  ["_button", "Button base style (._button)"],
  ["_button primary", "Button Primary (._button.primary)"],
  ["_button secondary", "Button Secondary (._button.secondary)"],
  ["_button accent", "Button accent (._button.accent)"],
  ["_button success", "Button success (._button.success)"],
  ["_button destructive", "Button destructive (._button.destructive)"],
  ["_button outline", "Button outline (._button.outline)"],
  ["_button ghost", "Button ghost (._button.ghost)"],
  ["_button link", "Button link (._button.link)"],
];

function InputField({
  id,
  label,
  type,
  placeholder,
}: {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <br />
      <input type={type} id={id} placeholder={placeholder} />
    </p>
  );
}

function TextInputsDemo() {
  return (
    <div className="flex flex-col gap-md grow">
      <h3>Text inputs</h3>
      {textInputs.map(([id, label, type, placeholder]) => (
        <InputField
          key={id}
          id={id}
          label={label}
          type={type}
          placeholder={placeholder}
        />
      ))}
      <p>
        <label htmlFor="input-readonly">Read-only</label>
        <br />
        <input
          type="text"
          id="input-readonly"
          readOnly
          defaultValue="Cannot edit this"
        />
      </p>
      <p>
        <label htmlFor="input-disabled">Disabled</label>
        <br />
        <input
          type="text"
          id="input-disabled"
          disabled
          defaultValue="Not available"
        />
      </p>
    </div>
  );
}

function NumberAndDateInputsDemo() {
  return (
    <div className="flex flex-col gap-md grow">
      <h3>Number and date inputs</h3>
      <p>
        <label htmlFor="input-number">Number</label>
        <br />
        <input
          type="number"
          id="input-number"
          min={0}
          max={100}
          step={0.001}
          defaultValue={1.618}
        />
      </p>
      {dateInputs.map(([id, label, type]) => (
        <InputField key={id} id={id} label={label} type={type} />
      ))}
    </div>
  );
}

function SelectMenusDemo() {
  return (
    <>
      <h3>Select menus</h3>
      <p>
        <label htmlFor="select-single">Single select</label>
        <br />
        <select id="select-single">
          <option value="">Choose one…</option>
          <option>Option A</option>
          <option>Option B</option>
          <option>Option C</option>
        </select>
      </p>
      <p>
        <label htmlFor="select-grouped">Grouped select</label>
        <br />
        <select id="select-grouped">
          <optgroup label="Group One">
            <option>Alpha</option>
            <option>Beta</option>
          </optgroup>
          <optgroup label="Group Two">
            <option>Gamma</option>
            <option>Delta</option>
          </optgroup>
        </select>
      </p>
      <p>
        <label htmlFor="select-multiple">Multiple select</label>
        <br />
        <select id="select-multiple" multiple size={4}>
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
          <option>Gold</option>
        </select>
      </p>
    </>
  );
}

function OtherInputsDemo() {
  return (
    <div className="flex flex-col gap-md">
      <h3>Other inputs</h3>
      <p>
        <label htmlFor="input-color">Color</label>
        <br />
        <input type="color" id="input-color" defaultValue="#c9a96e" />
      </p>
      <p>
        <label htmlFor="input-range">Range</label>
        <br />
        <input
          type="range"
          id="input-range"
          min={0}
          max={100}
          defaultValue={62}
        />
      </p>
      <p>
        <label htmlFor="input-file">File upload</label>
        <br />
        <input type="file" id="input-file" />
      </p>
      <SelectMenusDemo />
      <h3>Datalist</h3>
      <p>
        <label htmlFor="input-datalist">Favorite ratio</label>
        <br />
        <input
          type="text"
          id="input-datalist"
          list="ratios"
          placeholder="Start typing…"
        />
        <datalist id="ratios">
          <option value="Golden ratio (φ)"></option>
          <option value="Silver ratio (δ)"></option>
          <option value="Pi (π)"></option>
          <option value="Euler's number (e)"></option>
        </datalist>
      </p>
      <h3>Textarea</h3>
      <p>
        <label htmlFor="textarea">Message</label>
        <br />
        <textarea
          id="textarea"
          rows={4}
          placeholder="Write something…"
        ></textarea>
      </p>
    </div>
  );
}

function RatioRadiosDemo() {
  return (
    <div className="flex flex-col gap-md grow">
      <h3>Radio buttons</h3>
      <fieldset>
        <legend>Choose a ratio</legend>
        {ratioOptions.map(([id, value, label, disabled, defaultChecked]) => (
          <p key={id}>
            <input
              type="radio"
              name="ratio"
              id={id}
              value={value}
              disabled={disabled}
              defaultChecked={defaultChecked}
            />
            <label htmlFor={id}>{label}</label>
          </p>
        ))}
      </fieldset>
    </div>
  );
}

function CheckboxesDemo() {
  return (
    <div className="flex flex-col gap-md grow">
      <h3>Checkboxes</h3>
      <fieldset>
        <legend>Select properties</legend>
        {propertyOptions.map(([id, label, disabled, defaultChecked]) => (
          <p key={id}>
            <input
              type="checkbox"
              id={id}
              disabled={disabled}
              defaultChecked={defaultChecked}
            />
            <label htmlFor={id}>{label}</label>
          </p>
        ))}
      </fieldset>
    </div>
  );
}

function ButtonVariantDemo({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  const buttonClassName = className || undefined;

  return (
    <section className="flex *:grow flex-col gap-md">
      <h4>{label}</h4>
      <p>
        <button className={buttonClassName} type="submit">
          Submit
        </button>
        <button className={buttonClassName} type="reset">
          Reset
        </button>
        <button className={buttonClassName} type="button">
          Button
        </button>
        <input className={buttonClassName} type="submit" value="Input submit" />
        <input className={buttonClassName} type="reset" value="Input reset" />
        <input className={buttonClassName} type="button" value="Input button" />
        <button className={buttonClassName} type="button" disabled>
          Disabled
        </button>
      </p>
    </section>
  );
}

function ButtonsDemo() {
  return (
    <div className="flex flex-col gap-md">
      <h3>Buttons</h3>
      <div className="flex flex-wrap *:grow gap-md">
        {buttonVariants.map(([className, label]) => (
          <ButtonVariantDemo key={label} className={className} label={label} />
        ))}
      </div>
    </div>
  );
}

function OutputDemo() {
  return (
    <div className="flex flex-col gap-md grow">
      <h3>Output</h3>
      <p>
        <label htmlFor="output-a">Value A</label>
        <input type="number" id="output-a" name="a" defaultValue={1} />+
        <label htmlFor="output-b">Value B</label>
        <input type="number" id="output-b" name="b" defaultValue={0.618} />=
        <output name="result" htmlFor="output-a output-b">
          1.618
        </output>
      </p>
    </div>
  );
}

/** Renders all native form-control demonstrations. */
export function FormsSection() {
  return (
    <section id="forms" aria-labelledby="forms-title">
      <h2>
        <span id="forms-title">Forms</span>
        <a href="#tables" className="sr-nav-link">
          Skip to next section: {`"Tables"`}.
        </a>
        <a href="#phrasing" className="sr-nav-link">
          back to previous section: {`"Phrasing Content"`}.
        </a>
      </h2>
      <p>
        Interactive controls for collecting user input. Every input must have an
        associated
        <code>label</code>— either wrapping the input or linked via
        <code>for</code>/<code>id</code>.
      </p>

      <form method="dialog" className="flex flex-col gap-md w-full grow">
        <div className="flex flex-col md:flex-row gap-md w-full grow">
          <TextInputsDemo />
          <NumberAndDateInputsDemo />
          <OtherInputsDemo />
        </div>
        <div className="flex flex-col md:flex-row gap-md grow">
          <RatioRadiosDemo />
          <CheckboxesDemo />
        </div>
        <div className="flex flex-col md:flex-row gap-md grow">
          <ButtonsDemo />
          <OutputDemo />
        </div>
      </form>
    </section>
  );
}
