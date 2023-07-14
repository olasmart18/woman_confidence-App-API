import nodemailer from 'nodemailer';

/**
 * function sendEmail : function to send password reset link
 * to email, accept three params
 * @email - the email to recieve the reset link
 * @subject - name of the email or tittle
 * @text - the link or body of the email sent to email
 */

const sendEmail = async ( email, subject, text) => {
    try {
        // create a test smtp for email sending domain
         nodemailer.createTestAccount()
        .then( async (test) => {
            if (!test) return res.status(400).json({
            message: 'some kind of error, try again'
        })
        // create an email transporter
        const emailTransporter = nodemailer.createTransport({
            host: test.smtp.host,
            port: test.smtp.port,
            secure: test.smtp.secure,
            auth: {
                user: test.user,
                pass: test.pass
            }
        })
        // create a mail container
        await emailTransporter.sendMail({
            from: test.user,
            to: email,
            subject: subject,
            text: text
        })
        console.log('email sent')
        })
       
    } catch (err) {
        console.log(err)
    }
}

export default sendEmail;