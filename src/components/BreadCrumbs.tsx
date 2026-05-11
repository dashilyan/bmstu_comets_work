import { Link } from 'react-router-dom';

type Crumb = { label: string; to?: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Naga' }}>
      {crumbs.map((crumb, i) => (
        <span key={i}>
          {i > 0 && <span style={{ margin: '0 4px' }}>/</span>}
          {crumb.to ? (
            <Link
              to={crumb.to}
              style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)'; }}
            >
              {crumb.label}
            </Link>
          ) : (
            <span>{crumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
