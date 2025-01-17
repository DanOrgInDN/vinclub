import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  standalone: true,
  imports: [CommonModule]
})


export class IndexComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  private thumbsSwiper1: Swiper | null = null;
  private mainSwiper1: Swiper | null = null;
  private thumbsSwiper2: Swiper | null = null;
  private mainSwiper2: Swiper | null = null;
  activeStep = 1;
  activeAccordion: number | null = null;
  isMenuOpen = false;
  faqItems: FaqItem[] = [

    {
      question: "1. Ai có thể trở thành thành viên của VinClub?",
      answer: "Đối tượng tham gia là quản lý cấp cao và đối tác chiến lược của Tập đoàn, không giới hạn về quốc tịch và việc tham gia VinClub không trái với pháp luật của nước sở tại"
    },
    {
      question: "2. Cách đăng ký và đăng nhập VinClub?",
      answer: `<strong>Cách đăng ký tài khoản trên ứng dụng VinClub:</strong>
        <ul>
          <li>B1: Tải ứng dụng VinClub tại link: <a href="/download">Tại Đây</a></li>
          <li>B2: Đăng ký tài khoản VinClub bằng mã tham chiếu</li>
          <li>B3: Điển các thông tin cần thiết theo yêu cầu</li>
          <li>B4: Thiết lập thông tin cá nhân gồm Họ tên, Số điện thoại và Hoàn tất đăng ký</li>
        </ul>
        <strong>Cách đăng nhập tài khoản trên ứng dụng VinClub:</strong>
        <ul>
          <li>B1: Nhập tên đăng nhập đã đăng ký trước đó</li>
          <li>B2: Nhập mật khẩu đã đăng ký</li>
          <li>B3: Ấn đăng nhập để truy cập</li>
        </ul>`
    },
    {
      question: "3. Khi giao dịch đạt mức điều kiện xét hạng, tôi làm gì để hệ thống ghi nhận việc lên hạng?",
      answer: `Thành viên VinClub chỉ cần đạt đủ doanh số điều kiện nâng hạng tại 1 trong 6 hạng mục hàng hóa/dịch vụ quy định cụ thể tại Điều Khoản và Điều Kiện của Chương Trình sẽ được hệ thống tự động ghi nhận nâng hạng. Trong trường hợp
đã đạt đủ điều kiện nâng hạng mà vẫn chưa được hệ thống ghi nhận, khách hàng vui lòng liên hệ hotline 1900-999-911 để được hỗ trợ.`
    },
    {
      question: "4. Tôi được tích VPoint khi nào?",
      answer: `<p>Thành viên VinClub hạng Vàng (Gold) trở lên được tích VPoint khi đã hoàn thành thanh toán cho các giao dịch mua hàng hóa, dịch vụ của các đối tác tham gia Chương Trình, bao gồm:</p>
      <ul>
        <li>Hàng hóa, dịch vụ của VinFast;</li>
        <li>Dịch vụ khám, chữa bệnh của Vinmec;</li>
        <li>Bất động sản mang thương hiệu Vinhomes;</li>
        <li>Dịch vụ nghỉ dưỡng và vui chơi giải trí Vinpearl/VinWonders/Vinpearl Golf;</li>
        <li>Hàng hóa, dịch vụ giáo dục Vinschool;</li>
        <li>Dịch vụ vận tải Xanh SM.</li>
      </ul>
      <p>Đối tác tham gia Chương Trình bao gồm Vingroup, các công ty thành viên của Vingroup, và các đối tác của công ty có thỏa thuận tham gia Chương Trình.</p>`
    },
    {
      question: "5. Điểm VPoint có thể sử dùng vào những việc gì?",
      answer: `<p>Thành viên có thể sử dụng VPoint để:</p>
      <ul>
        <li>Mua, quy đổi thành quà tặng, sản phẩm, dịch vụ, hoặc phiếu khuyến mại, ưu đãi (voucher) đối tác tham gia Chương Trình cung cấp;</li>
        <li>Tặng, cho các thành viên khác; hoặc</li>
        <li>Phục vụ các mục đích, hoạt động khác theo thông báo, phổ biến trên các kênh của VinClub, tùy từng thời điểm.</li>
      </ul>
      <p><strong>*Lưu ý:</strong> Quý khách hàng vui lòng đọc kỹ các điều khoản loại trừ (nếu có) khi áp dụng tiêu VPoint của từng đối tác của Chương Trình.</p>`
    },
    {
      question: "6. Căn cứ tích VPoint là giá trên hóa đơn hay giá bán?",
      answer: "Căn cứ tích VPoint dựa trên giá trên hóa đơn đã bao gồm thuế GTGT, sau khi đã khấu trừ chiết khấu/khuyến mại khác (nếu có) theo chính sách bán hàng của các đối tác tham gia Chương Trình."
    },
    {
      question: "7. Những trường hợp nào KHÔNG áp dụng được chính sách tích VPoint?",
      answer: `<p>Những trường hợp không được áp dụng chính sách tích VPoint:</p>
      <ul>
        <li>Khách hàng không phải thành viên của VinClub;</li>
        <li>Khách hàng là thành viên VinClub nhưng chưa đạt hạng thành viên Gold trở lên;</li>
        <li>Với thương hiệu Vinhomes: Các sản phẩm/dịch vụ không phải là giao dịch Bất động sản;</li>
        <li>Với thương hiệu Vinmec:
          <ul>
            <li>Sản phẩm/dịch vụ y tế bị khống chế giá bán/không chế tỷ lệ lợi nhuận;</li>
            <li>Phần doanh thu được chi trả bởi bên thứ ba;</li>
            <li>Các dịch vụ y tế cung cấp bởi đối tác hợp tác với Vinmec, đối tác đồng thương hiệu;</li>
          </ul>
        </li>
        <li>Với thương hiệu Xanh SM:
          <ul>
            <li>Khách hàng thanh toán bằng tài khoản thẻ doanh nghiệp, Xanh E-Card;</li>
            <li>Khách hàng sử dụng các dịch vụ Xanh Tour, Xanh Airport, Xanh đường dài, Xanh Partner, đặt xe Xanh qua nền tảng đối tác; và</li>
            <li>Khách hàng thanh toán tip, bảo hiểm và các loại phụ phí khác do Xanh SM thu hộ chi hộ, hoặc các chi phí phụ trội phát sinh sau thời điểm đặt cuốc đi trên ứng dụng (phụ phí giờ chờ, phụ phí km...).</li>
          </ul>
        </li>
        <li>Với thương hiệu Vinschool: học phí trước năm học 2025 - 2026 và các khoản không phải là học phí.</li>
        <li>Với Vinpearl: Các dịch vụ được đặt lẻ từ nhà cung cấp ngoài như vé tàu hỏa, tour, vé tàu biển,... hoặc các dịch vụ được đặt từ đại lý.</li>
      </ul>`
    },
    {
      question: "8. Thời hạn sử dụng VPoint?",
      answer: "VPoint không có giới hạn thời hạn sử dụng."
    },
    {
      question: "9. Thành viên VinClub được tiêu tối đa bao nhiêu VPoint trong mỗi lần giao dịch?",
      answer: "Thành viên được tiêu toàn bộ số VPoint khả dụng hiện đang sở hữu, không giới hạn và không cần giữ lại VPoint tối thiểu."
    },
    {
      question: "10. Quyền lợi khác ngoài tích, tiêu VPoint khi là thành viên của VinClub",
      answer: "Ngoài các quyền lợi tài chính nhận được khi là thành viên của VinClub, thành viên còn nhận được những quyền lợi phi tài chính hấp dẫn khác từ đối tác của Chương Trình. Chi tiết các đặc quyền phi tài chính sẽ được VinClub công bố trong thời gian sớm nhất."
    },
    {
      question: "11. Thành viên VinClub là người nước ngoài có được hưởng đầy đủ quyền lợi, ưu đãi hay không?",
      answer: "Người nước ngoài được hưởng đầy đủ quyền lợi ưu đãi thành viên VinClub, áp dụng trên lãnh thổ Việt Nam."
    },{
      question: "12. Tôi có thể tìm kiếm thông tin chính thức về VinClub ở đâu?",
      answer: `<p>Thành viên có thể cập nhật các thông tin chính thức và mới nhất về VinClub tại:</p>
      <ul>
        <li>Website: <a href="https://vinclub68.com">VinClub</a></li>
        <li>Ứng dụng di động VinClub; hoặc</li>
        <li>Hotline: 1900-999-911.</li>
      </ul>`
    },
    {
      question: "13. Thẻ VinClub có in ra được không hay chỉ có trên app?",
      answer: "Hướng tới việc bảo vệ môi trường cũng như đảm bảo thuận tiện cho thành viên, VinClub chỉ cung cấp thẻ điện tử trên các nền tảng của VinClub."
    },
    {
      question: "14. Tôi cần làm gì để liên kết tài khoản VinClub với các thương hiệu mà tôi sở hữu?",
      answer: `<p>Để liên kết tài khoản VinClub với các tài khoản mà khách hàng đang sở hữu tại các đối tác của Chương Trình (VinFast, Vinhomes, Vinpearl, Vinmec, Vinschool, Xanh SM), khách hàng cần sử dụng đúng số điện thoại hoặc email mà khách hàng đã dùng để đăng ký các tài khoản đó để đăng ký tài khoản VinClub.</p>
      <p>Trường hợp có nhu cầu thay đổi số điện thoại hoặc email khác, khách hàng cần đồng thời cập nhật với các đối tác tương ứng để được đồng bộ thông tin và quyền lợi.</p>`
    },
    {
      question: "15. Các giao dịch mua hàng trước 8/8/2024 có được tích VPoint trên VinClub hay không?",
      answer: "Các giao dịch mua hàng trước ngày 8/8/2024 chỉ được sử dụng để xét hạng thành viên, không được tích VPoint."
    },
  ];

  isExpanded = false;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initDropdown();
      this.initSmoothScroll();
      this.initTabs();
      this.initTabsRegister();
      this.initSwipers();
    }
  }



  private initSmoothScroll() {
    const menuItems = document.querySelectorAll('.menu-main__item');
    const headerOffset = 64;

    menuItems.forEach(item => {
      const link = item.querySelector('.menu-main__link');

      // Skip if it's a download link
      if (link?.classList.contains('download-link')) {
        return;
      }

      link?.addEventListener('click', (e) => {
        e.preventDefault();

        // Get target section id from href
        const href = link?.getAttribute('href');

        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('is-active'));

            // Add active class to clicked item
            item.classList.add('is-active');

            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Update active menu item on scroll
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + headerOffset + 100; // Add offset for better detection

      menuItems.forEach(item => {
        const targetId = item.getAttribute('data-scrollnav-target');
        const targetSection = document.getElementById(targetId || '');

        if (targetSection) {
          const sectionTop = targetSection.offsetTop;
          const sectionBottom = sectionTop + targetSection.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            menuItems.forEach(i => i.classList.remove('is-active'));
            item.classList.add('is-active');
          }
        }
      });
    });
  }

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

  private initSwipers() {
    this.thumbsSwiper1 = new Swiper('.slider-guide-thumb-1', {
      modules: [Navigation, Thumbs],
      direction: 'vertical',
      slidesPerView: 4,
      spaceBetween: 10,
      watchSlidesProgress: true,
      height: 400,
      autoHeight: false
    });

    new Swiper('.slider-guide-content-1', {
      modules: [Navigation, Thumbs],
      navigation: {
        nextEl: '.slider-guide-content-1 .swiper-button-next',
        prevEl: '.slider-guide-content-1 .swiper-button-prev',
      },
      thumbs: {
        swiper: this.thumbsSwiper1
      }
    });

    const thumbSwiper2 = new Swiper('.slider-guide-thumb-2', {
      modules: [Thumbs],
      direction: 'vertical',
      slidesPerView: 4,
      spaceBetween: 10,
      watchSlidesProgress: true,
    });

    new Swiper('.slider-guide-content-2', {
      modules: [Navigation, Thumbs],
      navigation: {
        nextEl: '.slider-guide-content-2 .swiper-button-next',
        prevEl: '.slider-guide-content-2 .swiper-button-prev',
      },
      thumbs: {
        swiper: thumbSwiper2
      }
    });
  }

  private initTabsRegister() {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabItems.forEach(item => {
      item.addEventListener('click', () => {
        tabItems.forEach(tab => tab.classList.remove('is-active'));
        tabContents.forEach(content => content.classList.remove('is-active'));

        item.classList.add('is-active');
        const target = item.getAttribute('data-tab-target');
        document.getElementById(target || '')?.classList.add('is-active');

        setTimeout(() => {
          this.initSwipers();
        }, 100);
      });
    });
  }

  setActiveStep(step: number) {
    this.activeStep = step;
  }

  toggleAccordion(index: number) {
    this.activeAccordion = this.activeAccordion === index ? null : index;
  }

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.classList.remove('menu-open');
  }


}
