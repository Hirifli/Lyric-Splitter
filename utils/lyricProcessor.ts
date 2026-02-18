/**
 * Identifies if a character is within the Chinese Unicode block.
 */
const isChineseChar = (char: string): boolean => {
  return /[\u4e00-\u9fa5]/.test(char);
};

/**
 * Main processing function.
 * It iterates through lines, finds the separation point between Latin/Other scripts
 * and Chinese characters, and splits them into two lines with the same timestamp.
 */
export const processLyrics = (input: string): string => {
  const lines = input.split('\n');
  
  const processedLines = lines.map((line) => {
    // Trim whitespace
    const trimmedLine = line.trim();
    
    // 1. Check for Timestamp pattern [mm:ss.xx] or [mm:ss]
    // Regex explanation: ^(\[.*?\]) captures the timestamp at the start.
    // (.*) captures the rest of the content.
    const match = trimmedLine.match(/^(\[.*?\])(.*)/);

    if (!match) {
      // If no timestamp, return the line as is (it might be metadata like 'Lyrics by...')
      return trimmedLine;
    }

    const timestamp = match[1];
    const content = match[2];

    // If content is empty, just return the line
    if (!content.trim()) {
      return trimmedLine;
    }

    // 2. Find the index of the first Chinese character
    let splitIndex = -1;
    for (let i = 0; i < content.length; i++) {
      if (isChineseChar(content[i])) {
        splitIndex = i;
        break;
      }
    }

    // 3. Logic: 
    // If we found a Chinese character, we assume everything before it is the original
    // and everything from that point on is the translation.
    if (splitIndex > 0) {
      const originalText = content.substring(0, splitIndex).trim();
      const translationText = content.substring(splitIndex).trim();
      
      // Construct the new format
      // [Timestamp] Original
      // [Timestamp] Translation
      return `${timestamp}${originalText}\n${timestamp}${translationText}`;
    }

    // If no Chinese character found, return original line
    return trimmedLine;
  });

  return processedLines.join('\n');
};