import ReactMarkdown from "react-markdown";

type ProfileReadmeProps = { source: string };

/** Render user-authored Markdown without enabling raw HTML. */
export default function ProfileReadme({ source }: ProfileReadmeProps) {
  return (
    <div className="profile-readme">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="nofollow noopener noreferrer">
              {children}
            </a>
          ),
          img: ({ src, alt }) =>
            src ? <img src={src} alt={alt ?? ""} loading="lazy" referrerPolicy="no-referrer" /> : null
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
