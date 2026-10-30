/** Encode CSS url() delimiters so an image URL cannot introduce declarations in SSR. */
export function backgroundImageUrl(value: string): string {
  const encoded = value.replace(/[()"'\\\s<>]/gu, char =>
    encodeURIComponent(char).replace(/[()']/g, delimiter => `%${delimiter.charCodeAt(0).toString(16).toUpperCase()}`)
  );
  return `url(${encoded})`;
}
