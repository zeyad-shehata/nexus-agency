export interface CardProps {
  title?: string;
  subtitle?: string;
  content: string;
  footer?: string;
  className?: string;
}

export function renderCard(props: CardProps): string {
  return `
    <div class="glass-card ${props.className || ''}">
      ${props.title ? `<div class="card-title">${props.title}</div>` : ''}
      ${props.subtitle ? `<div class="card-subtitle">${props.subtitle}</div>` : ''}
      <div class="card-content">
        ${props.content}
      </div>
      ${props.footer ? `<div class="card-footer">${props.footer}</div>` : ''}
    </div>
  `;
}
