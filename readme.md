# E-Commerce Platform

Welcome to our E-Commerce Platform, a comprehensive solution designed to revolutionize the way businesses sell products online. Our platform is built with a focus on security, ease of use, and scalability, ensuring that businesses of all sizes can benefit from our services.

## Features

- **Scalable & Clean Architecture**: `Designed to scale system`, our platform can handle an increasing load, ensuring smooth operation during peak times. Flow of my project `Request -> Validation -> Route -> Controller -> Service -> (Thrid-Party, Redis, Message Queue) -> Repository -> Model -> MongoDB`
- **Docs API**: Docs api with `swagger` with file yaml
- **Logs System**: Write all proccessing active of system ( `Tracking ID request` )
- **Upload image service**: Using cloud to save image: `Cloudinary` and `dynamically resize` it based on width and height, and also `specify the type of image format`.
- **Cloud Serivce**: AWS `S3 EC2 SES IAM Cloudfront (cnd)` ...
- **CI/CD & Reverse proxy**: Using `technical CI/CD of github Action to EC2` and using `nginx to Reserve Proxy`
- **User Management**: Administrators can easily manage user accounts, including creating new users and handling authentication processes.
- **Secure User Authentication**: Utilizing `RSA encryption` for secure data transmission and bcrypt for password hashing, we ensure that user credentials are protected at all times.

## Getting Started

To get started with our E-Commerce Platform, follow these steps:

1. **Clone the Repository from github**
2. **Install Dependencies**
   - `npm install`
3. **Configure Environment**
   - Create a `.env` file in the root directory and configure your environment variables as needed.
4. **Start the Server**
   - Start server `npm run dev`
   - Your e-commerce platform should now be running on `http://localhost:8080`.

## Documentation

For more detailed information about our platform's features and how to use them, please refer to the [docs](http://localhost:8080/docs) ( Swagger ) folder in the repository.

## Contributing

We welcome contributions from the community. If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

This README provides a basic overview and starting point for your project. You should customize it to include any additional features, setup instructions, or documentation specific to your project.
