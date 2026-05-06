// 페이지 로드 시 실행될 기본 스크립트
document.addEventListener('DOMContentLoaded', () => {
    console.log('Slay the Spire 2 웹사이트 초기화 완료');

    // 스무스 스크롤 효과 (네비게이션 링크 클릭 시)
    const navLinks = document.querySelectorAll('.header nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // #으로 시작하는 앵커 링크인 경우에만 스무스 스크롤 작동
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // 그 외(예: decks.html)는 브라우저 기본 동작(페이지 이동)을 따름
        });
    });

    // 헤더 스크롤 이벤트 (스크롤 시 배경 투명도 조절 등 추가 가능)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = 'none';
        }

        // 로고 스크롤 투명도 처리 (페이지 최상단에서는 투명, 스크롤 내리면 불투명)
        const spireLogo = document.querySelector('.spire-logo');
        if (spireLogo) {
            const scrollPosition = window.scrollY;
            // 0~300px 스크롤 구간에서 opacity가 0에서 1로 변하도록 설정
            let opacity = scrollPosition / 300;
            if (opacity > 1) opacity = 1;
            if (opacity < 0) opacity = 0;
            spireLogo.style.opacity = opacity;
        }
    });

    // 페이드인 애니메이션 (스크롤 시 아래에서 위로 올라오며 나타남)
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15 // 요소가 15% 보일 때 트리거
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 타워 이미지의 왼쪽 2/3만 컨테이너에 보이도록 동적으로 너비 설정
    const towerImage = document.querySelector('.tower-image');
    const detailsRight = document.querySelector('.details-right');
    if (towerImage && detailsRight) {
        const adjustTowerWidth = () => {
            const imgRect = towerImage.getBoundingClientRect();
            if (imgRect.width > 0) {
                // 컨테이너가 이미지 실제 렌더링 너비의 2/3만 차지하도록 하여 오른쪽 1/3을 자름
                const targetWidth = imgRect.width * 0.666;
                detailsRight.style.width = `${targetWidth}px`; // absolute 포지션이므로 flex 대신 width 변경
            }
        };

        if (towerImage.complete) {
            adjustTowerWidth();
        } else {
            towerImage.addEventListener('load', adjustTowerWidth);
        }
        window.addEventListener('resize', adjustTowerWidth);
        setTimeout(adjustTowerWidth, 100);
        setTimeout(adjustTowerWidth, 500); // 폰트나 레이아웃 지연 렌더링 대비
    }

    // 타워 스크롤 진행도에 따른 동적 배경색 전환
    const detailsSection = document.getElementById('details');
    window.addEventListener('scroll', () => {
        if (!detailsSection) return;

        const rect = detailsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const scrollRange = detailsSection.offsetHeight - windowHeight;
        if (scrollRange <= 0) return;

        let progress = -rect.top / scrollRange;
        progress = Math.max(0, Math.min(1, progress));

        // Slay the Spire 분위기 색상 (더 밝고 진하게 조정)
        const c1 = { r: 40, g: 50, b: 90 };  // 더 밝고 진한 남색
        const c2 = { r: 180, g: 40, b: 40 }; // 매우 강렬하고 밝은 빨간색
        const c3 = { r: 50, g: 15, b: 15 };  // 어두운 붉은 기운

        let r, g, b;
        if (progress < 0.5) {
            const p = progress * 2;
            r = Math.round(c1.r + (c2.r - c1.r) * p);
            g = Math.round(c1.g + (c2.g - c1.g) * p);
            b = Math.round(c1.b + (c2.b - c1.b) * p);
        } else {
            const p = (progress - 0.5) * 2;
            r = Math.round(c2.r + (c3.r - c2.r) * p);
            g = Math.round(c2.g + (c3.g - c2.g) * p);
            b = Math.round(c2.b + (c3.b - c2.b) * p);
        }
        detailsSection.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });

    // 캐릭터 탭 전환 로직
    const charTabs = document.querySelectorAll('.char-tab');
    const charContents = document.querySelectorAll('.char-content');
    const contentArea = document.querySelector('.character-showcase-wrapper');
    const bgLayer = document.getElementById('dynamic-bg-layer');

    // 첫 클릭 시 '팍' 뜨는 현상을 막기 위해 모든 배경 이미지 미리 로드 (Preloading)
    const imageUrls = Array.from(charContents).map(c => c.getAttribute('data-bg'));
    imageUrls.forEach(url => {
        if (url) {
            const img = new Image();
            img.src = url;
        }
    });

    // 초기 배경 이미지 설정
    const activeContent = document.querySelector('.char-content.active');
    if (activeContent && bgLayer) {
        bgLayer.style.backgroundImage = `url('${activeContent.getAttribute('data-bg')}')`;
        bgLayer.style.backgroundPosition = activeContent.getAttribute('data-bg-pos') || 'center center';
        bgLayer.style.backgroundSize = activeContent.getAttribute('data-bg-size') || 'cover';
    }

    charTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('active')) return; // 이미 활성화된 탭 무시

            // 모든 탭과 콘텐츠 비활성화
            charTabs.forEach(t => t.classList.remove('active'));
            charContents.forEach(c => c.classList.remove('active'));

            // 클릭한 탭과 연결된 콘텐츠 활성화
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
                if (bgLayer) {
                    // 자연스러운 교체를 위해 먼저 투명하게 만든 후 이미지 교체
                    bgLayer.style.opacity = '0';
                    setTimeout(() => {
                        bgLayer.style.backgroundImage = `url('${targetContent.getAttribute('data-bg')}')`;
                        bgLayer.style.backgroundPosition = targetContent.getAttribute('data-bg-pos') || 'center center';
                        bgLayer.style.backgroundSize = targetContent.getAttribute('data-bg-size') || 'cover';
                        bgLayer.style.opacity = '1';
                    }, 400); // CSS transition 시간과 맞춰 대기
                }
            }
            
            // 탭 변경 시 열려있는 큰 카드 닫기
            const largeCardDisplay = document.getElementById('large-card-display');
            if (largeCardDisplay) {
                largeCardDisplay.classList.remove('show');
            }
        });
    });

    // 카드 크게 보기 로직
    const cardImages = document.querySelectorAll('.card-images img');
    const largeCardDisplay = document.getElementById('large-card-display');
    
    if (largeCardDisplay) {
        const largeCardImg = largeCardDisplay.querySelector('img');

        // 작은 카드 클릭 시
        cardImages.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                const src = card.getAttribute('src');
                
                if (largeCardDisplay.classList.contains('show') && largeCardImg.getAttribute('src') === src) {
                    // 이미 열려있는 동일한 카드를 다시 클릭하면 닫기
                    largeCardDisplay.classList.remove('show');
                } else {
                    // 새로운 카드를 크게 띄우기
                    largeCardImg.setAttribute('src', src);
                    largeCardDisplay.classList.add('show');
                }
            });
        });

        // 크게 띄워진 카드를 클릭하면 닫기
        largeCardDisplay.addEventListener('click', () => {
            largeCardDisplay.classList.remove('show');
        });
    }
});
