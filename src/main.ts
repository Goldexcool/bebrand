import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('BeBrand E-commerce API')
    .setDescription(
      `
## Welcome to BeBrand API Documentation

A comprehensive e-commerce REST API built with NestJS, MongoDB, and JWT authentication.

### Features
- 🔐 **JWT Authentication** - Secure login and registration
- 👥 **User Management** - Complete user profile management
- 📦 **Product Catalog** - Full CRUD operations for products
- 🛒 **Order Management** - Create and track orders
- 👨‍💼 **Admin Panel** - 11 separate admin endpoints for complete control
- 📊 **Analytics** - Revenue and order analytics

### Quick Start
1. **Register** a new user via \`POST /auth/register\`
2. **Login** to get your JWT token via \`POST /auth/login\`
3. Click the **Authorize** button (🔓) and enter: \`Bearer YOUR_TOKEN\`
4. Start making authenticated requests!

### Admin Endpoints
All admin endpoints require JWT authentication:
- Dashboard with statistics
- User management (list, view, delete)
- Order management (list, view, update, delete)
- Revenue analytics
- Order analytics

### Available Servers
- **Production**: https://bebrand-eoo2.onrender.com
- **Development**: http://localhost:3000

Select your preferred server from the dropdown above to test the API!

### Support
For issues or questions, contact the development team.
    `.trim(),
    )
    .setVersion('1.0.0')
    .addServer('https://bebrand-eoo2.onrender.com', 'Production Server')
    .addServer('http://localhost:3000', 'Development Server')
    .addTag('Auth', 'Authentication endpoints - Register and login')
    .addTag('Users', 'User profile management')
    .addTag('Products', 'Product catalog management')
    .addTag('Orders', 'Order management and tracking')
    .addTag(
      'Admin',
      'Admin panel - User management, order management, and analytics (11 endpoints)',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}

void bootstrap();
