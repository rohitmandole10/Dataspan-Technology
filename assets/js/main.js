/**
* Template Name: iLanding
* Template URL: https://bootstrapmade.com/ilanding-bootstrap-landing-page-template/
* Updated: Nov 12 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('.navbar');
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);



  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  /**
   * WhatsApp Branded Widget Global Injection
   */
  function initWhatsApp() {
    if (document.querySelector('.whatsapp-float')) return;

    // Create Button
    const waButton = document.createElement('div');
    waButton.className = 'whatsapp-float';
    waButton.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';

    // Create Popup
    const waPopup = document.createElement('div');
    waPopup.className = 'whatsapp-popup';
    waPopup.innerHTML = `
      <div class="wa-header">
        <div class="wa-header-info">
          <div class="wa-logo-container">
            <img src="https://image.dataspantechnologies.com/dataspan/brand3.png" alt="Dataspan Logo">
          </div>
          <div class="wa-header-text">
            <span class="wa-name">Dataspan Technologies Pvt Ltd</span>
            <span class="wa-status">Online</span>
          </div>
        </div>
        <button class="wa-close"><i class="bi bi-x"></i></button>
      </div>
      <div class="wa-body">
        <div class="wa-message">
          <p>Hi there! ðŸ‘‹ How can we help you today?</p>
        </div>
        <a href="https://wa.me/8149390967" target="_blank" class="wa-start-btn">
          <i class="fa-brands fa-whatsapp"></i> Start Chat
        </a>
      </div>
    `;

    document.body.appendChild(waButton);
    document.body.appendChild(waPopup);

    // Link generation logic
    const getWhatsAppUrl = () => {
      const phone = '8149390967';
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      return isMobile ? `whatsapp://send?phone=${phone}` : `https://wa.me/${phone}`;
    };

    // Toggle Functionality
    waButton.addEventListener('click', (e) => {
      e.stopPropagation();
      waPopup.classList.toggle('active');
    });

    waPopup.querySelector('.wa-close').addEventListener('click', (e) => {
      e.stopPropagation();
      waPopup.classList.remove('active');
    });

    // Update link on click to ensure it's fresh (or handle redirect)
    waPopup.querySelector('.wa-start-btn').addEventListener('click', function (e) {
      this.href = getWhatsAppUrl();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!waPopup.contains(e.target) && !waButton.contains(e.target)) {
        waPopup.classList.remove('active');
      }
    });

    // Prevent closing when clicking inside popup
    waPopup.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  window.addEventListener('load', initWhatsApp);

})();

