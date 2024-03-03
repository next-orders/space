import ReactMarkdown from 'react-markdown';

export const Markdown = ({ children }: { children: string }) => {
  return <ReactMarkdown>{children}</ReactMarkdown>;
};
