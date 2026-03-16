export function FaqPage() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <header 
        className="app-topbar position-relative overflow-hidden" 
        style={{ 
          height: '96px',
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Зоны свечения как в Base */}
        <div
          className="position-absolute"
          style={{
            left: '963px',
            top: '-474px',
            width: '672px',
            height: '670px',
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 14%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        
        <div
          className="position-absolute"
          style={{
            left: '27px',
            top: '-183px',
            width: '762px',
            height: '759px',
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 14%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Навигация */}
        <div className="container h-100 px-0 position-relative" style={{ maxWidth: 'calc(100% - 160px)', margin: '0 80px', zIndex: 2 }}>
          <div className="d-flex align-items-center justify-content-between h-100">
            <div className="app-brand" style={{ fontSize: '40px' }}>Cometica</div>
            <nav className="d-flex" style={{ fontSize: '20px', width: '644px' }}>
              <a className="app-link flex-fill text-center" href="#">FAQ</a>
              <a className="app-link flex-fill text-center" href="#">Лидеры</a>
              <a className="app-link flex-fill text-center" href="#">Наблюдения</a>
              <a className="app-link flex-fill text-center" href="#">Кометы</a>
              <a className="app-link flex-fill text-center" href="#">Профиль</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Блок с заголовком (как в Base) */}
      <div 
        className="position-relative overflow-hidden"
        style={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          marginTop: '48px'
        }}
      >
        {/* Зоны свечения */}
        <div
          className="position-absolute"
          style={{
            left: '963px',
            top: '-474px',
            width: '672px',
            height: '670px',
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 14%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        
        <div
          className="position-absolute"
          style={{
            left: '27px',
            top: '-183px',
            width: '762px',
            height: '759px',
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 14%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Контент заголовка */}
        <div style={{ padding: '46px 0', position: 'relative', zIndex: 2 }}>
          <div 
            className="mx-auto"
            style={{
              maxWidth: '1280px',
              width: 'calc(100% - 80px)',
              margin: '0 auto'
            }}
            >
            <div 
              className="d-flex flex-column"
              style={{
                gap: '16px'
              }}
            >
              {/* Breadcrumbs */}
              <div style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Главная / FAQ
              </div>
              
              {/* Заголовок капсом */}
              <div style={{ fontSize: '36px', color: '#ffffff', textTransform: 'uppercase' }}>
                КАК ПОЛЬЗОВАТЬСЯ НАШЕЙ СИСТЕМОЙ?
              </div>
              
              {/* Подзаголовок */}
              <div style={{ fontSize: '24px', color: '#ffffff' }}>
                Простое руководство, в котором мы опишем все шаги для совершения вашего величайшего открытия.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Текстовый блок с содержанием */}
      <div 
        className="position-relative overflow-hidden"
        style={{
          width: '100%',
          marginTop: '64px'
        }}
      >
        <div 
          className="mx-auto"
          style={{
            maxWidth: '1280px',
            width: 'calc(100% - 80px)',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div 
            className="d-flex"
            style={{
              gap: '10%' // 10% промежуток
            }}
          >
            {/* Основной текст - 60% */}
            <div style={{ width: '60%' }}>
              {/* Раздел 1 */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '16px', color: '#ffffff' }}>
                  РЕГИСТРАЦИЯ И ПЕРВЫЙ ВХОД
                </h2>
                <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <p style={{ marginBottom: '16px' }}>
                    Для начала работы необходимо создать аккаунт, нажав кнопку "Регистрация" в правом верхнем углу. 
                    Укажите действующий email и придумайте надежный пароль. После подтверждения email вы сможете 
                    войти в систему и начать загружать свои первые наблюдения.
                  </p>
                  <p>
                    Мы рекомендуем сразу заполнить профиль — указать обсерваторию (если есть) и основное оборудование. 
                    Это поможет другим пользователям лучше понимать контекст ваших наблюдений.
                  </p>
                </div>
              </section>

              {/* Раздел 2 */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '16px', color: '#ffffff' }}>
                  ЗАГРУЗКА ИЗОБРАЖЕНИЙ
                </h2>
                <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <p style={{ marginBottom: '16px' }}>
                    Перейдите в раздел "Наблюдения" и нажмите "Загрузить новое". Система поддерживает форматы JPG, PNG и FITS.
                    Обязательно укажите метаданные съемки: дату и время (в UTC), координаты центра поля (прямое восхождение 
                    и склонение), фокусное расстояние вашего телескопа и размер пикселя камеры.
                  </p>
                  <p>
                    От качества метаданных напрямую зависит точность расчета координат кометы. Если вы не уверены в параметрах, 
                    воспользуйтесь справочными материалами в разделе "Помощь".
                  </p>
                </div>
              </section>

              {/* Раздел 3 */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '16px', color: '#ffffff' }}>
                  РАБОТА С РЕЗУЛЬТАТАМИ
                </h2>
                <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <p style={{ marginBottom: '16px' }}>
                    После загрузки нейросеть YOLOv8 автоматически обнаружит кометы на снимке и выделит их рамками. 
                    Вы можете скорректировать положение рамки вручную, если нейросеть ошиблась. Система сразу покажет 
                    пиксельные координаты объекта.
                  </p>
                  <p>
                    Нажмите "Рассчитать координаты" — и вы получите экваториальные координаты кометы (прямое восхождение, склонение). 
                    Для серии наблюдений одной кометы можно построить орбиту и экспортировать данные в формате MPC.
                  </p>
                </div>
              </section>

              {/* Раздел 4 */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '16px', color: '#ffffff' }}>
                  УЧАСТИЕ В СООБЩЕСТВЕ
                </h2>
                <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <p style={{ marginBottom: '16px' }}>
                    Ваши наблюдения попадают в общую базу, где другие пользователи могут их подтверждать или комментировать.
                    Активные участники получают рейтинг и попадают на доску лидеров. Подтвержденные сообществом наблюдения 
                    считаются более надежными и имеют больший научный вес.
                  </p>
                  <p>
                    Также вы можете участвовать в обсуждениях на форуме, задавать вопросы более опытным коллегам 
                    и помогать новичкам освоиться в системе.
                  </p>
                </div>
              </section>
            </div>

            {/* Содержание - 30% */}
            <div style={{ width: '30%' }}>
              <div style={{ 
                position: 'sticky', 
                top: '32px',
                padding: '24px',
                background: 'rgba(12, 16, 22, 0.62)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '14px',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '24px', color: '#ffffff' }}>
                  СОДЕРЖАНИЕ
                </h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <a href="#" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontSize: '18px', display: 'block', marginBottom: '8px' }}>
                      1. РЕГИСТРАЦИЯ И ПЕРВЫЙ ВХОД
                    </a>
                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        1.1 Создание аккаунта
                      </a>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        1.2 Подтверждение email
                      </a>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        1.3 Заполнение профиля
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <a href="#" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontSize: '18px', display: 'block', marginBottom: '8px' }}>
                      2. ЗАГРУЗКА ИЗОБРАЖЕНИЙ
                    </a>
                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        2.1 Поддерживаемые форматы
                      </a>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        2.2 Метаданные съемки
                      </a>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        2.3 Важность точности данных
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <a href="#" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontSize: '18px', display: 'block', marginBottom: '8px' }}>
                      3. РАБОТА С РЕЗУЛЬТАТАМИ
                    </a>
                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        3.1 Автоматическое распознавание
                      </a>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        3.2 Ручная корректировка
                      </a>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        3.3 Расчет координат и орбит
                      </a>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        3.4 Экспорт в формате MPC
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <a href="#" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontSize: '18px', display: 'block', marginBottom: '8px' }}>
                      4. УЧАСТИЕ В СООБЩЕСТВЕ
                    </a>
                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        4.1 Общая база наблюдений
                      </a>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        4.2 Подтверждение и рейтинг
                      </a>
                      <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: '16px' }}>
                        4.3 Форум и обсуждения
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}