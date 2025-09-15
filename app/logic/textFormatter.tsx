import React from 'react';

/**
 * Formats a given text by handling links, bold text, and newlines.
 *
 * This function processes the input text by:
 * 1. Converting markdown-style links (e.g., [text](url)) into clickable HTML anchor elements.
 * 2. Handling bold text wrapped in double asterisks (e.g., **text**) by converting them into <b> elements.
 * 3. Preserving line breaks by replacing newline characters (\n) with <br> elements.
 *
 * @param text - The input text to be formatted.
 * @returns An array of JSX elements, with links, bold text, and newlines appropriately formatted.
 */
export const formatText = (input?: string, opts?: { linkClassName?: string }): JSX.Element[] => {
  const text = input ?? '';
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g; // Regular expression to identify markdown-style links
  const parts: JSX.Element[] = []; // Array to hold the resulting JSX elements
  let lastIndex = 0; // Tracks the position in the text for handling non-link segments
  let match: RegExpExecArray | null;
  let keyCounter = 0; // Counter to generate unique keys across the whole array
  const nextKey = (prefix: string) => `${prefix}-${keyCounter++}`;

  // Step 1: Replace links in the text with <a> elements
  while ((match = linkRegex.exec(text)) !== null) {
    const [, linkText, url] = match; // Destructure the match to get link text and URL
    const startIndex = match.index; // The position of the match in the text

    // Add the text before the link (if any) and process it for bold text and newlines
    if (startIndex > lastIndex) {
      parts.push(...handleBoldAndNewlines(text.slice(lastIndex, startIndex), nextKey));
    }

    // Add the link as an <a> element
    parts.push(
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={opts?.linkClassName ?? "title text-xl mx-2 hover:underline"}
        key={nextKey('link')}
      >
        {linkText}
      </a>
    );

    lastIndex = linkRegex.lastIndex; // Update lastIndex to the end of the current match
  }

  // Handle any remaining text after the last link
  if (lastIndex < text.length) {
    parts.push(...handleBoldAndNewlines(text.slice(lastIndex), nextKey));
  }

  return parts;
};

/**
 * Handles bold text and newlines within a given text segment.
 *
 * This function processes the input text by:
 * 1. Converting bold text wrapped in double asterisks (e.g., **text**) into <b> elements.
 * 2. Replacing newline characters (\n) with <br> elements to preserve line breaks.
 *
 * @param text - The input text segment to be processed.
 * @param nextKey - Function to generate unique keys for React elements.
 * @returns An array of JSX elements, with bold text and newlines appropriately formatted.
 */
const handleBoldAndNewlines = (text: string, nextKey: (prefix: string) => string): JSX.Element[] => {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const segments = text.split(boldRegex);
  const result: JSX.Element[] = [];

  segments.forEach((segment, index) => {
    if (index % 2 === 1) {
      // Odd index means the segment is within **bold markers**
      result.push(<b key={nextKey('bold')}>{segment}</b>);
    } else {
      // Even index means the segment is regular text, so handle newlines
      const lines = segment.split('\n');

      lines.forEach((line, lineIndex) => {
        if (lineIndex > 0) result.push(<br key={nextKey('br')} />);
        result.push(<React.Fragment key={nextKey('line')}>{line}</React.Fragment>);
      });
    }
  });

  return result;
};
