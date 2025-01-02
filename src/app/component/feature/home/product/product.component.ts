import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [NavComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  productInfo = {
    title: 'Quỹ Đầu Tư Vingroup: Quỹ Đầu Tư Phát Triển',
    image: '/images/pic9.png',
    sections: [
      {
        title: '1. Tổng Quan Về Quỹ',
        content: [
          'Quỹ Đầu Tư Phát Triển: tập trung vào việc đầu tư vào tập đoàn Vingroup và các công ty con thuộc tập đoàn này. Mục tiêu của quỹ là sử dụng vốn đầu tư để hỗ trợ các dự án và hoạt động của Vingroup, từ đó tạo ra lợi nhuận cao cho nhà đầu tư thông qua việc phân phối lợi nhuận thu được từ các hoạt động của tập đoàn.'
        ]
      },
      {
        title: '2. Cách Thức Hoạt Động',
        content: [
          'Đầu Tư Vào Vingroup: Quỹ sẽ đầu tư vào cổ phiếu của Vingroup hoặc các công ty con của tập đoàn. Các khoản đầu tư này có thể bao gồm việc mua cổ phần trực tiếp hoặc đầu tư vào các dự án cụ thể mà tập đoàn đang triển khai.',
          'Đầu Tư Vào Dự Án: Vingroup sử dụng số tiền đầu tư để phát triển các dự án lớn, bao gồm bất động sản, công nghệ, y tế, và giáo dục Các dự án này có khả năng sinh lợi cao và tạo ra giá trị gia tăng cho tập đoàn.'
        ]
      },
      {
        title: '3. Phân Bổ Vốn',
        content: [
          'Cổ Phiếu Tập Đoàn: Một phần vốn sẽ được đầu tư vào cổ phiếu của Vingroup và các công ty con của tập đoàn trên thị trường chứng khoán. Dự Án Đầu Tư: Một phần vốn sẽ được dùng để đầu tư vào các dự án cụ thể của Vingroup, như các khu đô thị mới, dự án công nghệ cao, hoặc các sản phẩm dịch vụ mới.',
          'Quản Lý Rủi Ro: Vốn đầu tư sẽ được phân bố và điều chỉnh dựa trên hiệu suất và tiềm năng sinh lời của từng lĩnh vực đầu tư.'
        ]
      },
      {
        title: '4. Minh Bạch Và Báo Cáo',
        content: [
          'Báo Cáo Định Kỳ: Nhà đầu tư sẽ nhận được báo cáo hàng tháng hoặc hàng quý về tình hình đầu tư, bao gồm thông tin chi tiết về danh mục đầu tư, hiệu suất của cổ phiếu Vingroup, và kết quả từ các dự án cụ thể.',
          'Thông Tin Dự Án: Cung cấp thông tin chi tiết về các dự án mà quỹ đang đầu tư, bao gồm tiến độ dự án, dự báo lợi nhuận, và các rủi ro tiềm ẩn.',
          'Nhóm Quản Lý: Công khai thông tin về đội ngũ quản lý quỹ và các chuyên gia đầu tư chịu trách nhiệm về chiến lược đầu tư và quản lý rủi ro.'
        ]
      },
      {
        title: '5. Lợi Nhuận Và Đầu Tư',
        content: [
          'Lợi Nhuận Từ Cổ Phiếu: Nhà đầu tư sẽ nhận được lợi nhuận từ việc tăng giá cổ phiếu của Vingroup và các công ty con, cùng với cổ tức nếu có.',
          'Lợi Nhuận Từ Dự Án: Lợi nhuận từ các dự án đầu tư sẽ được phân phối cho nhà đầu tư theo tỷ lệ vốn góp. Lợi nhuận này có thể được tính toán dựa trên doanh thu và lợi nhuận của các dự án cụ thể.'
        ]
      },
      {
        title: '6. Ví Dụ Cụ Thể',
        content: [
          'Đầu Tư Vào Cổ Phiếu: Quỹ đầu tư 10.000.000VND vào cổ phiếu của Vingroup. Nếu cổ phiếu tăng 5% trong một tháng, nhà đầu tư có thể nhận lợi nhuận 500.000VND từ khoản đầu tư này.',
          'Đầu Tư vào Dự Án: Quỹ đầu tư 20.000.000VND vào một dự án bất động sản của Vingroup. Dự kiến dự án này sẽ mang lại lợi nhuận 10% trong vòng 6 tháng, tức là 2.000.000VND lợi nhuận cho nhà đầu tư.'
        ]
      },
      {
        title: '7. Cam Kết An Toàn',
        content: [
          'Quản Lý Rủi Ro Quỹ: thực hiện các biện pháp quản lý rủi ro chặt chẽ, bao gồm phân tích thị trường và đánh giá tiềm năng của các dự án đầu tư.',
          'Bảo Mật Thông Tin: Tất cả thông tin liên quan đến đầu tư và lợi nhuận được bảo mật và chỉ có nhà đầu tư mới có quyền truy cập.'
        ]
      },
      {
        title: 'Kết Luận',
        content: [
          'Việc đầu tư vào Vingroup: và các công ty con của nó có thể mang lại lợi nhuận cao nếu tập đoàn phát triển mạnh mẽ và các dự án của nó thành công. Tuy nhiên, cần đảm bảo rằng bạn cung cấp thông tin minh bạch về các khoản đầu tư và kết quả của các dự án để tạo sự tin tưởng và an tâm cho các nhà đầu tư. Sự rõ ràng trong cách thức hoạt động của quỹ và cam kết về quản lý rủi ro sẽ giúp bạn thu hút và giữ chân các nhà đầu tư.'
        ]
      }


    ]
  };

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/vinclub']);
  }
}
