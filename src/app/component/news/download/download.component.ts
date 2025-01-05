import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-download',
  imports: [],
  templateUrl: './download.component.html',
  styleUrl: '../../news/index.component.scss'
})
export class DownloadComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initDropdown();
      // this.initSmoothScroll();
      this.initTabs();
    }
  }

  // private initSmoothScroll() {
  //   const menuItems = document.querySelectorAll('.menu-main__item');
  //   const headerOffset = 64;

  //   menuItems.forEach(item => {
  //     const link = item.querySelector('.menu-main__link');
      
  //     // Skip if it's a download link
  //     if (link?.classList.contains('download-link')) {
  //       return;
  //     }

  //     link?.addEventListener('click', (e) => {
  //       e.preventDefault();
        
  //       // Get target section id from href
  //       const href = link?.getAttribute('href');
        
  //       if (href && href.startsWith('#')) {
  //         const targetId = href.substring(1);
  //         const targetSection = document.getElementById(targetId);
          
  //         if (targetSection) {
  //           // Remove active class from all items
  //           menuItems.forEach(i => i.classList.remove('is-active'));
            
  //           // Add active class to clicked item
  //           item.classList.add('is-active');

  //           const elementPosition = targetSection.getBoundingClientRect().top;
  //           const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  //           window.scrollTo({
  //             top: offsetPosition,
  //             behavior: 'smooth'
  //           });
  //         }
  //       }
  //     });
  //   });

  //   // Update active menu item on scroll
  //   window.addEventListener('scroll', () => {
  //     const scrollPosition = window.scrollY + headerOffset + 100; // Add offset for better detection

  //     menuItems.forEach(item => {
  //       const targetId = item.getAttribute('data-scrollnav-target');
  //       const targetSection = document.getElementById(targetId || '');
        
  //       if (targetSection) {
  //         const sectionTop = targetSection.offsetTop;
  //         const sectionBottom = sectionTop + targetSection.offsetHeight;
          
  //         if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
  //           menuItems.forEach(i => i.classList.remove('is-active'));
  //           item.classList.add('is-active');
  //         }
  //       }
  //     });
  //   });
  // }

  private initDropdown() {
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownTrigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu?.classList.toggle('show');
    });

    // Đóng dropdown khi click ra ngoài
    document.addEventListener('click', (e) => {
      if (!dropdownMenu?.contains(e.target as Node)) {
        dropdownMenu?.classList.remove('show');
      }
    });
  }

  private initTabs() {
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(item => {
      const link = item.querySelector('.tab-link');
      link?.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs
        tabItems.forEach(tab => tab.classList.remove('is-active'));
        
        // Add active class to clicked tab
        item.classList.add('is-active');
        
        // Hide all tab contents
        const allTabContents = document.querySelectorAll('.tab-content');
        allTabContents.forEach(content => content.classList.remove('is-active'));
        
        // Show selected tab content
        const targetId = item.getAttribute('data-tab-target');
        const targetContent = document.getElementById(targetId || '');
        if (targetContent) {
          targetContent.classList.add('is-active');
        }
      });
    });
  }
}
