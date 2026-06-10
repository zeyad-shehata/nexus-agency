export function showAlert(container: HTMLElement | null, type: 'success' | 'error' | 'info', message: string) {
  if (!container) return;
  container.textContent = message;
  container.style.display = 'block';
  
  if (type === 'success') {
    container.style.background = 'rgba(0, 212, 170, 0.15)';
    container.style.border = '1px solid var(--accent-secondary)';
    container.style.color = 'var(--accent-secondary)';
  } else if (type === 'error') {
    container.style.background = 'rgba(255, 107, 157, 0.15)';
    container.style.border = '1px solid var(--accent-tertiary)';
    container.style.color = 'var(--accent-tertiary)';
  } else {
    container.style.background = 'rgba(124, 92, 252, 0.15)';
    container.style.border = '1px solid var(--accent-primary)';
    container.style.color = 'var(--accent-primary)';
  }
}
