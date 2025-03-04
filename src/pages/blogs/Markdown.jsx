import ReactMarkdown from "react-markdown";

const markdownText = `
  # This is Markdown Text!
  ### Will be developed soon...
`;

function Markdown() {
  return (
    <div>
      <h1>This is Markdown usage blog!</h1>
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
  );
}

export default Markdown;
