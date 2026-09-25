import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailSenderService {
    constructor(private emailService: MailerService){}

    async sendEmailToSomeone({subject, text, to}: SendEmailDto){
        const options = {
            to,
            subject,
            from: "gita-back-1 <nodo.kvi@gmail.com>",
            text
        }

        await this.emailService.sendMail(options)
        console.log("Email sent successfully")
    }

    async sendEmailToSomeoneBCC(bcc){
        const options = {
            bcc,
            subject: "Constitutional Foundation",
            from: "gita-back-1 <nodo.kvi@gmail.com>",
            text: "USA 1787"
        }

        await this.emailService.sendMail(options)
        console.log("Email sent successfully")
    }

    async sendWelcomeMessage(to: string) {
  const options = {
    to,
    subject: "Welcome to Our Platform! 🎉",
    from: "gita-back-1 <nodo.kvi@gmail.com>",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f7f6;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
            .header {
              background-color: #4f46e5;
              color: #ffffff;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 26px;
              font-weight: 600;
            }
            .content {
              padding: 30px;
              color: #333333;
              line-height: 1.6;
            }
            .content h2 {
              color: #1f2937;
              margin-top: 0;
            }
            .btn-container {
              text-align: center;
              margin: 30px 0;
            }
            .btn {
              background-color: #4f46e5;
              color: #ffffff !important;
              padding: 12px 28px;
              text-decoration: none;
              font-weight: bold;
              border-radius: 6px;
              display: inline-block;
            }
            .footer {
              background-color: #f9fafb;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
              border-top: 1px solid #e5e7eb;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome Aboard! 🚀</h1>
            </div>
            <div class="content">
              <h2>გამარჯობა! 👋</h2>
              <p>მოხარულები ვართ, რომ შემოგვიერთდით. ჩვენი პლატფორმის მეშვეობით თქვენ შეძლებთ მარტივად და ეფექტურად მართოთ თქვენი პროცესები.</p>
              <p>დასაწყებად და აპლიკაციაში გადასასვლელად დააჭირეთ ქვემოთ მოცემულ ღილაკს:</p>
              <div class="btn-container">
                <a href="https://example.com" class="btn">Get Started</a>
              </div>
              <p>თუ რაიმე კითხვა გექნებათ, ჩვენი მხარდაჭერის გუნდი ყოველთვის მზადაა დაგეხმაროთ.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Gita Back. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await this.emailService.sendMail(options);
  console.log("Welcome email sent successfully");
}

async verifyUser(to: string, otpCode: string) {
  const options = {
    to,
    subject: "Your Verification Code 🔑",
    from: "gita-back-1 <nodo.kvi@gmail.com>",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f7f6;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 500px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
            .header {
              background-color: #4f46e5;
              color: #ffffff;
              padding: 25px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 22px;
              font-weight: 600;
            }
            .content {
              padding: 30px;
              color: #333333;
              text-align: center;
            }
            .otp-box {
              background-color: #f3f4f6;
              border: 2px dashed #4f46e5;
              border-radius: 8px;
              padding: 15px;
              margin: 25px 0;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 6px;
              color: #4f46e5;
            }
            .note {
              font-size: 13px;
              color: #6b7280;
              margin-top: 20px;
            }
            .footer {
              background-color: #f9fafb;
              padding: 15px;
              text-align: center;
              font-size: 12px;
              color: #9ca3af;
              border-top: 1px solid #e5e7eb;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verification</h1>
            </div>
            <div class="content">
              <p>გამარჯობა, გამოიყენეთ ქვემოთ მოცემული კოდი ვერიფიკაციის დასასრულებლად:</p>
              <div class="otp-box">
                ${otpCode}
              </div>
              <p class="note">⚠️ კოდი აქტიურია მოკლე დროით. თუ ეს მოთხოვნა თქვენ არ გაგიგზავნით, უგულებელყავით ეს შეტყობინება.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Gita Back. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await this.emailService.sendMail(options);
  console.log("OTP verification email sent successfully");
}

async sendDeactivationMessage(to: string) {
  const options = {
    to,
    subject: "Account Deactivated 😢",
    from: "gita-back-1 <nodo.kvi@gmail.com>",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f7f6;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
            .header {
              background-color: #ef4444;
              color: #ffffff;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 26px;
              font-weight: 600;
            }
            .content {
              padding: 30px;
              color: #333333;
              line-height: 1.6;
            }
            .content h2 {
              color: #1f2937;
              margin-top: 0;
            }
            .footer {
              background-color: #f9fafb;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
              border-top: 1px solid #e5e7eb;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Account Deactivated</h1>
            </div>
            <div class="content">
              <h2>გამარჯობა! 👋</h2>
              <p>გაცნობებთ, რომ თქვენი ანგარიში წარმატებით დეაქტივირდა.</p>
              <p>დიდი მადლობა იმისთვის, რომ ჩვენთან იყავით და სარგებლობდით ჩვენი პლატფორმით. გულით ვიმედოვნებთ, რომ მომავალში კვლავ გვექნება თანამშრომლობის შანსი!</p>
              <p>თუ ეს მოთხოვნა თქვენ არ გეკუთვნოდათ, ან რაიმე კითხვა გაქვთ, დაუყოვნებლივ დაგვიკავშირდით.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Gita Back. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await this.emailService.sendMail(options);
  console.log("Deactivation email sent successfully");
}
}
