/* ==========================================================================
   SCRIPT.JS - PORTFOLIO INTERACTIVITY & QA EMULATION (REVISION 3)
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
       2. SCROLL PROGRESS & STICKY NAVBAR & SCROLLSPY (PHOTO 5)
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

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

        // Active Navigation link on scroll spy (Photo 5)
        let scrollPos = window.scrollY || document.documentElement.scrollTop;
        let windowHeight = window.innerHeight;
        let docHeight = document.documentElement.scrollHeight;
        
        let activeId = '';
        
        // If at the very bottom, prioritize contacts section
        if (scrollPos + windowHeight >= docHeight - 20) {
            activeId = 'contacts';
        } else {
            sections.forEach(sec => {
                const top = sec.offsetTop - 120; // 120px offset for navbar padding
                const bottom = top + sec.offsetHeight;
                const id = sec.getAttribute('id');
                
                if (scrollPos >= top && scrollPos < bottom) {
                    activeId = id;
                }
            });
        }
        
        if (activeId) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });

    /* ==========================================================================
       3. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       4. INTERACTIVE SKILLS INSPECTOR (SKILL MAP & PHOTO 3)
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
        'linux': {
            title: 'Linux basics',
            desc: 'Базовая навигация по файловой системе через CLI (cd, ls, mkdir), чтение логов серверов в реальном времени с помощью cat, tail -f, grep, просмотр запущенных процессов.'
        },

        // Technical & 3D Engineering Category (Photo 3)
        '3d_modeling': {
            title: '3D Modeling & Slicing (3D-моделирование и подготовка печати)',
            desc: 'Профессиональное моделирование деталей в CAD-системах, подготовка к производству и слайсинг моделей в Orca Slicer и Cura. Оптимизация параметров печати (высота слоев, заполнение, поддержки) под различные виды пластиков.'
        },
        'firmware': {
            title: 'Firmware Setup & Validation (Прошивка и калибровка оборудования)',
            desc: 'Настройка, прошивка и верификация стабильности ПО управляющих плат 3D-принтеров (Klipper, Marlin). Тестирование стабильности прошивок под длительной нагрузкой, калибровка кинематики и термоэлементов.'
        },
        'grasshopper': {
            title: 'Grasshopper Automation (Автоматизация в Grasshopper)',
            desc: 'Создание скриптов визуального программирования в Rhinoceros + Grasshopper для параметрической автоматизации генерации геометрии. Автоматизация раскладки деталей на печать и управления тестовыми данными (TDM).'
        },
        'sql_tool': {
            title: 'SQL (Structured Query Language)',
            desc: 'Написание запросов к базам данных для сверки данных. Использование операторов JOIN, фильтрации WHERE, группировки GROUP BY, агрегатных функций (COUNT, SUM) для валидации бэкенда.'
        },
        'html_css': {
            title: 'HTML & CSS',
            desc: 'Понимание разметки и стилей веб-страниц. Позволяет быстро определять локализацию визуальных багов (в стилях CSS или в коде HTML) и проверять валидность верстки.'
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
       6. QA INTERACTIVE BUG INJECTOR & HOTFIX
       ========================================================================== */
    const btnInjectBug = document.getElementById('btn-inject-bug');
    const bugsFoundCount = document.getElementById('bugs-found-count');
    const testsPassedPercent = document.getElementById('tests-passed-percent');
    const qaStatusText = document.getElementById('qa-status-text');
    
    const bugAlertCard = document.getElementById('bug-alert-card');
    const btnRunHotfix = document.getElementById('btn-run-hotfix');
    const hotfixOverlay = document.getElementById('hotfix-overlay');
    const loaderStatusText = document.getElementById('loader-status-text');

    let isBuggy = false;

    // Inject Bug Handler
    btnInjectBug.addEventListener('click', () => {
        if (isBuggy) return;
        
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
