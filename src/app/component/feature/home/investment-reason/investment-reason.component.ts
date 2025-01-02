import { Component } from '@angular/core';
import { NavComponent } from '../../../layout/nav/nav.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface InvestmentSection {
  title?: string;
  content: string[];
  image?: string;
}

@Component({
  selector: 'app-investment-reason',
  imports: [ NavComponent, CommonModule ],
  templateUrl: './investment-reason.component.html',
  styleUrl: './investment-reason.component.scss'
})
export class InvestmentReasonComponent {
  description = 'Mỗi nhà đầu tư đều có mục tiêu tài chính riêng biệt. Đó là lý do tại sao chúng tôi đa dạng hóa quỹ đầu tư, mang đến sự linh hoạt và khả năng tận dụng các ưu đãi sản phẩm phù hợp. Bất kể bạn đang tìm kiếm giải pháp cho việc đầu tư cho con cái, mua nhà đất, chuẩn bị cho kế hoạch nghỉ hưu hoặc đơn giản là quản lý thu nhập thụ động, chúng tôi luôn có những gói vốn phù hợp để đáp ứng nhu cầu của bạn.';

  sections: InvestmentSection[] = [
    {
      title: 'An toàn dự án Vingroup bao gồm:',
      content: [
        '- Tính thanh khoản cao và khả năng hoàn trả nhanh chóng, đầu tư vào quỹ của chúng tôi mang lại sự tiện lợi tương tự như tiết kiệm nhưng với mức lợi nhuận hấp dẫn hơn, là sự thay thế lý tưởng cho các hình thức đầu tư khác như bất động sản hay kinh doanh.',
        '- Tất cả các dự án đầu tư của Tập đoàn Vingroup được quản lý một cách chặt chẽ và minh bạch, được giám sát bởi các cơ quan độc lập như Ủy ban Chứng khoán Nhà nước và Ngân hàng. Chúng tôi cam kết cung cấp thông tin rõ ràng và chi tiết về lãi suất, các khoản vốn đầu tư, để bạn luôn yên tâm và tin tưởng khi tham gia.',
        '- Sản phẩm bảo hiểm liên kết của Tập đoàn Bảo Việt là sự bảo đảm vững chắc cho tài chính và đầu tư của bạn. Với các giải pháp thông minh này, chúng tôi cam kết đảm bảo các quyền lợi của nhà đầu tư và tạo ra sự ổn định vững chắc cho tương lai tài chính của bạn.',
      ],
      image: 'assets/images/imgz2.png'
    },
    {
      title: 'Tài sản đầu tư được quản lý chuyên nghiệp:',
      content: [
        'Tài sản của bạn sẽ được quản lý bởi những chuyên gia có kinh nghiệm sâu rộng trong lĩnh vực Tài chính và Quỹ đầu tư. Nghiên cứu và quản lý rủi ro là những kỹ năng quan trọng để ra quyết định đầu tư, nhưng hầu hết các nhà đầu tư cá nhân thiếu thời gian và chuyên môn để làm điều này.',
        'Một hệ thống quản lý quỹ chuyên nghiệp sẽ giúp bạn theo dõi thường xuyên các biến động và rủi ro thị trường, tối đa hóa lợi nhuận từ đầu tư.',
      ],
      image: 'assets/images/imgz3.png'
    },
    {
      title: 'Chủ động kiểm soát mục tiêu tài chính:',
      content: [
        'Mỗi nhà đầu tư đều có mục tiêu tài chính riêng. Đa dạng hóa quỹ đầu tư có thể giúp bạn linh hoạt với nguồn vốn và tận dụng các ưu đãi sản phẩm phù hợp. Bạn có thể lựa chọn các gói vốn phù hợp với nhu cầu tài chính hiện tại và tương lai, từ đầu tư cho con cái, mua nhà đất, đến kế hoạch nghỉ hưu và quản lý thu nhập thụ động.',
      ],
      image: 'assets/images/imgz4.png'
    },
    {
      title: 'Tính linh hoạt và thanh khoản cao:',
      content: [
        'So với bất động sản hay kinh doanh, đầu tư vào quỹ có tính thanh khoản cao hơn. Quỹ đầu tư có thể hoàn trả số tiền đầu tư ngay lập tức vào tài khoản ngân hàng đã đăng ký, tương tự như tiết kiệm nhưng với lợi nhuận cao hơn. Đây là giải pháp thay thế hấp dẫn cho tiết kiệm định kỳ.',
      ],
      image: 'assets/images/imgz5.png'
    },
    {
      title: 'Quản lý rõ ràng và minh bạch:',
      content: [
        'Quỹ đầu tư dự án của Tập đoàn Vingroup được quản lý chặt chẽ bởi các cơ quan giám sát độc lập như Ủy ban Chứng khoán Nhà nước và Ngân hàng. Quy trình đầu tư được thực hiện một cách minh bạch và rõ ràng, thông tin chi tiết về lãi suất và các khoản vốn đầu tư được công khai đến người tham gia định kỳ.',
      ],
      image: ''
    },
    {
      title: 'Sản phẩm bảo hiểm liên kết bảo vệ tài chính và quỹ đầu tư:',
      content: [
        'Sản phẩm bảo hiểm liên kết của Tập đoàn Bảo Việt kết hợp bảo vệ tài chính và đầu tư, đảm bảo các quyền lợi cho nhà đầu tư khi tham gia vào các dự án đầu tư của Tập đoàn Vingroup. Đây là sự lựa chọn thông minh cho những ai quan tâm đến việc bảo vệ vốn đầu tư và đảm bảo sự ổn định tài chính trong tương lai.',
      ],
      image: 'assets/images/imgz6.png'
    }
  ];
  
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/vinclub']);
  }
}