// =====================
// Services Dropdown Enhancements
// =====================
(function () {
  "use strict";

  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  const categoryItems = document.querySelectorAll('.category-item');
  const subcategoryItems = document.querySelectorAll('.subcategory-item');

  let isDropdownOpen = false;
  let activeDropdown = null;
  let activeCategory = null;

  document.addEventListener('DOMContentLoaded', function () {
    initializeMenubar();
  });

  function initializeMenubar() {
    setupDropdownToggles();
    setupCategoryInteractions();
    setupClickOutside();
    setupKeyboardNavigation();
    initializeAnimations();
    initializeDefaultSubmenu();
  }

  function initializeDefaultSubmenu() {
    const aiAutomationSubmenu = document.getElementById('ai-automation-submenu');
    if (aiAutomationSubmenu) {
      aiAutomationSubmenu.style.display = 'flex';
      aiAutomationSubmenu.classList.remove('hidden');
    }
  }

  function setupDropdownToggles() {
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const dropdownId = this.getAttribute('data-dropdown');
        toggleDropdown(dropdownId);
      });
    });
  }

  function toggleDropdown(dropdownId) {
    const targetDropdown = document.getElementById(`${dropdownId}-dropdown`);

    dropdownMenus.forEach(menu => {
      if (menu !== targetDropdown) {
        closeDropdown(menu);
      }
    });

    if (activeDropdown === targetDropdown) {
      closeDropdown(targetDropdown);
    } else {
      openDropdown(targetDropdown);
    }
  }

  function openDropdown(dropdown) {
    if (dropdown) {
      dropdown.classList.add('active');
      dropdown.style.display = 'block';

      const toggle = document.querySelector(`[data-dropdown="${dropdown.id.replace('-dropdown', '')}"]`);
      if (toggle) {
        toggle.parentElement.classList.add('active');
      }

      activeDropdown = dropdown;
      isDropdownOpen = true;

      requestAnimationFrame(() => {
        dropdown.style.opacity = '1';
        dropdown.style.transform = 'translateY(0)';
      });
    }
  }

  function closeDropdown(dropdown) {
    if (dropdown) {
      dropdown.classList.remove('active');

      const toggle = document.querySelector(`[data-dropdown="${dropdown.id.replace('-dropdown', '')}"]`);
      if (toggle) {
        toggle.parentElement.classList.remove('active');
      }

      setTimeout(() => {
        if (!dropdown.classList.contains('active')) {
          dropdown.style.display = 'none';
        }
      }, 400);

      if (activeDropdown === dropdown) {
        activeDropdown = null;
        isDropdownOpen = false;
      }
    }
  }

  function setupCategoryInteractions() {
    categoryItems.forEach(item => {
      item.addEventListener('mouseenter', function () {
        if (isDropdownOpen) {
          setActiveCategory(item);
        }
      });

      item.addEventListener('click', function (e) {
        e.preventDefault();
        if (isDropdownOpen) {
          setActiveCategory(item);
        }
      });
    });

    subcategoryItems.forEach(item => {
      item.addEventListener('click', function (e) {
        const link = this.querySelector('.subcategory-link');
        if (link && link.getAttribute('href') && link.getAttribute('href') !== '#') {
          window.location.href = link.href;
        }
      });
    });
  }

  function setActiveCategory(item) {
    const column = item.closest('.category-column');
    if (column) {
      const itemsInColumn = column.querySelectorAll('.category-item');
      itemsInColumn.forEach(catItem => {
        catItem.classList.remove('active');
      });
    }

    item.classList.add('active');
    activeCategory = item;
    updateSubcategoryVisibility(item);
  }

  function updateSubcategoryVisibility(activeItem) {
    const submenuType = activeItem.getAttribute('data-submenu');

    const allSubcategoryColumns = document.querySelectorAll('.subcategory-column');
    allSubcategoryColumns.forEach(column => {
      column.style.display = 'none';
      column.classList.add('hidden');
    });

    const targetSubmenu = document.getElementById(`${submenuType}-submenu`);
    if (targetSubmenu) {
      targetSubmenu.style.display = 'flex';
      targetSubmenu.classList.remove('hidden');

      requestAnimationFrame(() => {
        targetSubmenu.style.opacity = '1';
      });
    }
  }

  function handleSubcategoryClick(subcategoryName) {
    showNotification(`Selected: ${subcategoryName}`);
    console.log('Navigating to subcategory:', subcategoryName);
  }

  function setupClickOutside() {
    document.addEventListener('click', function (e) {
      const isClickInsideDropdown = Array.from(dropdownMenus).some(menu => menu.contains(e.target));
      const isClickOnToggle = Array.from(dropdownToggles).some(toggle => toggle.contains(e.target));
      const isClickInsideMobileMenu = e.target.closest('.mobile-services-menu');

      if (!isClickInsideDropdown && !isClickOnToggle && !isClickInsideMobileMenu && isDropdownOpen) {
        closeAllDropdowns();
      }
    });
  }

  function closeAllDropdowns() {
    dropdownMenus.forEach(menu => {
      closeDropdown(menu);
    });

    dropdownToggles.forEach(toggle => {
      toggle.parentElement.classList.remove('active');
    });

    isDropdownOpen = false;
    activeDropdown = null;
    activeCategory = null;
  }

  function setupKeyboardNavigation() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isDropdownOpen) {
        closeAllDropdowns();
      }

      if (isDropdownOpen && activeDropdown) {
        const currentColumn = activeCategory?.closest('.category-column');
        if (currentColumn) {
          const items = Array.from(currentColumn.querySelectorAll('.category-item'));
          const currentIndex = items.indexOf(activeCategory);

          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              navigateCategories(items, currentIndex, 'down');
              break;
            case 'ArrowUp':
              e.preventDefault();
              navigateCategories(items, currentIndex, 'up');
              break;
            case 'ArrowRight':
              e.preventDefault();
              navigateToNextColumn();
              break;
            case 'ArrowLeft':
              e.preventDefault();
              navigateToPreviousColumn();
              break;
          }
        }
      }
    });
  }

  function navigateCategories(items, currentIndex, direction) {
    let newIndex = currentIndex;

    if (direction === 'down') {
      newIndex = Math.min(currentIndex + 1, items.length - 1);
    } else if (direction === 'up') {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    if (newIndex !== currentIndex) {
      const newCategory = items[newIndex];
      setActiveCategory(newCategory);
      newCategory.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function navigateToNextColumn() {
    const columns = document.querySelectorAll('.category-column');
    const currentColumn = activeCategory?.closest('.category-column');
    const currentColumnIndex = Array.from(columns).indexOf(currentColumn);

    if (currentColumnIndex < columns.length - 1) {
      const nextColumn = columns[currentColumnIndex + 1];
      const firstItem = nextColumn.querySelector('.category-item');
      if (firstItem) {
        setActiveCategory(firstItem);
      }
    }
  }

  function navigateToPreviousColumn() {
    const columns = document.querySelectorAll('.category-column');
    const currentColumn = activeCategory?.closest('.category-column');
    const currentColumnIndex = Array.from(columns).indexOf(currentColumn);

    if (currentColumnIndex > 0) {
      const prevColumn = columns[currentColumnIndex - 1];
      const firstItem = prevColumn.querySelector('.category-item');
      if (firstItem) {
        setActiveCategory(firstItem);
      }
    }
  }

  function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
          entry.target.classList.add('animate-in');
        }
      });
    });

    categoryItems.forEach(item => observer.observe(item));
    subcategoryItems.forEach(item => observer.observe(item));
  }

  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="notification-text">${message}</div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        z-index: 10000;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        overflow: hidden;
    `;

    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            gap: 12px;
        }
        .notification-icon {
            color: #00d4aa;
            font-size: 20px;
        }
        .notification-text {
            flex: 1;
            color: #1a1a1a;
            font-size: 14px;
        }
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        .notification-close:hover {
            background: #f0f0f0;
            color: #1a1a1a;
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .animate-in {
            animation: fadeInUp 0.5s ease forwards;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 4000);
  }

  // Prevent multiple initializations
  let mobileMenuInitialized = false;

  function setupMobileMenu() {
    // Prevent multiple initializations
    if (mobileMenuInitialized) {
      return;
    }

    let mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!navMenu) {
      console.warn('Nav menu not found');
      return;
    }

    if (!mobileMenuToggle) {
      mobileMenuToggle = document.createElement('button');
      mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
      mobileMenuToggle.className = 'mobile-menu-toggle';
      mobileMenuToggle.setAttribute('aria-label', 'Toggle mobile menu');
      mobileMenuToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            color: #1a1a1a;
            cursor: pointer;
            padding: 10px;
            border-radius: 8px;
            transition: all 0.3s ease;
        `;

      const navContainer = document.querySelector('.nav-container');
      if (navContainer) {
        navContainer.appendChild(mobileMenuToggle);
      }
    }

    // Add click event listener with proper event handling
    mobileMenuToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!navMenu) {
        console.error('Nav menu not found');
        return;
      }

      // Toggle active classes
      const isActive = navMenu.classList.contains('active');
      navMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');

      if (!isActive) {
        // Menu is now open
        if (typeof closeAllDropdowns === 'function') {
          closeAllDropdowns();
        }
      }
    });

    // Close menu when nav links are clicked (for sm and md screens)
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        // Do not close if it's a dropdown toggle
        if (this.classList.contains('dropdown-toggle') || this.hasAttribute('data-dropdown')) {
          return;
        }

        // Only close menu on sm and md screens (below 992px)
        if (window.innerWidth < 992) {
          navMenu.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
      });
    });

    // Mark as initialized
    mobileMenuInitialized = true;
  }

  // Ensure setupMobileMenu runs after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileMenu);
  } else {
    // DOM is already ready
    setupMobileMenu();
  }

  // Use window object to avoid redeclaration errors if script loads twice
  if (typeof window.mobileMenuResizeTimeout === 'undefined') {
    window.mobileMenuResizeTimeout = null;
  }

  window.addEventListener('resize', function () {
    clearTimeout(window.mobileMenuResizeTimeout);
    window.mobileMenuResizeTimeout = setTimeout(function () {
      // Close menu when resizing to desktop size (992px and above)
      if (window.innerWidth >= 992) {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (navMenu) {
          navMenu.classList.remove('active');
        }
        if (mobileMenuToggle) {
          mobileMenuToggle.classList.remove('active');
        }
      }
    }, 250);
  });

  window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';

    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  // Gallery Interaction
  const imgContainers = document.querySelectorAll('.img-container');
  imgContainers.forEach(container => {
    const content = container.querySelector('.img-content-hover');
    if (content) {
      container.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        content.style.left = (x + 20) + 'px';
        content.style.top = (y + 20) + 'px';
      });
    }
  });

  window.KriraAIMenubar = {
    toggleDropdown,
    openDropdown,
    closeDropdown,
    closeAllDropdowns,
    setActiveCategory,
    showNotification
  };
})();

