import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavComponent } from '../../../layout/nav/nav.component';

@Component({
  selector: 'app-target',
  imports: [CommonModule, NavComponent],
  templateUrl: './target.component.html',
  styleUrl: './target.component.scss'
})
export class TargetComponent {
  targets = [
    {
      title: '1. Tạo Ra Sự Ổn Định Tài Chính:',
      descriptions: [
        'Dự Phòng Khẩn Cấp: Đảm bảo có đủ nguồn lực tài chính để ứng phó với các tình huống khẩn cấp bất ngờ, như mất việc làm, bệnh tật, hoặc các sự cố lớn.',
        'An Toàn Tài Chính: Xây dựng một nền tảng tài chính vững chắc để giảm thiểu rủi ro tài chính và bảo vệ trước các biến động không lường trước.'
      ],
      images: ['Picture1.png', 'Picture2.png']
    },
    {
      title: '2. Đáp Ứng Các Nhu Cầu Ngắn Hạn',
      descriptions: [
        'Chi Phí Sinh Hoạt: Đảm bảo có đủ tài chính để trang trải các chi phí sinh hoạt hàng ngày như tiền thuê nhà, thực phẩm, và các hóa đơn hàng tháng.',
        'Chi Tiêu Đặc Biệt: Tiết kiệm để đáp ứng các chi phí ngắn hạn như kỳ nghỉ, sửa chữa nhà cửa, hoặc mua sắm đồ dùng lớn.'
      ],

    },
    {
      title: '3. Chuẩn Bị Cho Tương Lai Dài Hạn:',
      descriptions: [
        'Giáo Dục: Tích lũy tiền để tài trợ cho chi phí giáo dục của con cái, bao gồm học phí và các chi phí liên quan khác. Đảm bảo tài chính cho việc học hành, giáo dục và các nhu cầu tương lai của con cái.',
        'Giải Pháp: Bạn có thể lựa chọn các sản phẩm đầu tư dài hạn như quỹ giáo dục hoặc hợp đồng bảo hiểm liên kết đầu tư, giúp tích lũy tiền theo thời gian. Các quỹ tiết kiệm giáo dục hoặc tài khoản tiết kiệm với lãi suất cao cũng là lựa chọn tốt.'
      ],
      images: ['Picture3.png', 'Picture4.png']
    },
    {
      title: '4. Chuẩn Bị Cho Tương Lai Dài Hạn:',
      descriptions: [
        'Kế Hoạch Hưu Trí: Xây dựng quỹ hưu trí đề đảm bảo có nguồn tài chính đủ cho cuộc sống khi về hưu. Tạo ra nguồn thu nhập đủ để duy trì cuộc sống thoải mái khi về hưu.',
        'Quỹ Đầu Tư Dài Hạn: Các quỹ hưu trí, bảo hiểm hưu trí, hoặc quỹ đầu tư dài hạn có thể là lựa chọn tốt. Bằng cách đầu tư vào các sản phẩm này, bạn có thể đảm bảo có nguồn thu nhập ổn định và đáng tin cậy khi nghỉ hưu, nhằm gia tăng tài sản và đạt được các mục tiêu tài chính lớn hơn.'
      ],
      images: ['Picture5.png', 'Picture6.png']
    },
    {
      title: '5. Xây Dựng Tài Sản Cá Nhân & Gia Tăng Giá Trị Tài Chính:',
      descriptions: [
        'Tăng Trưởng Tài Chính: Quản lý quỹ tích lũy một cách hiệu quả để gia tăng giá trị tài sản theo thời gian thông qua các khoản đầu tư sinh lợi, tích lũy vốn để mua bất động sản hoặc đầu tư vào thị trường bất động sản.',
        'Tạo Ra Thu Nhập Thụ Động: Sử dụng quỹ tích lũy để đầu tư vào các tài sản tạo ra thu nhập thụ động như bất động sản, có thể sử dụng các quỹ đầu tư bất động sản (REITS), quỹ đầu tư định kỳ, hoặc tiết kiệm hàng tháng để tạo quỹ mua nhà. Việc đầu tư vào quỹ đầu tư bất động sản có thể giúp bạn tiếp cận thị trường bất động sản mà không cần phải mua trực tiếp.'
      ],
      images: ['Picture7.png', 'Picture8.png']
    },
    {
      title: '6. Di Sản và Kế Hoạch Thừa Kế:',
      descriptions: [
        'Di Sản Tài Chính: Tích lũy tài sản để có thể để lại cho thế hệ sau hoặc cho các mục đích từ thiện, góp phần vào việc xây dựng di sản cá nhân hoặc gia đình.',
        'Kế Hoạch Thừa Kế: Xây dựng kế hoạch thừa kế để đảm bảo rằng tài sản được phân chia theo mong muốn và giảm thiểu các vấn đề pháp lý liên quan.'
      ],
    }

  ];

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/vinclub']);
  }
}
