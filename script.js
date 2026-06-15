/* ==========================================================================
   SCRIPT.JS - PORTFOLIO INTERACTIVITY & QA EMULATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CURSOR GLOW TRAIL EFFECT
       ========================================================================== */
    const cursorGlow = document.getElementById('cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        // Center the glow on the cursor
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    /* ==========================================================================
       2. SCROLL PROGRESS & STICKY NAVBAR
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        // Scroll Progress
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = `${scrolled}%`;

        // Navbar scrolled state
        if (winScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       3. THEME TOGGLER (DARK / LIGHT)
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Load theme preference from localStorage or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = htmlEl.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* ==========================================================================
       4. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // offset to trigger slightly before/after scroll
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       5. ACTIVE NAVIGATION LINKS (SCROLLSPY)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -60% 0px' // vertical window focus zone
    });

    sections.forEach(sec => scrollSpyObserver.observe(sec));

    /* ==========================================================================
       6. INTERACTIVE SKILLS INSPECTOR (SKILL MAP)
       ========================================================================== */
    const skillInspector = document.getElementById('skills-inspector');
    const inspectorTitle = document.getElementById('inspector-skill-title');
    const inspectorDesc = document.getElementById('inspector-skill-desc');

    const skillData = {
        // Testing Category
        'manual': {
            title: 'Manual Testing (Ручное тестирование)',
            desc: 'Базовый и важнейший навык. Проектирование проверок, ручное прохождение сценариев, исследовательское тестирование (exploratory testing), локализация логических нестыковок в бизнес-требованиях.'
        },
        'functional': {
            title: 'Functional Testing (Функциональное тестирование)',
            desc: 'Анализ функциональности приложений на соответствие техническому заданию. Составление матриц покрытия, негативное тестирование, проверка пограничных значений и классов эквивалентности.'
        },
        'regression': {
            title: 'Regression Testing (Регрессионное тестирование)',
            desc: 'Повторный запуск тестов для проверки того, что исправление дефектов или новые фичи не сломали существующий функционал приложения. Формирование стабильных регрессионных чек-листов.'
        },
        'smoke': {
            title: 'Smoke Testing (Санитарное тестирование / Смоук)',
            desc: 'Быстрый прогон ключевых сценариев приложения после каждой сборки для валидации работоспособности критического функционала (например, авторизация, корзина) перед передачей в глубокое тестирование.'
        },
        'exploratory': {
            title: 'Exploratory Testing (Исследовательское тестирование)',
            desc: 'Одновременное изучение продукта, проектирование тестов и их выполнение. Эффективно для быстрого нахождения неочевидных сценариев без готовой документации.'
        },
        'ui': {
            title: 'UI Testing (Тестирование пользовательского интерфейса)',
            desc: 'Проверка внешнего вида, адаптивности верстки, кроссбраузерной совместимости, удобства использования (UX) и соответствия UI-китам во всех популярных браузерах.'
        },
        'api': {
            title: 'API Testing (Тестирование API)',
            desc: 'Прямые запросы к серверной части приложения в обход веб-интерфейса. Тестирование интеграции компонентов, бизнес-логики, валидации входящих параметров и структуры ответов.'
        },
        
        // Tools Category
        'jira': {
            title: 'Jira (Bug Tracker)',
            desc: 'Ведение жизненного цикла задач и дефектов. Создание понятных баг-репортов с четкими шагами воспроизведения (STR), ожидаемым/фактическим результатом и прикрепленными логами.'
        },
        'postman': {
            title: 'Postman (API Testing Client)',
            desc: 'Создание коллекций HTTP-запросов (GET, POST, PUT, DELETE), использование переменных окружения (Environments), написание автотестов на JavaScript для автоматической валидации JSON-схем и статус-кодов.'
        },
        'testrail': {
            title: 'TestRail (Test Management Tool)',
            desc: 'Проектирование тест-кейсов, организация тест-сьютов и запуск тест-ранов. Отслеживание прогресса тестирования и формирование отчетов о покрытии требований.'
        },
        'devtools': {
            title: 'Chrome DevTools',
            desc: 'Анализ сетевой активности (вкладка Network), инспектирование структуры DOM, отладка JS-консоли (Console) на предмет ошибок веб-клиента, эмуляция различных разрешений устройств.'
        },
        'git': {
            title: 'Git (Система контроля версий)',
            desc: 'Базовая работа с ветками, коммитами, пулл-реквестами (Pull Requests). Клонирование репозиториев, разрешение конфликтов слияния.'
        },
        'sql_tool': {
            title: 'SQL (Structured Query Language)',
            desc: 'Написание запросов к базам данных для сверки данных. Использование операторов JOIN, фильтрации WHERE, группировки GROUP BY, агрегатных функций (COUNT, SUM) для валидации бэкенда.'
        },

        // Technical Category
        'html_css': {
            title: 'HTML & CSS',
            desc: 'Понимание разметки и стилей веб-страниц. Позволяет быстро определять локализацию визуальных багов (в стилях CSS или в коде HTML) и проверять валидность верстки.'
        },
        'js_basics': {
            title: 'JavaScript basics',
            desc: 'Основы программирования. Понимание циклов, условий, объектов и асинхронных функций. Используется для написания скриптов автоматизации проверок в Postman и простых UI-скриптов.'
        },
        'rest_api': {
            title: 'REST API Architecture',
            desc: 'Понимание принципов архитектурного стиля REST (клиент-сервер, отсутствие состояния, кэширование, HTTP-методы, статус-коды, форматы данных JSON/XML).'
        },
        'sql_queries': {
            title: 'SQL queries validation',
            desc: 'Практическое применение SQL для проверки транзакций, соответствия данных в личных кабинетах пользователей и БД, чистки тестовых данных перед прогонами.'
        },
        'linux': {
            title: 'Linux basics',
            desc: 'Базовая навигация по файловой системе через CLI (cd, ls, mkdir), чтение логов серверов в реальном времени с помощью cat, tail -f, grep, просмотр запущенных процессов.'
        }
    };

    const skillItems = document.querySelectorAll('.skill-item-interactive');

    skillItems.forEach(item => {
        const triggerUpdate = () => {
            const skillKey = item.getAttribute('data-skill');
            const data = skillData[skillKey];
            if (data) {
                inspectorTitle.textContent = data.title;
                inspectorDesc.textContent = data.desc;
                // Add highlight visual class to inspector
                skillInspector.style.borderColor = 'var(--accent)';
            }
        };

        const triggerReset = () => {
            skillInspector.style.borderColor = 'var(--border)';
        };

        item.addEventListener('mouseenter', triggerUpdate);
        item.addEventListener('click', triggerUpdate);
        item.addEventListener('mouseleave', triggerReset);
    });

    /* ==========================================================================
       7. SQL SANDBOX (DATABASE SIMULATION)
       ========================================================================== */
    const sqlQuerySelect = document.getElementById('sql-query-select');
    const sqlEditorDisplay = document.getElementById('sql-editor-display');
    const btnSqlRun = document.getElementById('btn-sql-run');
    const sqlResultsContainer = document.getElementById('sql-results-container');

    const dbQueries = {
        'q1': {
            code: 'SELECT * FROM users;',
            headers: ['id', 'name', 'email', 'registration_date'],
            rows: [
                ['1', 'Алексей Иванов', 'ivanov@email.com', '2026-01-10'],
                ['2', 'Елена Петрова', 'petrova@email.com', '2026-02-15'],
                ['3', 'Дмитрий Сидоров', 'sidorov@email.com', '2026-03-01'],
                ['4', 'Анна Кузнецова', 'kuznetsova@email.com', '2026-04-12'],
                ['5', 'Игорь Смирнов', 'smirnov@email.com', '2026-05-20']
            ]
        },
        'q2': {
            code: 'SELECT * FROM orders \nWHERE total > 5000 \nORDER BY total DESC;',
            headers: ['id', 'user_id', 'total', 'status', 'order_date'],
            rows: [
                ['201', '5', '18500.00', 'Delivered', '2026-06-01'],
                ['203', '2', '12400.00', 'Processing', '2026-06-12'],
                ['198', '1', '7800.00', 'Delivered', '2026-05-28']
            ]
        },
        'q3': {
            code: 'SELECT u.name, o.id AS order_id, o.total, o.status \nFROM users u \nINNER JOIN orders o ON u.id = o.user_id;',
            headers: ['name', 'order_id', 'total', 'status'],
            rows: [
                ['Алексей Иванов', '198', '7800.00', 'Delivered'],
                ['Елена Петрова', '199', '2100.00', 'Delivered'],
                ['Елена Петрова', '203', '12400.00', 'Processing'],
                ['Дмитрий Сидоров', '200', '1500.00', 'Cancelled'],
                ['Игорь Смирнов', '201', '18500.00', 'Delivered']
            ]
        },
        'q4': {
            code: 'SELECT status, COUNT(*) AS count, SUM(total) AS sum_total \nFROM orders \nGROUP BY status;',
            headers: ['status', 'count', 'sum_total'],
            rows: [
                ['Delivered', '3', '28400.00'],
                ['Processing', '1', '12400.00'],
                ['Cancelled', '1', '1500.00']
            ]
        }
    };

    // Update editor code when dropdown changes
    sqlQuerySelect.addEventListener('change', (e) => {
        const selected = e.target.value;
        if (dbQueries[selected]) {
            sqlEditorDisplay.textContent = dbQueries[selected].code;
        }
    });

    // Run query button click handler
    btnSqlRun.addEventListener('click', () => {
        const selected = sqlQuerySelect.value;
        const queryData = dbQueries[selected];
        
        if (!queryData) return;

        // Visual run feedback: blink container
        sqlResultsContainer.style.opacity = '0.3';
        btnSqlRun.disabled = true;
        btnSqlRun.innerHTML = 'Запуск...';

        setTimeout(() => {
            sqlResultsContainer.style.opacity = '1';
            btnSqlRun.disabled = false;
            btnSqlRun.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-icon">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg> Выполнить`;

            // Build dynamic table
            let tableHTML = '<table class="sql-table"><thead><tr>';
            queryData.headers.forEach(h => {
                tableHTML += `<th>${h}</th>`;
            });
            tableHTML += '</tr></thead><tbody>';

            queryData.rows.forEach(row => {
                tableHTML += '<tr>';
                row.forEach(cell => {
                    tableHTML += `<td>${cell}</td>`;
                });
                tableHTML += '</tr>';
            });
            tableHTML += '</tbody></table>';

            sqlResultsContainer.innerHTML = tableHTML;
        }, 400);
    });

    /* ==========================================================================
       8. QA INTERACTIVE BUG INJECTOR & HOTFIX
       ========================================================================== */
    const btnInjectBug = document.getElementById('btn-inject-bug');
    const bugsFoundCount = document.getElementById('bugs-found-count');
    const testsPassedPercent = document.getElementById('tests-passed-percent');
    const qaStatusText = document.getElementById('qa-status-text');
    
    const bugAlertCard = document.getElementById('bug-alert-card');
    const btnRunHotfix = document.getElementById('btn-run-hotfix');
    const hotfixOverlay = document.getElementById('hotfix-overlay');
    const loaderStatusText = document.getElementById('loader-status-text');

    const heroTitle = document.getElementById('hero-main-title');

    let isBuggy = false;

    // Inject Bug Handler
    btnInjectBug.addEventListener('click', () => {
        if (isBuggy) return; // bug already exists
        
        isBuggy = true;
        
        // Apply glitched buggy CSS to body
        document.body.classList.add('buggy-mode');
        
        // Update dashboard metrics to RED/FAILED states
        bugsFoundCount.textContent = '1';
        bugsFoundCount.style.color = 'var(--danger)';
        
        testsPassedPercent.textContent = '83.3%';
        testsPassedPercent.style.color = 'var(--danger)';
        
        qaStatusText.textContent = 'FAILED';
        qaStatusText.className = 'metric-value status-buggy';

        // Animate/Show Floating Bug Alert Card
        setTimeout(() => {
            bugAlertCard.classList.add('visible');
        }, 500);
    });

    // Run Hotfix Handler
    btnRunHotfix.addEventListener('click', () => {
        // Show compiling overlay
        hotfixOverlay.classList.add('visible');
        
        // Compile status steps
        const compileSteps = [
            'Downloading hotfix patch v1.0.42...',
            'Analyzing layout parameters & viewport alignment...',
            'Compiling modules with webpack and cleaning cache...',
            'Running regression tests & verifying assets...',
            'Verifying build stability... Quality Gate: PASSED'
        ];

        let stepIndex = 0;
        loaderStatusText.textContent = compileSteps[0];

        const stepInterval = setInterval(() => {
            stepIndex++;
            if (stepIndex < compileSteps.length) {
                loaderStatusText.textContent = compileSteps[stepIndex];
            } else {
                clearInterval(stepInterval);
                finishHotfix();
            }
        }, 500);

        function finishHotfix() {
            // Remove glitched classes
            document.body.classList.remove('buggy-mode');
            bugAlertCard.classList.remove('visible');
            hotfixOverlay.classList.remove('visible');
            
            // Restore dashboard metrics to GREEN/PASSED
            isBuggy = false;
            bugsFoundCount.textContent = '0';
            bugsFoundCount.style.color = '';
            
            testsPassedPercent.textContent = '100%';
            testsPassedPercent.style.color = '';
            
            qaStatusText.textContent = 'Ready for Prod';
            qaStatusText.className = 'metric-value status-active';

            // Show a temporary success message
            showSuccessNotification();
        }
    });

    function showSuccessNotification() {
        // Create temporary floating alert
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '30px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%) translateY(-50px)';
        notification.style.backgroundColor = 'var(--surface)';
        notification.style.color = 'var(--accent)';
        notification.style.border = '1px solid var(--accent)';
        notification.style.borderRadius = '8px';
        notification.style.padding = '12px 24px';
        notification.style.fontFamily = 'var(--font-mono)';
        notification.style.fontSize = '12px';
        notification.style.zIndex = '11000';
        notification.style.boxShadow = '0 10px 30px var(--accent-soft)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.3s ease';
        notification.textContent = '✓ Hotfix deployed successfully. All tests passed!';

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
            notification.style.opacity = '1';
        }, 100);

        // Animate out
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(-50px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});