/**
 * Footer Dropdown Toggle for Mobile
 */
(function () {
  "use strict";

  document.addEventListener('DOMContentLoaded', function () {
    const footerToggles = document.querySelectorAll('.footer-dropdown-toggle');

    footerToggles.forEach(toggle => {
      toggle.addEventListener('click', function () {
        // Only toggle on mobile/tablet (991px and below)
        if (window.innerWidth <= 991) {
          const footerLinks = this.closest('.footer-links');
          if (footerLinks) {
            footerLinks.classList.toggle('active');
          }
        }
      });
    });
  });
})();

/**
 * Mobile Services Menu Accordion
 */
// ==========================================================================
// Mobile Services Menu Accordion Logic
// ==========================================================================
(function () {
  "use strict";

  function initMobileAccordion() {
    // Select all category headers (using class from HTML)
    const categoryItems = document.querySelectorAll('.mobile-category-item');

    if (categoryItems.length === 0) return;

    categoryItems.forEach(item => {
      // Clone to remove old listeners (cleanup)
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);

      newItem.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const targetId = this.getAttribute('data-target');
        const targetContainer = document.getElementById(targetId);

        // Check if currently active
        const isActive = this.classList.contains('active');

        // Accordion behavior: Close all others
        document.querySelectorAll('.mobile-category-item').forEach(catItem => {
          catItem.classList.remove('active');
        });

        document.querySelectorAll('.mobile-subcategories-container').forEach(container => {
          container.classList.add('hidden');
        });

        // Toggle current item
        if (!isActive) {
          this.classList.add('active');
          if (targetContainer) {
            targetContainer.classList.remove('hidden');
          }
        }
      });
    });
  }

  // Initialize on load and DOMContentLoaded to be safe
  window.addEventListener('load', initMobileAccordion);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileAccordion);
  } else {
    initMobileAccordion();
  }
})();
