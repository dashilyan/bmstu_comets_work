type NotFoundPageProps = {
  onBackHome?: () => void
}

export function NotFoundPage({ onBackHome }: NotFoundPageProps) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="app-topbar">
        <div className="container py-3 d-flex align-items-center justify-content-between">
          <div className="app-brand fs-3">Cometica</div>

          <nav className="d-flex gap-4">
            <a className="app-link" href="#">
              FAQ
            </a>

            <a className="app-link" href="#">
              Лидеры
            </a>

            <a className="app-link" href="#">
              Наблюдения
            </a>

            <a className="app-link" href="#">
              Кометы
            </a>

            <a className="app-link" href="#">
              Профиль
            </a>
          </nav>
        </div>
      </header>

      <main className="container flex-grow-1 d-flex align-items-center justify-content-center">
        <div
          className="app-surface text-center px-5 py-5"
          style={{
            borderRadius: 28,
            maxWidth: 700,
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: '1.6rem',
              fontStyle: 'italic',
              marginBottom: 12,
            }}
          >
            Звёздный след остыл...
          </div>

          <div
            style={{
              fontSize: '8rem',
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            404
          </div>

          <div
            className="text-white-50 mb-4"
            style={{ fontSize: '1rem' }}
          >
            То, что вы ищете, уже завершило свой путь — превратилось в
            космическую пыль или улетело в другую галактику.
            <br />
            Но не отчаивайтесь: наша вселенная полна и другими,
            не менее прекрасными, мимолётными чудесами.
          </div>

          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => onBackHome?.()}
          >
            Вернуться на главную
          </button>
        </div>
      </main>
    </div>
  )
}