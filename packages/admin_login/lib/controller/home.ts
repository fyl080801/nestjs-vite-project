import { Controller } from '@nestjs/common';
import { View } from '@seed/vite_service';

@Controller('admin_login')
export class HomeController {
  @View('admin_login/index.html')
  async index() {
    return {
      title: 'Admin Login',
    };
  }
}
