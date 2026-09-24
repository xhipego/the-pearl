/**
 * Safely triggers opening an external URL without directly invoking window.open(),
 * avoiding popup blocks and iframe permission errors in sandbox environments.
 */
export function safeOpenUrl(url: string): void {
  if (typeof window === 'undefined') return;

  try {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {
    window.location.href = url;
  }
}
